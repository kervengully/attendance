// components/PreviousAttendanceTable.tsx

"use client";

import React from 'react';
import { WorkSession } from '../types';

type PreviousAttendanceTableProps = {
  title: string;
  data: WorkSession[];
};

const PreviousAttendanceTable: React.FC<PreviousAttendanceTableProps> = ({ title, data }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate" style={{ borderSpacing: '0.5rem' }}>
          <thead>
            <tr>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Employee name</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Day of the week</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Date</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Entered time</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Finished time</th>
              <th className="px-4 py-2 text-white bg-blue-600 rounded-md">Worked hours</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="text-center">
                <td className="px-4 py-2 bg-gray-200 rounded-md">{row.name}</td>
                <td className="px-4 py-2 bg-gray-200 rounded-md">{row.dayOfWeek}</td>
                <td className="px-4 py-2 bg-gray-200 rounded-md">{row.date}</td>
                <td className="px-4 py-2 bg-gray-200 rounded-md">
                  {new Date(row.enteredTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </td>
                <td className="px-4 py-2 bg-gray-200 rounded-md">
                  {new Date(row.finishedTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </td>
                <td className="px-4 py-2 bg-gray-200 rounded-md">{row.workedHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreviousAttendanceTable;
