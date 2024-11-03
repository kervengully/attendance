// components/AttendanceTable.tsx
"use client";

import React, { useState, useEffect } from 'react';

export type WorkSession = {
  enteredTime: Date;
  finishedTime: Date | null;
  workedHours: string;
};

export type AttendanceRow = {
  name: string;
  isWorking: boolean;
  dayOfWeek: string;
  date: string;
  sessions: WorkSession[];
};

type AttendanceTableProps = {
  title: string;
  data: AttendanceRow[];
  onStatusToggle?: (index: number) => void;
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ title, data, onStatusToggle }) => {
  const showActionColumn = typeof onStatusToggle === 'function';
  const [, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const isAnyoneWorking = data.some((row) => row.isWorking);

    if (!isAnyoneWorking) return;

    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  const calculateWorkedHours = (enteredTime: Date) => {
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
              {showActionColumn && (
                <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Action</th>
              )}
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Status</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Day of the week</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Date</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Sessions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <React.Fragment key={`${row.name}-${index}`}>
                <tr className="text-center">
                  <td className="px-4 py-2 bg-gray-200 rounded-md">{row.name}</td>
                  {showActionColumn && (
                    <td className="px-4 py-2">
                      <button
                        className={`px-4 py-2 rounded-md text-white ${
                          row.isWorking ? 'bg-red-500' : 'bg-green-400'
                        }`}
                        onClick={() => onStatusToggle && onStatusToggle(index)}
                      >
                        {row.isWorking ? 'Stop' : 'Start'}
                      </button>
                    </td>
                  )}
                  <td className="px-4 py-2 bg-gray-200 rounded-md">
                    {row.isWorking ? 'Working' : 'Not Working'}
                  </td>
                  <td className="px-4 py-2 bg-gray-200 rounded-md">{row.dayOfWeek}</td>
                  <td className="px-4 py-2 bg-gray-200 rounded-md">{row.date}</td>
                  <td className="px-4 py-2 bg-gray-200 rounded-md">
                    {row.sessions.length > 0 ? (
                      <table className="min-w-full border-separate" style={{ borderSpacing: '0.5rem' }}>
                        <thead>
                          <tr>
                            <th className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md">
                              Entered Time
                            </th>
                            <th className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md">
                              Finished Time
                            </th>
                            <th className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md">
                              Worked Hours
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.sessions.map((session, idx) => (
                            <tr key={idx} className="text-center">
                              <td className="px-2 py-1 bg-gray-100 rounded-md">
                                {session.enteredTime.toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                })}
                              </td>
                              <td className="px-2 py-1 bg-gray-100 rounded-md">
                                {session.finishedTime
                                  ? session.finishedTime.toLocaleTimeString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      second: '2-digit',
                                    })
                                  : row.isWorking
                                  ? 'In Progress'
                                  : '---'}
                              </td>
                              <td className="px-2 py-1 bg-gray-100 rounded-md">
                                {session.finishedTime
                                  ? session.workedHours
                                  : row.isWorking
                                  ? calculateWorkedHours(session.enteredTime)
                                  : '---'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      '---'
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
