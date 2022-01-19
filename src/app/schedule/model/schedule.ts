export class PartcipantActivity {
    participant_id: string
    email: string
    activity_type: string
    time: string
    name: string
}
export class Attendance {

    participant_id: string
    name: string
    status: boolean

}
export class Schedule {
    _id: string // type def of model
    name: string
    room_id: string
    host_id: string
    host_joined: boolean
    subject: string
    starts_at: Date
    ends_at: Date
    scheduled_date: Date
    activities: PartcipantActivity[]
    belongs_to_school: string
    participants: string[]
    session_started: boolean
    sesssion_ended: boolean
    attendance: [Attendance]
    attendanceClosed: boolean
    pin_status: boolean
}


export class ScheduleCreate {

    name: string
    host_id: string
    belongs_to_school: string
    subject: string
    starts_at: Date
    ends_at: Date
    scheduled_date: Date
    participants: string[]

}
// export class SchedulePaginated {
//     docs: Schedule[];
//     total: number;
//     pages: number;
//     page: number;
//     limit: number;
// }