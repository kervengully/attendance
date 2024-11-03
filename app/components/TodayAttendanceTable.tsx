// components/TodayAttendanceTable.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { AttendanceRow } from '../types';

type TodayAttendanceTableProps = {
  title: string;
  data: AttendanceRow[];
  onStatusToggle: (index: number) => void;
};

const TodayAttendanceTable: React.FC<TodayAttendanceTableProps> = ({
  title,
  data,
  onStatusToggle,
}) => {
  const [, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const isAnyoneWorking = data.some((row) => row.isWorking);

    if (!isAnyoneWorking) return;

    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  const calculateWorkedHours = (enteredTimeStr: string) => {
    const enteredTime = new Date(enteredTimeStr);
    const now = new Date();
    const diffMs = now.getTime() - enteredTime.getTime();

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate" style={{ borderSpacing: '0.5rem' }}>
          <thead>
            <tr>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Employee name</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Action</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Status</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Entered time</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Worked hours</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`${row.name}-${index}`} className="text-center">
                <td className="px-4 py-2 bg-gray-200 rounded-md">{row.name}</td>
                <td className=" ">
                  <button
                    className={`px-4 py-2 w-full rounded-md text-white ${
                      row.isWorking ? 'bg-red-500' : 'bg-green-400'
                    }`}
                    onClick={() => onStatusToggle(index)}
                  >
                    {row.isWorking ? 'Stop' : 'Start'}
                  </button>
                </td>
                <td className="px-4 py-2 bg-gray-200 rounded-md">
                  {row.isWorking ? 'Working' : 'Not Working'}
                </td>
                <td className="px-4 py-2 bg-gray-200 rounded-md">
                  {row.enteredTime
                    ? new Date(row.enteredTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })
                    : '---'}
                </td>
                <td className="px-4 py-2 bg-gray-200 rounded-md">
                  {row.isWorking && row.enteredTime ? calculateWorkedHours(row.enteredTime) : '---'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayAttendanceTable;
