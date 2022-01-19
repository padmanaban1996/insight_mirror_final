


export class AdminDashboard {
    studentsCount: number
    teachersCount: number
    liveSchedulesCount: number
    upcomingSchedulesCount: number
    closedSchedule: number
    // subscription_valid_till: Date

    attendancePercentage: AttendancePercentage[]
    teacherClosedClassChart: TeacherClosedClassChart[]
}

export class AttendancePercentage {

    date: string
    participants: number
    attended: number // sum up of all classess percentage.
}
export class TeacherClosedClassChart {
    host_id: string
    count: number
}
