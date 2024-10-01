import React from "react";
import DatePicker from "react-datepicker";
import './DatePickerComponent.css'

interface DatePickerComponentProps {
  plannedStartDate: Date | null
  plannedEndDate: Date | null
  actualStartDate: Date | null
  actualEndDate: Date | null
  setPlannedStartDate: (date: Date | null) => void
  setPlannedEndDate: (date: Date | null) => void
  setActualStartDate: (date: Date | null) => void
  setActualEndDate: (date: Date | null) => void
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  plannedStartDate, plannedEndDate, actualStartDate, actualEndDate,
  setPlannedStartDate, setPlannedEndDate, setActualStartDate, setActualEndDate
}) => {
  return (
    <div>
      <div className="date-picker-row">
        <div className="date-picker-item">
          <label>開始予定日</label>
          <DatePicker
            selected={plannedStartDate}
            onChange={(date) => setPlannedStartDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="date-picker-item">
          <label>終了予定日</label>
          <DatePicker
            selected={plannedEndDate}
            onChange={(date) => setPlannedEndDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="date-picker-item">
          <label>開始実績日</label>
          <DatePicker
            selected={actualStartDate}
            onChange={(date) => setActualStartDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="date-picker-item">
          <label>終了実績日</label>
          <DatePicker
            selected={actualEndDate}
            onChange={(date) => setActualEndDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
      </div>
    </div>
  )
}

export default DatePickerComponent