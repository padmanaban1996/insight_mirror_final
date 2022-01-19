export class Participant {
    userId: string
    name: string
    //below role can be presenter / listener
    role: string
    email: string
    jitsiId: string
    socketId: string
    quizResults: singleStudentAnswerSheet[]
    audioMute: boolean
    videoMute: boolean
    kikout: boolean
}

export class singleQuestionAnswer {
    answerOption: string
    questionIndex: number
    selectedIndex: string

    qtype:string
    matchAnsOption: any[]
    correctMatchAns: any[]
    
    title: string
    answer: string
    name: string
    answered: boolean
}

export class singleQuestionResult {
    a: number
    b: number
    c: number
    d: number
}
export class singleStudentAnswerSheet {
    id: string
    name: string
    answerSheet: singleQuestionAnswer[]
    answeredCount: number
}

export class UserActivity {
    participant_id: string
    email: string
    name: string
    activity_type: string
    time: string
}
export class CreateUserActivity {
    participant_id: string
    email: string
    name: string
    activity_type: string
    time: string
}