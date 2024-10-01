import React, { useState } from "react";
import DatePickerComponent from "./DatePickerComponent";
import Calendar from "./Calendar";

const ScheduleBase: React.FC = () => {

  const [plannedStartDate, setPlannedStartDate] = useState<Date | null>(new Date("2024/09/15"));
  const [plannedEndDate, setPlannedEndDate] = useState<Date | null>(new Date("2024/09/25"));
  const [actualStartDate, setActualStartDate] = useState<Date | null>(new Date("2024/09/16"));
  const [actualEndDate, setActualEndDate] = useState<Date | null>(new Date("2024/09/26"));
  return (
    <>
      <DatePickerComponent
        plannedStartDate={plannedStartDate}
        plannedEndDate={plannedEndDate}
        actualStartDate={actualStartDate}
        actualEndDate={actualEndDate}
        setPlannedStartDate={setPlannedStartDate}
        setPlannedEndDate={setPlannedEndDate}
        setActualStartDate={setActualStartDate}
        setActualEndDate={setActualEndDate}
      />
      <Calendar
        plannedStartDate={plannedStartDate}
        plannedEndDate={plannedEndDate}
        actualStartDate={actualStartDate}
        actualEndDate={actualEndDate}
      />
    </>
  )
};

export default ScheduleBase;