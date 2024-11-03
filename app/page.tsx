// pages/index.tsx

"use client";
import { useState, useEffect } from 'react';
import TodayAttendanceTable from './components/TodayAttendanceTable';
import PreviousAttendanceTable from './components/PreviousAttendanceTable';
import { AttendanceData, AttendanceRow, WorkSession } from './types';

const Home: React.FC = () => {
  const [todayData, setTodayData] = useState<AttendanceRow[]>([]);
  const [previousData, setPreviousData] = useState<WorkSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('attendanceData');
    if (storedData) {
      const data: AttendanceData = JSON.parse(storedData);
      setTodayData(data.todayData);
      setPreviousData(data.previousData);
    } else {
      // If no data in local storage, initialize with default data
      const defaultTodayData: AttendanceRow[] = [
        {
          name: 'Kerven',
          isWorking: false,
          enteredTime: null,
        },
        {
          name: 'Kadyr',
          isWorking: false,
          enteredTime: null,
        },
        {
          name: 'Kerim',
          isWorking: false,
          enteredTime: null,
        },
        {
          name: 'Atabay',
          isWorking: false,
          enteredTime: null,
        },
      ];
      setTodayData(defaultTodayData);
      setPreviousData([]);
    }
    setLoading(false);
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    if (!loading) {
      const dataToSave: AttendanceData = {
        todayData,
        previousData,
      };
      localStorage.setItem('attendanceData', JSON.stringify(dataToSave));
    }
  }, [todayData, previousData, loading]);

  // Function to handle Start/Stop button clicks
  const handleStatusToggle = (index: number) => {
    let newWorkSession: WorkSession | null = null;

    setTodayData((prevTodayData) => {
      const newTodayData = [...prevTodayData];
      const currentRow = newTodayData[index];

      if (!currentRow.isWorking) {
        // User is starting work
        const updatedRow: AttendanceRow = {
          ...currentRow,
          enteredTime: new Date().toISOString(),
          isWorking: true,
        };
        newTodayData[index] = updatedRow;
      } else {
        // User is stopping work
        const startTimeStr = currentRow.enteredTime;
        if (startTimeStr) {
          const startTime = new Date(startTimeStr);
          const endTime = new Date();
          const diffMs = endTime.getTime() - startTime.getTime();

          const totalSeconds = Math.floor(diffMs / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          const workedHours = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0'
          )}:${String(seconds).padStart(2, '0')}`;

          // Create a WorkSession entry
          newWorkSession = {
            id: `${currentRow.name}-${Date.now()}`,
            name: currentRow.name,
            dayOfWeek: endTime.toLocaleDateString('en-US', { weekday: 'long' }),
            date: endTime.toLocaleDateString('en-US'),
            enteredTime: startTime.toISOString(),
            finishedTime: endTime.toISOString(),
            workedHours,
          };

          // Reset the currentRow
          const updatedRow: AttendanceRow = {
            ...currentRow,
            isWorking: false,
            enteredTime: null,
          };
          newTodayData[index] = updatedRow;
        }
      }

      return newTodayData;
    });

    if (newWorkSession) {
      setPreviousData((prevPreviousData) => {
        // Prepend the new work session to the array
        const updatedPreviousData = [newWorkSession!, ...prevPreviousData];
        return updatedPreviousData;
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <TodayAttendanceTable title="Today" data={todayData} onStatusToggle={handleStatusToggle} />
      <PreviousAttendanceTable title="Previous" data={previousData} />
    </div>
  );
};

export default Home;
