"use client"; // Ensure this is at the top

import React from 'react';

export type AttendanceRow = {
  name: string;
  isWorking: boolean;
  dayOfWeek: string;
  date: string;
  enteredTime: Date | null;
  finishedTime: Date | null;
  workedHours: string;
};

type AttendanceTableProps = {
  title: string;
  data: AttendanceRow[];
  onStatusToggle?: (index: number) => void;
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ title, data, onStatusToggle }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate" style={{ borderSpacing: '0.5rem' }}>
        <thead>
          <tr>
            {[
              'Employee name',
              'Action',
              'Status',
              'Day of the week',
              'Date',
              'Entered time',
              'Finished time',
              'Worked hours',
            ].map(header => (
              <th key={header} className="px-4 py-2 text-white bg-blue-600 rounded-md">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 bg-gray-200 rounded-md">{row.name}</td>
              <td className="px-4 py-2">
                {onStatusToggle ? (
                  <button
                    className={`px-4 py-2 rounded-md text-white ${
                      row.isWorking ? 'bg-red-500' : 'bg-green-400'
                    }`}
                    onClick={() => onStatusToggle(index)}
                  >
                    {row.isWorking ? 'Stop' : 'Start'}
                  </button>
                ) : (
                  <span>-</span>
                )}
              </td>
              <td className="px-4 py-2 bg-gray-200 rounded-md">{row.isWorking ? 'Working' : 'Not Working'}</td>
              <td className="px-4 py-2 bg-gray-200 rounded-md">{row.dayOfWeek}</td>
              <td className="px-4 py-2 bg-gray-200 rounded-md">{row.date}</td>
              <td className="px-4 py-2 bg-gray-200 rounded-md">
                {row.enteredTime
                  ? row.enteredTime.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })
                  : '---'}
              </td>
              <td className="px-4 py-2 bg-gray-200 rounded-md">
                {row.finishedTime
                  ? row.finishedTime.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })
                  : '---'}
              </td>
              <td className="px-4 py-2 bg-gray-200 rounded-md">{row.workedHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AttendanceTable;
