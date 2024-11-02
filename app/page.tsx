"use client";
import { useState } from 'react';
import AttendanceTable, { AttendanceRow } from './components/AttendanceTable';

const Home: React.FC = () => {
  const [todayData, setTodayData] = useState<AttendanceRow[]>([
    {
      name: 'Kerven',
      isWorking: false,
      dayOfWeek: 'Friday',
      date: '01.11.2024',
      enteredTime: null,
      finishedTime: null,
      workedHours: '---',
    },
    {
      name: 'Kadyr',
      isWorking: true,
      dayOfWeek: 'Friday',
      date: '01.11.2024',
      enteredTime: new Date('2024-11-01T10:09:00'),
      finishedTime: null,
      workedHours: '---',
    },
    {
      name: 'Kerim',
      isWorking: false,
      dayOfWeek: 'Friday',
      date: '01.11.2024',
      enteredTime: null,
      finishedTime: null,
      workedHours: '---',
    },
    {
      name: 'Atabay',
      isWorking: true,
      dayOfWeek: 'Friday',
      date: '01.11.2024',
      enteredTime: new Date('2024-11-01T10:09:00'),
      finishedTime: null,
      workedHours: '---',
    },
  ]);

  const [previousData] = useState<AttendanceRow[]>([
    {
      name: 'Kerven',
      isWorking: false,
      dayOfWeek: 'Thursday',
      date: '31.10.2024',
      enteredTime: new Date('2024-10-31T08:00:00'),
      finishedTime: new Date('2024-10-31T17:00:00'),
      workedHours: '09:00:00',
    },
    {
      name: 'Kadyr',
      isWorking: false,
      dayOfWeek: 'Thursday',
      date: '31.10.2024',
      enteredTime: new Date('2024-10-31T09:00:00'),
      finishedTime: new Date('2024-10-31T18:00:00'),
      workedHours: '09:00:00',
    },
    // ... other entries
  ]);

  // Function to handle Start/Stop button clicks
  const handleStatusToggle = (index: number) => {
    setTodayData(prevData => {
      const newData = [...prevData];
      const currentRow = newData[index];

      if (!currentRow.isWorking) {
        // User is starting work
        currentRow.enteredTime = new Date();
        currentRow.isWorking = true;
        currentRow.finishedTime = null;
        currentRow.workedHours = '---';
      } else {
        // User is stopping work
        const startTime = currentRow.enteredTime;
        if (startTime) {
          const endTime = new Date();
          const diffMs = endTime.getTime() - startTime.getTime();

          const totalSeconds = Math.floor(diffMs / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          currentRow.finishedTime = endTime;
          currentRow.workedHours = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
          currentRow.isWorking = false;
          currentRow.enteredTime = null;
        }
      }

      return newData;
    });
  };

  return (
    <div className="p-8">
      <AttendanceTable title="Today" data={todayData} onStatusToggle={handleStatusToggle} />
      <AttendanceTable title="Previous" data={previousData} />
    </div>
  );
};

export default Home;
