import React from "react";

interface ScheduleChartProps {
  plannedStartDate: Date | null
  plannedEndDate: Date | null
  actualStartDate: Date | null
  actualEndDate: Date | null
}
const ScheduleChart: React.FC<ScheduleChartProps> = ({
   plannedStartDate, plannedEndDate, actualStartDate, actualEndDate }) => {
  const getDaysBetWeen = (start: Date | null, end:Date | null) => {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return start && end ? Math.round((end.getTime() - start.getTime()) / millisecondsPerDay) : 0;
  };

  const plannedLength = getDaysBetWeen(plannedStartDate, plannedEndDate);

  return (
    <div style={{
      position: 'relative',
      height: '100px',
      border: '1px solid #ccc',
      margin: '20px 0'
    }}>
      <svg style={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}>
        <line
          x1={0}
          y1={50}
          x2={(plannedLength * 10)}
          y2={50}
          stroke="orange"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        {/* 実線（実績） */}
        {actualStartDate && actualEndDate && (
          <line
            x1={(getDaysBetWeen(plannedStartDate, actualStartDate) * 10)}
            y1={60}
            x2={(getDaysBetWeen(plannedStartDate, actualEndDate) * 10)}
            y2={60}
            stroke="green"
            strokeWidth={2}
          />
        )}
      </svg>
    </div>
  )
}

export default ScheduleChart;