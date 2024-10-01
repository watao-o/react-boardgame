import React from "react";
import './Calendar.css'

interface CalendarProps {
  plannedStartDate: Date | null
  plannedEndDate: Date | null
  actualStartDate: Date | null
  actualEndDate: Date | null
}
const Calendar: React.FC<CalendarProps> = ({ plannedStartDate, plannedEndDate, actualStartDate, actualEndDate }) => {
  const startDate = new Date(2024, 8, 1); // 2024年9月1日（0-indexedで8月）
  const endDate = new Date(2025, 2, 31); // 2025年3月31日（0-indexedで2月）
  
  const renderLines = () => {
    const lines = [];

    // 予定の線を描画
    if (plannedStartDate && plannedEndDate) {
      const startDay = plannedStartDate.getDate() - 1;
      const endDay = plannedEndDate.getDate() - 1;


      lines.push(
        <div key="planned" className="line-container" style={{ gridColumn: `${startDay + 1} / ${endDay + 2}` }}>
          <div className="line"/>
        </div>
      );
    }
    
    // 実績の線を描画
    if (actualStartDate && actualEndDate) {
      const startDay = actualStartDate.getDate() - 1;
      const endDay = actualEndDate.getDate() - 1;
      lines.push(
        <div key="actual" className="line-container" style={{ gridColumn: `${startDay + 1} / ${endDay + 2}` }}>
          <div className="actual-line" />
        </div>
      );
    }

    console.log(lines)
    return lines;
  }

  // カレンダーの日付を生成
  const generateDays = () => {
    const days = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push(
        <div key={currentDate.toISOString()} className="day">
          {`${currentDate.getMonth() + 1}/${currentDate.getDate()}`}
          {renderLines()}
        </div>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        {generateDays()}
      </div>
    </div>
  )
}

export default Calendar;