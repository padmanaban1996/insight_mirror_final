
export class EachClassStudent {
    _id: string
    name: string
}

export class EachClassTeacher {
    _id: string
    name: string
    subject: string
}

export class EachClass {
    _id: string
    name: string
    belongs_to_school: string
    classTeacher: string
    // subjects: string[]
    students: EachClassStudent[]
    teachers: EachClassTeacher[]
}

export class EachClassCreate {
    name: string

}

