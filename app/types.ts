// types.ts

export interface AttendanceRow {
  name: string;
  isWorking: boolean;
  enteredTime: string | null; // ISO string representation of Date
}

export interface WorkSession {
  id: string; // Unique identifier
  name: string;
  dayOfWeek: string;
  date: string;
  enteredTime: string; // ISO string representation of Date
  finishedTime: string; // ISO string representation of Date
  workedHours: string;
}

export interface AttendanceData {
  todayData: AttendanceRow[];
  previousData: WorkSession[];
}
