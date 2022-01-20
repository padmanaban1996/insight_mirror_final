import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { chatInputPlaceholder, chatLabel, participentsLabel, quizLabel, screenshareLabel, settingsLabel, whiteboardLabel } from '../constants';
import { ConfirmationDialogService } from '../components/confirmation-dialog/confirmation-dialog.service';
import { User } from '../core/model/user';
import { LocalUserService } from '../core/services/local-user.service';
import { UserService } from '../core/services/user.service';
import { Iquestion, Quiz } from '../quiz/model/quiz';
import { QuizService } from '../quiz/quiz.service';
import { Schedule } from '../schedule/model/schedule';
import { interfaceConfig } from './interface-config';
import { LiveclassTemplateService } from './liveclass-template.service';
import { Participant, singleQuestionAnswer, singleQuestionResult, singleStudentAnswerSheet, UserActivity } from './model';
import { PreJoinComponent } from './pre-join/pre-join.component';
import { QuizResultsService } from '../quiz/quiz-results.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { WebcamUtil } from 'ngx-webcam';
import { Subject, Subscription } from 'rxjs';

import { LocationStrategy, PlatformLocation } from '@angular/common';
import { filter } from 'rxjs/operators';
import { stream } from 'xlsx/types';
import RecordRTC from 'recordrtc';
import { ChartType } from 'chart.js';

declare var JitsiMeetExternalAPI: any;
// define below as needed for questions

@Component({
  selector: 'app-liveclass',
  templateUrl: './liveclass.component.html',
  styleUrls: ['./liveclass.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ]
    )
  ],
})

export class LiveclassComponent {
  public doughnutChartLabels: any[] = ['overall', 'except'];
  public doughnutChartData: any = [];
  public doughnutChartType: ChartType = 'doughnut';
  colors: any[] = [
    {
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ]
    }
  ];
  doughnutChartOptions: any = {
    cutoutPercentage: 70, responsive: true,

  }
  public doughnutChartPlugins: any[] = [];
  @ViewChild('meet') video: any;
  private stream: MediaStream;
  private recordRTC: any;
  quizLabel
  settingsLabel
  whiteboardLabel
  screenshareLabel
  participentsLabel
  chatLabel
  showAllQuizResultsToStudents: boolean = false
  chatInputPlaceholder
  liveclassmodalTitle
  showResultsForStudent: boolean = false
  schedule = {} as Schedule;
  showParticipents: boolean = false;
  showQuizResults: boolean = false
  showChat: boolean = false;
  showDiv: boolean = false;
  isRunning = true;
  isPlaying = true;
  availableDevices;
  selectedid: string;
  @ViewChild('listContainer') private myScroll: ElementRef;
  @ViewChild('studentModal') studentQuizModal: ElementRef;
  @ViewChild('singleQuiz') singleQuiz: ElementRef;
  @ViewChild('singleStudentResult') singleStudentResult: ElementRef
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  Data: any = [];
  scorePercentage: number = 0;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  percentage: number;
  questions: any = [];
  QuizData: any = [];
  showToStudents: boolean = false;
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  @ViewChild('search', { static: false }) search: any;
  rows = [];
  temp: any = [];
  ColumnMode = ColumnMode;
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public readonly pageLimitOptions = [
    { value: 5 },
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
  ];
  public readonly visibleOptions = [
    { value: 1 },
    { value: 3 },
    { value: 5 },
    { value: 10 },
  ];
  students: any = [];
  Percentage: number = 0;
  seperatePercentage: any = []
  autoPlay: any;
  everyQuestionSeconds: number;
  seconds: number = 0;
  showScreenShare: any;
  userId: string;
  confirmed: boolean;
  showBottomNav: boolean = true;
  showWebcam: boolean = false;
  x: NodeJS.Timeout;
  disableAudioButton: boolean[] = [];
  disableVideoButton: boolean[] = [];
  disableScreenShareButton: boolean[] = [];
  disableParticipantScreenShareButton: boolean = false
  index: any;
  typeE: any;
  browserRefresh: any;
  quizId: any;
  quizData: any;
  currentQuizId: string;
  modalReference: any;
  studentId: any;
  resultQuizId: any;
  studentmodalReference: any;
  selectedQuizId: any;
  extra: number;
  isScreenShare: boolean = false;
  isSettings: boolean = false;
  @HostListener('window:focus', ['$event'])
  onFocus(event: any): void {
    console.log("Page active");
    this.userActivity("back");
  }
  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
    console.log("Page inactive");
    this.userActivity("blur")
  }
  //jitsi
  val: any;
  i: number = 0;
  domain: string = "meet.kcube.org";
  options: any;
  api: any;
  videoMute: boolean = false;
  jwtToken: string;
  roomName: string;
  screenHeight: number;
  screenWidth: number;
  displayName: string;
  studentOptions: any;
  teacherOptions: any;
  mePartipant = {} as Participant;
  user: User;
  newMessage: string = '';
  messageList: any[] = [];
  jitisiParticipantsList: [];
  participants = [] as Participant[];
  usersList: User[];
  showDiv2: boolean[] = []
  isParticipents: boolean = true;
  isChat: boolean = true;
  messageLength: number = 0;
  updatedMessageLength = 0;
  newMessageAvailable: boolean = false;
  public now: Date = new Date();
  ngbModaloptions: NgbModalOptions = {
    backdrop: 'static',
    windowClass: 'live-quiz'
  }
  //
  //quiz variables
  // @ViewChild('webcam') webcamElement: ElementRef;
  // @ViewChild('canvas') canvasElement: ElementRef;
  studentModal = false;
  teacherModal = false;
  showQuizList = false;
  resultsModel = 'resultsModel'
  quizlists: Quiz[];
  @ViewChild('loadingModal') loadingModal: ElementRef<any>
  isQuizDataReceived = false;
  selectedQuizData = {} as Quiz;
  showPortal = false;
  quizStart = false;
  quizEnd = false;
  next = false;
  scheduleId: string;
  currentQuestionData = {} as Iquestion;
  allStudentsAnswer = [] as singleStudentAnswerSheet[];
  noOfAnsweredStudents: number[] = [];
  userval = {} as singleStudentAnswerSheet;
  singleQuestionAnswer = {} as singleQuestionAnswer;
  answerSheetArray: singleQuestionAnswer[] = [];
  showResults: boolean = false;
  quizResults = {} as singleQuestionResult;
  optionsAndFrequency = {};
  lastQuestion: boolean = false;
  label: string[] = [];
  socketConnected: boolean = null
  morethanOneParticipant: boolean = null;
  quizName: string = null;
  subscription: Subscription;
  modalRef: TemplateRef<any>;
  isRecording: boolean = false;
  isHostVideoPinned: boolean = false;
  // @ViewChild('iframe', { static: false }) iframeJitsi: ElementRef<any>;

  constructor(private localUserService: LocalUserService,
    private liveclassService: LiveclassTemplateService,
    public socket: Socket,
    private userService: UserService,
    private modalService: NgbModal,
    private quizService: QuizService,
    public router: Router,
    public toastr: ToastrService,
    public confirmationDialogService: ConfirmationDialogService,
    private activatedRoute: ActivatedRoute,
    private quizResultsService: QuizResultsService, location: PlatformLocation) {
    this.socketConnected = false
    this.user = this.localUserService.getUser();
    this.userId = this.user._id;

    console.log("SCHEDULE", this.router.getCurrentNavigation().extras.state.schedule);
    this.schedule = this.router.getCurrentNavigation().extras.state.schedule;

    this.userService.getAllUsers(this.user.belongs_to_school).subscribe(data => {
      this.usersList = data;
    })
    this.scheduleId = this.schedule._id;
    setInterval(() => {
      this.now = new Date();
    }, 1);


    this.quizLabel = quizLabel
    this.settingsLabel = settingsLabel
    this.whiteboardLabel = whiteboardLabel
    this.screenshareLabel = screenshareLabel
    this.participentsLabel = participentsLabel
    this.chatLabel = chatLabel
    this.chatInputPlaceholder = chatInputPlaceholder
  }

  userActivity(action: string) {
    console.log("action");
    if (this.user.role == 'student') {
      const body = {} as UserActivity;
      body.name = this.user.name;
      body.activity_type = action;
      body.participant_id = this.user._id; // check if the user Id is in the participants list
      body.time = Date.now().toString();
      this.liveclassService.sendUserActivity(this.schedule._id, body).subscribe(data => {
      });
    }
  }

  ngOnInit(): void {
    this.options = {
      roomName: this.schedule.room_id,
      width: "100%",
      height: "100%",
      userInfo: {
        displayName: this.user.email,
      },
      configOverwrite: {
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        disableRemoteMute: false,
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        featureFlag: {
          inviteEnabled: false
        },
        disableInviteFunctions: true,
        doNotStoreRoom: true,
        remoteVideoMenu: {
          disableKick: false
        },
        disableRecordAudioNotification: true,
        enableUserRolesBasedOnToken: true,
        enableFeaturesBasedOnToken: true,
        enableClosePage: true,
        enableWelcomePage: false,
        requireDisplayName: false,
        hideLobbyButton: true,
        enableNoAudioDetection: false,
        enableNoisyMicDetection: false,
      },
      interfaceConfigOverwrite: interfaceConfig,
      onload: () => {
      },
      parentNode: document.querySelector('#meet')
    }

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    this.api.on('participantJoined', (data: any) => {
      const otherParticipantUserDetail = this.usersList.find(item => item.email == data.displayName)
      if (otherParticipantUserDetail) {
        const otherParticipant = {} as Participant;
        otherParticipant.email = data.displayName;
        otherParticipant.jitsiId = data.id;
        otherParticipant.userId = otherParticipantUserDetail._id;
        otherParticipant.name = otherParticipantUserDetail.name;
        otherParticipant.role = otherParticipantUserDetail.role;
        otherParticipant.audioMute = true;
        otherParticipant.videoMute = true;
        this.participants.push(otherParticipant);
        for (let i = 0; i < this.participants.length; i++) {
          this.showDiv2[i] = false;
          this.disableAudioButton.push(false);
          this.disableVideoButton.push(false);
          this.disableScreenShareButton.push(false);
        }
        this.getParticipantsList();
        if (this.participants.length == 0) {
          this.morethanOneParticipant = false
          console.log("more than one participant", this.morethanOneParticipant);
        } else {
          this.morethanOneParticipant = true
          console.log("more than one participant", this.morethanOneParticipant);
        }
      }
    });
    // this.api.executeCommand('toggleFilmStrip');
    this.api.on('videoConferenceJoined', (data) => {
      //--------service--> post session started == true
      this.mePartipant.userId = this.user._id;
      this.mePartipant.email = data.displayName;
      this.mePartipant.role = this.user.role;
      this.mePartipant.name = this.mePartipant.name;
      this.mePartipant.jitsiId = data.id;
      this.mePartipant.videoMute = false;
      this.mePartipant.audioMute = false
      this.userActivity('join');
      this.getParticipantsList();
      if (this.user.role == 'teacher' && this.schedule.session_started !== true) {
        let result = {} as Schedule;
        this.liveclassService.teacherJoined(this.schedule._id, Date.now().toString()).subscribe(data => {
          result = data
          if (result._id) {
            console.info("session started")
          }
        });
      }
    });
    this.api.on('screenSharingStatusChanged', (data: any) => {
      console.log("screen share", data);
      if (data.on == null) {
        this.isScreenShare = false
        this.sendMessage("hideFilmStrip", '', this.schedule._id)
      }
      if (data.on == true) {
        this.sendMessage("hideFilmStrip", '', this.schedule._id)
      }
      console.log("me participant", this.mePartipant);
      if (this.user._id == this.schedule.host_id) {
        console.log("yes i am a teacher");
        // const hostJitsiId = this.mePartipant.jitsiId;
        data.on ? console.log("true") : this.sendMessage("pinAfterScreenShare", "", this.schedule._id)
      }
    });

    this.api.on('participantLeft', (data) => {
      const otherParticipant = this.participants.findIndex(item => item.jitsiId == data.id);
      this.participants.splice(otherParticipant, 1);
      this.getParticipantsList();
    });
    this.api.on('videoMuteStatusChanged', (data) => {
      this.videoMute = !data.muted;
      console.log("video mute state", this.videoMute);
    })
    this.socket.connect();
    this.socket.on("chat message", (message) => {
      this.processMessage(message);
      this.scrollToBottom();
    })
    this.getQuiz();
    this.scrollToBottom();
    this.getAvailableDevices();
    this.openQuizResult();

    const data = {
      liveclass: true,
      role: this.user.role,
      name: this.user.name,
      participant_id: this.user._id,
      schedule_id: this.schedule._id
    }
    localStorage.setItem("liveclass", JSON.stringify(data));
  }
  toggle() {
    // this.api.executeCommand('muteEveryone');

    const data = {
      status: true,
      button: true
    }
    this.sendMessage("muteEveryone", JSON.stringify(data), this.schedule._id)
  }
  ngOnDestroy() {
    if (this.x) {
      clearInterval(this.x);
    }
  }
  getAvailableDevices() {
    this.api.getAvailableDevices().then(devices => {
      this.availableDevices = devices
      console.log('available', this.availableDevices);
    })
  }
  onaudioInputListItemClick(index: number) {
    this.selectedid = this.availableDevices.audioInput[index].deviceId;
    this.label = this.availableDevices.audioInput[index].label;
    this.api.setAudioInputDevice(this.label, this.selectedid);
    console.log('selected device id', this.selectedid);
  }
  onaudioOutputListItemClick(index: number) {
    this.selectedid = this.availableDevices.audioOutput[index].deviceId;
    this.label = this.availableDevices.audioOutput[index].label;
    this.api.setAudioOutputDevice(this.label, this.selectedid);
    console.log('selected device id', this.selectedid);
  }
  onvideoInputListItemClick(index: number) {
    this.selectedid = this.availableDevices.videoInput[index].deviceId;
    this.label = this.availableDevices.videoInput[index].label;
    this.api.setVideoInputDevice(this.label, this.selectedid);
    console.log('selected device id', this.selectedid);
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((this.showChat === true || this.showParticipents === true || this.showQuizResults === true || this.showAllQuizResultsToStudents === true)) {
      if (event.key === 'Escape') {
        this.showChat = false;
        this.showParticipents = false;
        this.showQuizResults = false;
        this.showAllQuizResultsToStudents = false;
      }
    }
    else if ((this.showChat === false) && (this.showParticipents === false) && (this.showQuizResults === false) && (this.showAllQuizResultsToStudents === false) && (this.modalService.hasOpenModals() === false)) {
      if (event.key === 'Escape') {
        this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to hang up the call ?')
          .then((confirmed) => {
            if (confirmed) {
              // this.toastr.success("Session Ended")
              this.api.executeCommand('hangup');
              this.api.dispose();
              this.userActivity('leave')
              this.router.navigate(['livequiz/schedule/list']);
              if (this.user._id == this.schedule.host_id) {
                this.liveclassService.sessionEnded(this.schedule._id, Date.now().toString()).subscribe(data => {
                });
                this.sendMessage('action', "kickeveryone", "");
                // this.hangUp()
              }
              this.socket.disconnect();
            }
            console.log("clicked okay", confirmed);
          })
          .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
      }
    }
  }
  socketTryAgain() {
    this.socket.connect();
  }
  getParticipantsList() {
    this.jitisiParticipantsList = this.api.getParticipantsInfo();
    if (this.user.role == 'student' && this.schedule.pin_status == false) {
      const host = this.participants.find(e => e.userId == this.schedule.host_id);
      console.log("Host And Participant after other participant joined", host, this.participants);
      if (host != undefined) {
        this.setLargeVideo(host.jitsiId)
      }
    }

    console.log(this.participants, this.jitisiParticipantsList);
    if (this.jitisiParticipantsList.length == this.participants.length) {
      console.info("----------------------List Mataches");
    } else {
      console.info("----------------------List unmatched", this.jitisiParticipantsList, this.participants);
    }
  }

  ngAfterViewInit() {
    const el = document.getElementById("btnMenu");
    const tm = document.getElementById("toggleMenu");
    const cm = document.getElementById("chatMenu");
    const tw = document.getElementById("topWrapper")
    var timer;
    function showBtn() {
      el.style.display = "block";
      tm.style.display = "block";
      cm.style.display = "block";
      tw.style.display = "flex"
      cm.style.opacity = "0.8";
    }
    function hideBtn() {
      el.style.display = "none";
      tm.style.display = "none";
      cm.style.display = "none";
      tw.style.display = "none"
      cm.style.opacity = "0";
    }
    hideBtn();
    document.onmousemove = function () {
      showBtn();
      clearTimeout(timer);
      timer = setTimeout(function () {
        hideBtn();
      }, 5000)
    }
    console.log("After view init called");
    if (this.schedule.pin_status == true) {
      if (this.user.role == 'student') {
        this.sendMessage('unPinHost', '', this.schedule._id);
      }
    }
    else {
      if (this.user.role == 'student') {
        this.sendMessage('pinParticipant', '', this.schedule._id);
      }
    }
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScroll.nativeElement.scrollTop = this.myScroll.nativeElement.scrollHeight;
    } catch (err) { }
  }
  //makes the video in large size.
  setLargeVideo(participantId: string) {
    this.api.setLargeVideoParticipant(participantId);
    console.log("participant id is", participantId);
    this.api.pinParticipant(participantId);
  }
  hangUpAndExit() {
    //kickevery one ->
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to hang up the call ?')
      .then((confirmed) => {
        if (confirmed) {
          // this.stopRecording();
          this.api.executeCommand('hangup');
          this.api.dispose();
          this.userActivity('leave');
          localStorage.removeItem("liveclass")
          this.router.navigate(['livequiz/schedule/list']);
          if (this.user._id == this.schedule.host_id) {
            this.liveclassService.sessionEnded(this.schedule._id, Date.now().toString()).subscribe(data => {
            });
            this.sendMessage('action', "kickeveryone", "");
          }
          this.socket.disconnect();
        }
        console.log("clicked okay", confirmed);
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }
  hangUp() {
    // this.stopRecording()
    this.userActivity('leave')
    this.toastr.success("Session Ended")
    this.api.executeCommand('hangup');
    this.api.dispose();
    localStorage.removeItem("liveclass")
    this.router.navigate(['livequiz/schedule/list']);
  }
  // -----------------Button------triggers-------------
  openParticipents() {
    this.showParticipents = !this.showParticipents;
  }
  openChat() {
    this.showChat = !this.showChat;
    this.messageLength = this.messageList.length
    this.newMessageAvailable = false

  }
  openmobileParticipents() {
    this.isChat = true
    this.isParticipents = !this.isParticipents
  }
  openmobileChat() {
    this.isParticipents = true
    this.isChat = !this.isChat
  }
  onSelectRow(data) {
    console.log("ROW DATA", data);
    this.quizData = data
    this.quizId = data._id
    this.modalReference = this.modalService.open(this.singleQuiz, { ariaLabelledBy: 'New Class', windowClass: 'live-quiz' })
  }
  toggleQuizResult() {
    this.showQuizResults = !this.showQuizResults;
    this.openQuizResult()
  }
  showAllQuizResults() {
    this.quizResultsService.getQuizResultsInLiveClass(this.scheduleId).subscribe(data => {
      console.log('quiz => data', data);
      this.sendMessage("resultsModel", JSON.stringify(data), "");
    })
  }
  remoteVideoMuteByHost(i: string) {
    const tempStatus = !this.participants[i].videoMute;
    this.disableVideoButton[i] = true
    const val = {
      index: i,
      status: tempStatus,
      id: this.participants[i].userId,
      button: this.disableVideoButton[i]
    }
    this.sendMessage("participantVideoMuteStatus", JSON.stringify(val), this.schedule._id)
  }

  remoteAudioMuteByHost(i: string) {
    const tempStatus = !this.participants[i].audioMute;
    this.disableAudioButton[i] = true;
    const val = {
      index: i,
      status: tempStatus,
      id: this.participants[i].userId,
      button: this.disableAudioButton[i]
    }
    this.sendMessage("participantAudioMuteStatus", JSON.stringify(val), this.schedule._id)
  }

  toggleVideoMute() {
    this.api.executeCommand('toggleVideo')
    this.isRunning = !this.isRunning;
    console.log("video muted toggle video", this.isRunning);
    if (this.user._id !== this.schedule._id) {
      const data = {
        type: "vid",
        status: this.isRunning,
        id: this.user._id,
        button: this.disableVideoButton[this.index]
      }
      this.sendMessage("saveParticipantMuteStatus", JSON.stringify(data), this.schedule._id)
    }
  }
  toggleAudioMute() {
    this.api.executeCommand('toggleAudio')
    this.isPlaying = !this.isPlaying;
    console.log("Audio mute statue toggle audio", this.isPlaying);

    if (this.user._id !== this.schedule._id) {
      const data = {
        type: "aud",
        status: this.isPlaying,
        id: this.user._id,
        button: this.disableAudioButton[this.index]
      }
      this.sendMessage("saveParticipantMuteStatus", JSON.stringify(data), this.schedule._id)
    }

  }
  toggleParticipantAudioMute(i: any, buttonStatus: boolean) {
    this.api.executeCommand('toggleAudio')
    this.isPlaying = !this.isPlaying;
    console.log("Audio mute statue toggle audio", this.isPlaying);

    if (this.user._id !== this.schedule._id) {
      const data = {
        index: i,
        type: "aud",
        status: this.isPlaying,
        id: this.user._id,
        button: !buttonStatus
      }
      this.sendMessage("saveParticipantMuteStatus", JSON.stringify(data), this.schedule._id)
    }
  }
  toggleParticipantVideoMute(i: any, buttonStatus: boolean) {
    this.api.executeCommand('toggleVideo')
    this.isRunning = !this.isRunning;
    console.log("video muted toggle video", this.isRunning);

    if (this.user._id !== this.schedule._id) {
      const data = {
        index: i,
        type: "vid",
        status: this.isRunning,
        id: this.user._id,
        button: !buttonStatus
      }
      this.sendMessage("saveParticipantMuteStatus", JSON.stringify(data), this.schedule._id)
    }

  }
  toggleParticipantScreenShare(i: any, buttonStatus: boolean) {
    if (this.user._id !== this.schedule._id) {
      const data = {
        index: i,
        id: this.user._id,
        button: !buttonStatus
      }
      this.sendMessage("saveParticipantScreenshareStatus", JSON.stringify(data), this.schedule._id)
    }
  }

  kickParticipant(participantId: string) {
    const participant = this.participants.findIndex(item => item.userId == participantId);
    this.participants.splice(participant, 1)
    this.toastr.success("You have been Disconnected")

    if (this.user._id = participantId) {
      console.log("only me called here", this.mePartipant.userId);
      this.api.executeCommand('hangup');
      this.api.dispose();
      this.userActivity('leave');
      localStorage.removeItem("liveclass");
    }
    this.router.navigate(['livequiz/schedule/list']);
    if (this.user._id == this.schedule.host_id) {
      this.sendMessage('action', "kickeveryone", "")
    }
    this.socket.disconnect();
  }
  kickStudentOut(uid: string) {

    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to disconnect the participant ?')
      .then((confirmed) => {
        if (confirmed) {
          console.log("uid", uid);
          this.sendMessage("action", "kickout", uid)
        }
        console.log("clicked okay", confirmed);

      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }

  sendNewMessage() {
    if (this.newMessage !== '') {
      console.log("non empty", this.newMessage);
      this.sendMessage("chat", this.newMessage, "")

    } else {
      console.log("empty");

    }

  }

  toggleParticipentScreenShare(i: string) {
    this.disableScreenShareButton[i] = true
    const data = {
      index: i,
      id: this.participants[i].userId,
      button: this.disableScreenShareButton[i]
    }
    this.sendMessage("screenshare", JSON.stringify(data), this.schedule._id)
  }
  requestHostToScreenShare(hostId: string, participantId: string, buttonStatus: Boolean, sender: string) {
    if (this.userId == hostId) {
      this.confirmationDialogService.confirm('Please confirm..', `${sender} wants to screen share video ?`)
        .then((confirmed) => {
          if (confirmed) {
            this.confirmed = true;
            const data = {
              id: participantId,
              button: !buttonStatus
            }
            this.sendMessage("requestScreenShare", JSON.stringify(data), participantId)
          }
          else {
            const data = {
              id: participantId,
              button: !buttonStatus
            }
            this.sendMessage("rejectScreenshare", JSON.stringify(data), participantId)
          }
        })
        .catch(() => {
          console.log();
          const data = {
            id: participantId,
            button: !buttonStatus
          }
          this.sendMessage("rejectScreenshare", JSON.stringify(data), participantId)
        });
    }
  }
  showToster(participantId: string) {
    if (this.user._id == participantId) {
      this.toastr.warning("Host Rejected your Screen Share Request!")
    }
  }
  toggleScreenShare() {
    console.log("clicked");
    this.isScreenShare = true;
    this.api.executeCommand('toggleShareScreen');
  }
  requestToggleScreenShare(participantId: string) {
    this.disableParticipantScreenShareButton = true
    const data = {
      id: participantId,
      button: this.disableParticipantScreenShareButton
    }
    this.sendMessage("request", JSON.stringify(data), this.schedule.host_id)
  }
  //---------------------start-quiz-logix-------------------------------
  onClick() {
    if (this.showPortal == true) {
      this.showPortal = false;
    } else {
      this.showPortal = true;
    }
  }
  //get all quiz list data from the api
  getQuiz() {
    this.quizService.getQuizByTeacher(this.user.belongs_to_school).subscribe(
      data => {
        console.log("teacher quiz Data:::", data)
        this.quizlists = data;
      })
  }

  // Based on the teacher actions maintain the local state of each variable.
  teacherActions(action: string) {
    if (action == 'start') {
      const data = {
        action: "start",
        start: true,
        quizData: this.selectedQuizData
      }
      console.log('selected quiz => start', data);

      this.quizStart = true;
      this.quizEnd = false;
      this.next = false;
      this.sendMessage("quiz", JSON.stringify(data), "");
    }
    if (action == 'autoplay') {
      const data = {
        action: "autoplay",
        start: true,
        quizData: this.selectedQuizData,
        seconds: this.seconds
      }
      console.log('selected quiz => autoplay', data);

      this.quizStart = true;
      this.quizEnd = false;
      this.next = false;
      this.sendMessage("quiz", JSON.stringify(data), "");
    }

    if (action == 'next') {
      this.showResults = false;
      const data = {
        action: "next",
        showResults: this.showResults,
        indexValue: this.i + 1,
        seconds: this.seconds
      }
      this.next = true;
      console.log("next teacher action", this.i);

      console.log('selected quiz => next', data);
      this.sendMessage("quiz", JSON.stringify(data), "")

    }
    if (action == 'end') {
      const data = {
        action: "end",

      }
      this.quizEnd = true;
      this.showResults = false;
      this.quizStart = false;
      this.next = false;

      console.log('selected quiz => end', data);
      this.sendMessage("quiz", JSON.stringify(data), "")
    }
    if (action == 'showResults') {
      this.showResults = true;
      this.sendMessage("showResults", JSON.stringify(this.allStudentsAnswer), '')
    }
  }
  secondsAction(seconds: number) {
    this.seconds = seconds
    console.log(this.seconds);
  }
  resulPageActions(event) {
    console.log(event);
    if (event.action == 'exit') {
      this.modalReference.close()
    }
    if (event.action == 'listItem') {
      this.studentId = event.id;
      this.resultQuizId = event.quizId;
      this.selectedQuizId = event.selectedQuizId
      this.studentmodalReference = this.modalService.open(this.singleStudentResult, { ariaLabelledBy: 'New Class', windowClass: 'live-quiz' })
    }
  }
  routeBackAction(event) {
    console.log(event);
    if (event == 'exit') {
      this.studentmodalReference.close()
    }

  }

  studentActions(action: string) {
    const e = JSON.parse(action);
    this.singleQuestionAnswer.title = e.title;
    this.singleQuestionAnswer.questionIndex = this.i;
    this.singleQuestionAnswer.answer = e.answer
    this.singleQuestionAnswer.answered = e.answered
    this.singleQuestionAnswer.answerOption = e.optionSelected
    this.singleQuestionAnswer.selectedIndex = e.selectedIndex
    this.singleQuestionAnswer.qtype = e.qtype
    this.singleQuestionAnswer.matchAnsOption = e.matchAnsOption
    this.singleQuestionAnswer.correctMatchAns = e.correctMatchAns
    this.sendMessage("saveAnswer", JSON.stringify(this.singleQuestionAnswer), this.user._id)
  }

  showResultsChart(currentVal) {
    this.allStudentsAnswer = currentVal;
    console.log("all student answer", this.allStudentsAnswer);
    this.optionsAndFrequency = {}
    if (this.user.role == 'student') {
      this.showResults = true;
      for (let i = 0; i < this.allStudentsAnswer.length; i++) {
        const val = this.allStudentsAnswer[i].answerSheet[this.i].selectedIndex;
        console.log("Student Val", val);

        this.optionsAndFrequency[val] = (this.optionsAndFrequency[val] || 0) + 1;
      }
      console.log("options and its count", this.optionsAndFrequency);
    }

  }

  openQuizResult() {
    this.scorePercentage = 0

    this.quizResultsService.getQuizResultsInLiveClass(this.schedule._id).subscribe(data => {
      const quizResult = data.reverse().slice(0, 1);
      for (let i = 0; i < quizResult.length; i++) {
        const element = quizResult[i].answerSheet
        this.Data = element.filter(element => element.name === this.user.name);
      }
      for (let i = 0; i < this.Data.length; i++) {
        this.questions = this.Data[i].answerSheet;
        console.log(this.questions);
        for (let j = 0; j < this.questions.length; j++) {
          if (this.questions[j].answer === "Right") {
            this.scorePercentage++
            console.log(this.scorePercentage);
            this.percentage = Math.round((this.scorePercentage / this.questions.length) * 100);
            this.extra = 100 - this.percentage
          }
        }
      }
      this.doughnutChartData = []
      this.doughnutChartData.push(this.percentage, this.extra);
      console.log(this.doughnutChartData);


    }, err => console.error("", err));
  }

  increamentQuestion(indexval: number, showResults: boolean) {
    this.i = indexval;
    this.showResults = showResults;
    this.noOfAnsweredStudents[this.i] = 0;
    if (this.i >= this.selectedQuizData.questions.length) {
      this.lastQuestion = true;
      this.showResults = false;
    } else {
      this.next = true;
      this.noOfAnsweredStudents[this.i] = 0;
      this.currentQuestionData = this.selectedQuizData.questions[this.i];
      this.currentQuestionData.index = this.i;
      this.currentQuestionData.totalQuestions = this.selectedQuizData.questions.length
    }
  }


  currenctAction = (args: any) => {

  }
  startQuizToStudents(val) {
    this.i = 0;
    this.lastQuestion = false;
    console.log("before clearing", this.allStudentsAnswer);
    this.allStudentsAnswer = [] as singleStudentAnswerSheet[];
    console.log("after clearing", this.allStudentsAnswer);
    this.selectedQuizData = val;
    console.log("question data", val);
    this.quizName = this.selectedQuizData.name;
    this.currentQuizId = this.selectedQuizData._id
    this.quizStart = true
    this.noOfAnsweredStudents[this.i] = 0;
    this.currentQuestionData = this.selectedQuizData.questions[this.i];
    this.currentQuestionData.index = this.i;
    this.currentQuestionData.totalQuestions = this.selectedQuizData.questions.length
    if (this.user.role == 'student') {
      this.modalService.open(this.studentQuizModal, this.ngbModaloptions);
    }
    this.participants.forEach(element => {
      if (element.role == 'student') {
        const singleStudent = {} as singleStudentAnswerSheet
        singleStudent.id = element.userId
        singleStudent.name = element.name
        singleStudent.answerSheet = []
        singleStudent.answeredCount = 0;
        for (let index = 0; index < this.selectedQuizData.questions.length; index++) {
          const expectedQuestion = {} as singleQuestionAnswer
          expectedQuestion.questionIndex = index;
          expectedQuestion.answered = false;
          singleStudent.answerSheet.push(expectedQuestion)
          if (index == this.selectedQuizData.questions.length - 1) {
            this.allStudentsAnswer.push(singleStudent)
          }
        }
      }
    });
  }
  pinHostVideo() {
    this.isHostVideoPinned = !this.isHostVideoPinned;
    this.sendMessage('pinParticipant', '', this.schedule._id);
    this.liveclassService.sendPinStatus(this.schedule._id, false).subscribe(data => {
    });
  }
  unPinHostVideo() {
    this.isHostVideoPinned = !this.isHostVideoPinned;
    this.sendMessage('unPinHost', '', this.schedule._id);
    this.liveclassService.sendUnpinStatus(this.schedule._id, true).subscribe(data => {
    });
  }
  saveMuteStatus(type: string, val: boolean, participantId: string, buttonStatus: boolean, index: any, participantName: string) {

    console.log("from socket participant mute status", type, val, participantId, participantName);
    const participant = this.participants.find(e => e.userId == participantId);
    if (participant !== undefined) {
      if (type == "aud") {
        console.log("VAL", val);
        this.disableAudioButton[index] = buttonStatus;
        if (this.mePartipant.userId == participantId) {
          console.log("only to student, audio");
          this.mePartipant.audioMute == val;

          this.isPlaying = this.mePartipant.audioMute
        } else {
          participant.audioMute = val;

          console.log("audio mutes status is", participant.audioMute, val);
        }
      }
      if (type == 'vid') {
        this.disableVideoButton[index] = buttonStatus;
        console.log("BUTTON", this.disableVideoButton);
        if (this.mePartipant.userId == participantId) {
          console.log("only to student, video");
          this.mePartipant.videoMute == val;

          this.isRunning = this.mePartipant.videoMute
        } else {
          participant.videoMute = val;
          console.log("video mutes status is", participant.videoMute, val);
        }
      }
    }
  }
  muteAllParticipants(status, buttonStatus) {
    if (!this.isPlaying && this.user.role == 'student') {
      this.api.executeCommand('toggleAudio')
      this.isPlaying = status
    }
    for (let i = 0; i < this.participants.length; i++) {
      console.log(this.participants[i].audioMute);
      this.participants[i].audioMute = buttonStatus;
      console.log(this.participants[i].audioMute);
    }
  }
  saveScreenShareStatus(participantId: string, buttonStatus: boolean, index: any) {
    const participant = this.participants.find(e => e.userId == participantId);
    if (participant !== undefined) {
      this.disableScreenShareButton[index] = buttonStatus;
    }
  }
  endQuiz() {
    this.next = false;
    this.quizStart = false;
    this.quizEnd = true;
    this.allStudentsAnswer = [] as singleStudentAnswerSheet[]
    this.modalService.dismissAll();
  }
  selectedQuiz(e: any) {
    console.log("selected quiz:::", e);
    this.selectedQuizData = e;
    this.isQuizDataReceived = true;
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'live-quiz' })
  }
  opensettings(content) {
    this.isSettings = !this.isSettings;
    this.getAvailableDevices()
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'live-quiz-settings', centered: true })
  }
  modalClose(e) {
    console.warn('modal close');
  }
  //------------------------end-quiz-logix--------------------------------------------

  //-------Start-----socket code------------------------

  public sendMessage(type: string, payload: any, destination_id: string) {
    console.log("type", type);
    this.socket.emit('chat message', {
      "roomid": this.schedule.room_id,
      "type": type,
      "sender_id": this.user._id,
      "sender_name": this.user.name,
      "payload": payload,
      "destination_id": destination_id
    });
    this.newMessage = '';
  }
  public processMessage(data) {
    console.log("socket on connection message", data);
    this.socketConnected = true;
    if (this.schedule.room_id == data.roomid) {
      //Send message via chat
      if (data.type == "chat") {
        console.log("Chat socket", data);
        let message = { "sender": data.sender_name, "message": data.payload, "self": false };
        if (data.sender_id == this.mePartipant.userId) {
          message.self = true;
        }
        this.messageList.push(message);
        this.updatedMessageLength = this.messageList.length
        console.info("new message", this.showChat, this.updatedMessageLength, this.messageLength, data.type);

      }
      if (data.type == 'saveAnswer') {
        let recieveObj = JSON.parse(data.payload);
        const isAvailable = this.allStudentsAnswer.findIndex(e => e.id == data.destination_id);
        if (isAvailable !== -1) {
          this.allStudentsAnswer[isAvailable].answerSheet[recieveObj.questionIndex] = recieveObj;
          if (this.allStudentsAnswer[isAvailable].answerSheet[this.i].answer !== 'Did not Answer') {
            this.allStudentsAnswer[isAvailable].answeredCount = this.allStudentsAnswer[isAvailable].answeredCount + 1;
            this.noOfAnsweredStudents[this.i] = this.noOfAnsweredStudents[this.i] + 1;
          }
        }
      }

      if (data.type == "quiz") {
        console.log("Quiz socket", data);
        const val = JSON.parse(data.payload)
        if (val.action == "start") {
          console.log("start");
          console.log("quizData", val.quizData);
          this.startQuizToStudents(val.quizData);
        }
        if (val.action == "autoplay") {
          console.log("autoplay");
          this.seconds = val.seconds
          this.startQuizToStudents(val.quizData);
        }
        if (val.action == "next") {
          console.log("next");
          this.seconds = val.seconds
          this.increamentQuestion(val.indexValue, val.showResults)
        }
        if (val.action == "end") {
          this.endQuiz();
          this.showResults = false;
        }
      }
      if (data.type == "resultsModel") {
        console.log("QuizResults socket", data);
        const val = JSON.parse(data.payload)
        this.QuizData = val
        this.temp = [...this.QuizData];
        this.rows = this.QuizData
        this.showAllQuizResultsToStudents = !this.showAllQuizResultsToStudents;
        localStorage.setItem("showAllQuizResultsToStudents", JSON.stringify(this.showAllQuizResultsToStudents));
      }

      if (data.type == "showResults") {
        console.log("show Results socket", data);
        this.showResultsChart(JSON.parse(data.payload));
      }

      if (data.type == "participantVideoMuteStatus") {
        const val = JSON.parse(data.payload)
        if (this.user._id == val.id) {
          console.log("val recieved to student", val);
          if (!this.isRunning) {
            this.toggleParticipantVideoMute(val.index, val.button)
          } else {
            this.confirmationDialogService.confirm('Please confirm..', 'Host wants to switch on your video ?')
              .then((confirmed) => {
                if (confirmed) {
                  console.log("confirmed");
                  this.toggleParticipantVideoMute(val.index, val.button)
                }
                else {
                  console.log("cancelled!")
                  const data = {
                    index: val.index,
                    type: "vid",
                    status: this.isRunning,
                    id: this.user._id,
                    name: this.user.name,
                    button: !val.button
                  }
                  this.sendMessage("saveParticipantMuteStatus", JSON.stringify(data), this.schedule._id)
                  this.sendMessage('cancelToster', JSON.stringify(data), this.schedule.host_id)
                }
              })
              .catch(() => {
                console.log(`${val.id} dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)`);
                const data = {
                  index: val.index,
                  type: "vid",
                  status: this.isRunning,
                  id: this.user._id,
                  name: this.user.name,
                  button: !val.button
                }
                this.sendMessage("saveParticipantMuteStatus", JSON.stringify(data), this.schedule._id)
                this.sendMessage('cancelToster', JSON.stringify(data), this.schedule.host_id)
              });
          }
        }
      }
      // other participant audio mute
      if (data.type == "participantAudioMuteStatus") {
        const val = JSON.parse(data.payload)
        if (this.user._id == val.id) {
          console.log("Audio status recieved to student", val);
          if (!this.isPlaying) {
            this.toggleParticipantAudioMute(val.index, val.button)
          } else {
            this.confirmationDialogService.confirm('Please confirm..', 'Host wants to unmute your Audio ?')
              .then((confirmed) => {
                if (confirmed) {
                  console.log("confirmed");
                  this.toggleParticipantAudioMute(val.index, val.button)
                }
                else {
                  console.log("cancelled!")
                  const data = {
                    index: val.index,
                    type: "aud",
                    status: this.isPlaying,
                    id: this.user._id,
                    name: this.user.name,
                    button: !val.button
                  }
                  this.sendMessage("saveParticipantMuteStatus", JSON.stringify(data), this.schedule._id)
                  this.sendMessage('cancelToster', JSON.stringify(data), this.schedule.host_id)
                }
              })
              .catch(() => {
                console.log(`${val.id} dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)`);
                const data = {
                  index: val.index,
                  type: "aud",
                  status: this.isPlaying,
                  id: this.user._id,
                  name: this.user.name,
                  button: !val.button
                }
                this.sendMessage("saveParticipantMuteStatus", JSON.stringify(data), this.schedule._id)
                this.sendMessage('cancelToster', JSON.stringify(data), this.schedule.host_id)
              });

          }
        }

      }
      if (data.type === 'screenshare') {
        const val = JSON.parse(data.payload)
        if (this.user._id == val.id) {
          console.log("screenshre status recieved to student", val);

          this.confirmationDialogService.confirm('Please confirm..', 'Host wants to Screen Share your Video ?')
            .then((confirmed) => {
              if (confirmed) {
                console.log("confirmed");
                const data = {
                  index: val.index,
                  id: this.user._id,
                  button: !val.button
                }
                this.sendMessage("saveParticipantScreenShareStatus", JSON.stringify(data), this.schedule._id)
                this.toggleParticipantScreenShare(val.index, val.button)
              }
              else {
                console.log("cancelled!")
                const data = {
                  index: val.index,
                  id: this.user._id,
                  button: !val.button,
                  type: "screen",
                  name: this.user.name
                }
                this.sendMessage("saveParticipantScreenShareStatus", JSON.stringify(data), this.schedule._id)
                this.sendMessage('cancelToster', JSON.stringify(data), this.schedule.host_id)
              }
            })
            .catch(() => {
              console.log(`${val.id} dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)`);
              const data = {
                index: val.index,
                id: this.user._id,
                button: !val.button,
                type: "screen",
                name: this.user.name
              }
              this.sendMessage("saveParticipantScreenShareStatus", JSON.stringify(data), this.schedule._id)
              this.sendMessage('cancelToster', JSON.stringify(data), this.schedule.host_id)
            });
        }
      }
      if (data.type == 'hideFilmStrip') {
        this.api.executeCommand('toggleFilmStrip')
      }
      if (data.type == 'muteEveryone') {
        const val = JSON.parse(data.payload)
        console.log(JSON.parse(data.payload))

        this.muteAllParticipants(val.status, val.button)
      }

      if (data.type == "saveParticipantMuteStatus") {
        const val = JSON.parse(data.payload)
        this.saveMuteStatus(val.type, val.status, val.id, val.button, val.index, val.name)
      }
      if (data.type == "cancelToster") {
        console.log("cancelToster", JSON.parse(data.payload));
        const val = JSON.parse(data.payload)
        if (data.destination_id == this.user._id) {
          if (val.type == 'aud') {
            this.toastr.warning(`${val.name} rejected Audio request`)
          }
          if (val.type == 'vid') {
            this.toastr.warning(`${val.name} rejected Video request`)
          }
          if (val.type == 'screen') {
            this.toastr.warning(`${val.name} rejected Screen share request`)
          }
        }
      }
      if (data.type == 'saveParticipantScreenShareStatus') {
        const val = JSON.parse(data.payload);
        this.saveScreenShareStatus(val.id, val.button, val.index)
      }
      if (data.type == "request") {
        const val = JSON.parse(data.payload)
        this.requestHostToScreenShare(data.destination_id, val.id, val.button, data.sender_name)
      }
      if (data.type == 'requestScreenShare') {
        const val = JSON.parse(data.payload)
        if (this.user._id == val.id) {
          this.disableParticipantScreenShareButton = data.buttton
          this.toggleScreenShare()
        }
      }
      if (data.type == 'rejectScreenshare') {
        const val = JSON.parse(data.payload);
        console.log(data);
        if (this.user._id == val.id) {
          this.disableParticipantScreenShareButton = val.button
          this.showToster(val.id)
        }
      }
      if (data.type == "pinParticipant") {
        if (this.user.role == 'student') {
          const host = this.participants.find(e => e.userId == this.schedule.host_id);
          console.log("Host And Participant after other participant joined", host, this.participants);
          if (host != undefined) {
            this.setLargeVideo(host.jitsiId)
          }

        }
      }
      if (data.type == 'pinAfterScreenShare') {
        setTimeout(() => {
          if (this.user.role == 'student') {
            const host = this.participants.find(e => e.userId == this.schedule.host_id);
            console.log("Host And Participant after other participant joined", host, this.participants);
            if (host != undefined) {
              this.setLargeVideo(host.jitsiId)
            }
          }
        }, 3000);
      }
      if (data.type == 'unPinHost') {
        console.log("unpin called");
        if (this.user.role == 'student') {
          const host = this.participants.find(e => e.userId == this.schedule.host_id);
          console.log("Host And Participant after other participant joined", host, this.participants);
          this.setLargeVideo("")
        }
      }
      //Send action to a participant
      if (data.type == "action") {
        if (data.payload == "kickeveryone") {
          console.log("Action kick everyone socket", data);
          if (this.user.role == 'student') {
            this.hangUp()
          }
        }
        if (data.destination_id == this.mePartipant.userId) {

          console.log("Action Targeted kick and mute screen share socket", data);

          switch (data.payload) {

            //Write Action Cases
            case "toggleVideo": this.toggleVideoMute()
              break;
            case "toggleAudio": this.toggleAudioMute()
              break;
            case "kickout": this.kickParticipant(data.destination_id)
              break;
          }
        }
      }
    }
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
  }
  async startRecording() {
    this.isRecording = !this.isRecording
    console.log('called');
    var displaymediastreamconstraints = {
      video: {
        displaySurface: 'monitor',
        logicalSurface: true,
        cursor: 'always',
        minWidth: 1280,
        minHeight: 720,
        maxWidth: 1920,
        maxHeight: 1080,
        minAspectRatio: 1.77
      },
      audio: true
    };
    const mediaDevices = navigator.mediaDevices as any;
    const stream = await mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
    console.log(stream);
  }
  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'video/webm',
      bitsPerSecond: 128000
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
  }
  errorCallback(error) {
    console.log(error);
    this.isRecording = !this.isRecording
  }
  stopRecording() {
    this.isRecording = !this.isRecording
    console.log("stop called!");
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());

  }
  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    var recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
    this.recordRTC.save(`${this.schedule.name}_record.webm`);
  }

}



//--------End----socket code------------------------

//set config individually in here first then you can move to seperate file
// detect audio change and change the local muted state.



