// src/hooks/useCalendar.js
import { useState, useMemo } from 'react';

export const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
    const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    return {
        currentDate,
        currentYear,
        currentMonth,
        handlePrevMonth,
        handleNextMonth,
    };
};