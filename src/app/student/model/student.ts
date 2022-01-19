

export class StudentUser {
    _id: string
    email: string
    password: string
    role: string
    name: string
    belongs_to_school: string
    subscriptionPlan: number
    _student: Student
}



export class StudentCreate {
    email: string
    password: string
    role: string
    name: string
    belongs_to_school: string
    subscriptionPlan: number
    _student: Student
}

export class Student {
    name: string;
    belongs_to_class_id: string;
    parent_email_id: string;
    parent_mobile_number: number;
}