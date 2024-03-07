import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import './Calendar.css'; // Import the CSS file

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [clickedDate, setClickedDate] = useState(null);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleDayClick = (day) => {
    const dateString = format(day, 'yyyy-MM-dd');
    setClickedDate(dateString);
  
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
      <div className="calendar-days">
        {days.map(day => (
          <div key={day} className="day-label">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="calendar-cells">
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`day-cell ${isSameMonth(day, currentMonth) ? '' : 'disabled'} ${isToday(day) ? 'today' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="clicked-date">
        {clickedDate && <p>Clicked Date: {clickedDate}</p>}
      </div>
    </div>
  );
};

export default Calendar;
