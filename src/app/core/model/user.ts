export interface LoginResponse {
    success: boolean;
    token: string;
    user: User
}


export class Teacher {
    belongs_to_class: string[]
    subjects: string[]
    is_class_teacher: boolean
    class_teacher_of: string
    mobile_number: number

}

export class Student {
    belongs_to_class: string
    parent_email_id: string
    parent_phone_number: number

}
export class Admin {
    belongs_to_school: string
    mobile_number: string
}



export class User {
    _id: string
    email: string
    password: string
    role: string
    name: string
    token: string
    belongs_to_school: string
    subscriptionPlan: number
    _teacher: Teacher
    _student: Student
    _admin: Admin
}


