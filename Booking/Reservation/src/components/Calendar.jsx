// src/components/Calendar.jsx
import React from 'react';
import { useMemo } from 'react';
import clsx from 'clsx';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils';
import { useCalendar } from '../hooks/useCalendar';

// A smaller component for rendering each day cell
const CalendarDay = React.memo(({ day, isToday, isSelected, isPast, onClick }) => {
    const dayClasses = clsx(
        'p-2 text-center border rounded-lg transition-colors duration-300',
        {
            'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500': isPast,
            'cursor-pointer bg-white hover:bg-blue-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600': !isPast && !isSelected,
            'bg-blue-600 text-white font-bold dark:bg-blue-600': isSelected,
            'border-blue-500 border-2': isToday && !isSelected,
        }
    );

    return ( 
        <div className={dayClasses} onClick={!isPast ? onClick : undefined}>
            {day}
        </div>
    );
});


export const Calendar = ({ selectedDate, onDateClick }) => {
    const { currentYear, currentMonth, handlePrevMonth, handleNextMonth } = useCalendar();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

    // Create an array of calendar day elements
    const calendarDays = useMemo(() => {
        const days = [];
        // Add empty cells for the start of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="border rounded-lg p-2"></div>);
        }

        // Add cells for each day
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isToday = today.getTime() === date.getTime();
            const isSelected = selectedDate.getTime() === date.getTime();
            const isPast = date < today;

            days.push(
                <CalendarDay
                    key={day}
                    day={day}
                    isToday={isToday}
                    isSelected={isSelected}
                    isPast={isPast}
                    onClick={() => onDateClick(day, currentYear, currentMonth)}
                />
            );
        }
        return days;
    }, [currentYear, currentMonth, firstDayOfMonth, daysInMonth, selectedDate, onDateClick]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">&lt;</button>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={handleNextMonth} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-sm text-center text-gray-600 dark:text-gray-400 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {calendarDays}
            </div>
        </div>
    );
};