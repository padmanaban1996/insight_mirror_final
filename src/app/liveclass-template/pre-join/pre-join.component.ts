import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Socket } from 'dgram';


@Component({
  selector: 'app-pre-join',
  templateUrl: './pre-join.component.html',
  styleUrls: ['./pre-join.component.css']
})
export class PreJoinComponent implements OnInit {
  @Input() socketConnected: boolean;
  @Output() ConnectionChecked: EventEmitter<boolean> = new EventEmitter();
  hasMicrophone = false;
  hasSpeakers = false;
  connectedAgain: boolean = false;
  mediaConstraints = {
    audio: true
  };
  allChecked: boolean = false
  @Input() socketInstance
  constructor() {
  }
  ngOnChanges(): void {
    console.log("live class changes", this.socketConnected);

  }

  allConnected() {
    this.ConnectionChecked.emit(this.allChecked)
  }

  ngOnInit(): void {
    if (this.socketConnected == false)
      this.socketInstance.connect();
    navigator.mediaDevices.getUserMedia(this.mediaConstraints).then((stream) => {
      if (stream.active == true)
        this.hasMicrophone = true
      console.log("success", stream);
    }, (err) => console.log("error in getting mike", err));

  }

  onRefresh() {
    if (this.socketConnected == false) {
      this.socketInstance.connect();
      console.log(this.socketInstance.ioSocket.connected);

    }

    else
      this.connectedAgain = true
  }

}
