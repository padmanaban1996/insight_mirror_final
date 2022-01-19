import { StickyDirection } from "@angular/cdk/table";


//File paths

export const questionTemplateFilePath: string = '/assets/files/questions_upload.xlsx';
export const studentsTemplateFilePath: string = '/assets/files/students_single_class.csv';
export const teachersTemplateFilePath: string = '/assets/files/teachers.csv';



// form
// login,verify 
export const title: string = 'Insight Mirror';
export const emailLabel: string = 'Email Adress';
export const passwordLabel: string = 'Password';
export const forgotPasswordLabel: string = 'Forgot Password?';
export const backToLogin: string = 'Back to Login';
export const signInButton: string = 'Sign In';
export const verifyEmailButton: string = 'Verify Email';
export const errorAlert: string = 'Please enter a valid address';
// Quiz create 
export const quizCreate: string = 'Create Quiz';
export const quizlabel: string = 'Quiz Title';
export const quizQustionAdd: string = 'Add new question';
export const selectQuestionLabel: string = 'Click to add questions';
export const quizcreateButton: string = 'Create';
//Quiz add new question form
export const newQuestionModalTitle: string = 'Question';
export const newQuestionErrorMsg: string = 'Please select an answer';
export const inputQuestionPlaceholder: string = 'Enter your question here';
export const option1Placeholder: string = 'Option 1';
export const option2Placeholder: string = 'Option 2';
export const option3Placeholder: string = 'Option 3';
export const option4Placeholder: string = 'Option 4';
export const addQuestionBUtton: string = 'Add question';
// Schedule create form 
export const scheduleCreateTitle: string = 'Create Schedule';
export const scheduleCreateError: string = 'Please enter a valid time';
export const meetNameLabel: string = 'Meeting Name';
export const meetNamePlaceholder: string = 'Ex:science';
export const SubjectsSelectLabel: string = 'Subject'
export const subjectsSelectPlaceholder: string = 'Select a subject';
export const addParticipentsLabel: string = 'Add participants'
export const dateLabel: string = 'Schedule date';
export const startTimeLabel: string = 'Start Time:';
export const endTimeLabel: string = 'End Time:';
export const scheduleCreateButton: string = 'Add';
// students create form
export const studentCreateTitle: string = 'Create Student';
export const pwdConfirmError: string = 'Password and Confirm Password isn’t a match';
export const emailError: string = 'Please enter a valid address';
export const studentNameLabel: string = 'Name';
export const studentEmailLabel: string = 'Email';
export const studentPasswordLabel: string = 'Password';
export const studentCPasswordLabel: string = 'Confirm password';
export const parentPhoneNumberLabel: string = "Parent's phone number";
export const studentClassLabel: string = 'Class';
export const parentEmailLabel: string = "Parent's Email";
export const studentSubmitButton: string = 'Submit';
// teacher create form
export const teacherCreateTitle: string = 'Create Teacher';
export const teacherNameLabel: string = 'Name';
export const teacherEmailLabel: string = 'Email';
export const teacherPasswordLabel: string = 'Password';
export const teacherCPasswordLabel: string = 'Confirm password';
export const teacherClassLabel: string = 'Class';
export const teacherClassesPlaceholder: string = 'Select a class';
export const classTeacherofLabel: string = 'Is he/she a class teacher';
export const subjectsLabel: string = 'Subject';
export const subjectsPlaceHolder: string = 'Select the subjects';
export const teacherMobileNUmber: string = 'Mobile number'
export const teacherSubmitButton: string = 'Submit';
// admin create form
export const adminCreateTitle: string = 'Add Admin';
export const adminNameLabel: string = 'Name';
export const adminEmailLabel: string = 'Email';
export const adminPasswordLabel: string = 'Password';
export const adminCPasswordLabel: string = 'Confirm password';
export const adminMobileNUmber: string = 'Mobile number';
export const adminSubmitButton: string = 'Submit';
//classes create form
export const classCreateTitle: string = 'Add class';
export const classCreateError: string = 'Class name is required';
export const classNameLabel: string = 'Name';
export const classSubmitButton: string = 'Submit';

// subjects create form 
export const subjectCreateTitle: string = 'Add subject';
export const subjectNameLabel: string = 'Name';
export const subjectCreateError: string = 'Subject name is required';
export const subjectSubmitButton: string = 'Submit';

// pages
// quiz page
export const quizPageTitle: string = 'Quiz';
export const quizAddButton: string = 'Add';
export const searchPlaceholder: string = "Search..."
export const quizTableHead: string = 'Name';
export const quizError: string = 'Please create a new quiz';
export const quizQuestionLabel = 'Questions'
// schedule page
export const scheduleError: string = 'Please create a new schedule'
export const schedulePageTitle: string = 'Schedule';
export const matToggleLabel1: string = 'All';
export const matToggleLabel2: string = 'Upcoming';
export const matToggleLabel3: string = 'Completed';
export const scheduleAddButton: string = 'Add';
export const teacherFilterPlaceholder: string = 'Select Teacher';
export const subjectFilterPlaceholder: string = 'Select Subject';
export const scheduleTimeLabel: string = 'Scheduled Time';
export const Joinclass: string = 'Join class';
export const summary: string = 'Summary';
export const start: string = 'Start';

// settings page
export const settingsNavLabel1: String = 'Admin';
export const settingsNavLabel2: String = 'Student';
export const settingsNavLabel3: String = 'Teacher';
export const settingsNavLabel4: String = 'Class';
export const settingsNavLabel5: String = 'Subject';
export const settingsNavLabel6: String = 'Subscription';

// admin page
export const adminPageTitle: string = 'Admin';
export const adminAddButton: string = '+ Add Admin';
export const adminError: string = 'Create an admin';
export const adminTableHead: string = 'Name';
// students page
export const studentFilterPlaceholder: string = 'Select a class';
export const studentAddButton: string = 'Add';
export const studentUploadButton: string = 'Upload';
export const studentError: string = 'Create a student';
export const studentTableHead: string = 'Name';
// teacher page
export const teacherAddButton: string = 'Add';
export const teacherUploadButton: string = 'Upload';
export const teacherError: string = 'Create a teacher';
export const teacherTableHead: string = 'Name';

// student upload, teacher upload
export const studentuploadTitle: string = 'Upload';
export const teacheruploadTitle: string = 'Upload';
export const studentUploadClassLabel: string = 'Class';
export const studentselectedClass: string = 'Current selected class is';
export const uploadText: string = 'Click to download the template';
export const downloadButton: string = 'Download Template';
export const saveButton: string = 'Save';

// classes page
export const classesPageTitle: string = 'Class';
export const classAddButton: string = '+Add Class';

export const classError: string = 'Create class';
export const classTableHead: string = 'Class';
// subjects page
export const subjectPageTitle: string = 'Subject';
export const subjectAddButton: string = '+Add Subject';

export const subjectError: string = 'Create subject';
export const subjectTableHead: string = 'Subject';

// liveclass page
export const quizLabel: string = 'Quiz';
export const settingsLabel: string = 'Settings';
export const whiteboardLabel: string = 'Whiteboard';
export const screenshareLabel: string = 'Screen share';
export const participentsLabel: string = 'Participants';
export const chatLabel: string = 'Chat';
export const chatInputPlaceholder: string = 'Enter your message here!';
// student modal,teacher modal ,settings modal
export const liveclassmodalTitle: string = 'Live Quiz';
export const quizStudentMessage1: string = 'Waiting for the host to start.. please Wait .............';
export const quizStudentMessage2: string = 'Quiz Ended successfully';
export const quizStudentMessage3: string = 'Waiting for others to submit answer';
export const quizCurrectAnswer: string = 'Correct answer';
export const quizWrongAnswer: string = 'Wrong answer';
export const quizResultMessage: string = 'Result Saved';
export const teacherParticipentsAnswered: string = 'No of Participants answered';
