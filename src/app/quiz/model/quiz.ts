export class Quiz {

    _id: string
    name: string
    questions: Iquestion[]
    belongsToSchool: string
    createdBy: string
    participants: [{
        studentId: string,
        attended: boolean
    }]
    participant: any[]
    subject: string
    starts_at: string
    ends_at: string
    session_ended: boolean
    session_started: boolean
    message?: string
    videos: any[]
    scheduled: boolean
}
export class Iparticipant {
    attended: boolean
    studentId: string
}
export class Iquestion {
    title: string
    a: string
    b: string
    c: string
    d: string
    correctAnswer: string
    createdBy: string
    qtype: string
    index: number
    totalQuestions: number
    matchfollow: any
    paragraph: string
}

export class QuizPaginated {
    docs: Quiz[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}