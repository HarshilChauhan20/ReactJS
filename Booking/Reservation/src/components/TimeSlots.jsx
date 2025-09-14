// src/components/TimeSlots.jsx
import React from 'react';

export const TimeSlots = React.memo(({ selectedDate, timeSlots, bookedSlots, onTimeSlotClick }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Available Slots for {selectedDate.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
            <div className="grid grid-cols-3 gap-3">
                {timeSlots.map(time => {
                    const isBooked = bookedSlots.includes(time);
                    
                    // The base classes that apply to all slots
                    const baseClasses = 'p-3 text-center rounded-lg transition-all duration-300';
                    
                    // Conditional classes determined by the 'isBooked' state
                    const conditionalClasses = isBooked
                        ? 'bg-red-500 text-white cursor-not-allowed opacity-70'
                        : 'bg-green-500 text-white cursor-pointer hover:bg-green-600 transform hover:-translate-y-1';

                    return (
                        <div 
                            key={time} 
                            className={`${baseClasses} ${conditionalClasses}`} // Combine classes
                            onClick={() => !isBooked && onTimeSlotClick(time)}
                        >
                            {time}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});