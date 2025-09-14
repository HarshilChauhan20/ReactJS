// src/App.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { formatDate } from './utils/dateUtils';
import { Calendar } from './components/Calendar';
import { TimeSlots } from './components/TimeSlots';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { fetchBookings, addBooking, deleteBooking } from './services/bookingService';

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const App = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookings, setBookings] = useState([]);
    const [view, setView] = useState('user');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [isLoading, setIsLoading] = useState(true); // To show a loading state

    // --- Effect to load data from the service on startup ---
    useEffect(() => {
        const loadData = async () => {
            const initialBookings = await fetchBookings();
            setBookings(initialBookings);
            setIsLoading(false);
        };
        loadData();
    }, []);

    const formattedSelectedDate = useMemo(() => formatDate(selectedDate), [selectedDate]);

    const bookedSlots = useMemo(() =>
        bookings
            .filter(booking => booking.date === formattedSelectedDate)
            .map(booking => booking.time),
        [bookings, formattedSelectedDate]
    );

    const handleDateClick = useCallback((day, year, month) => {
        setSelectedDate(new Date(year, month, day));
    }, []);

    const handleTimeSlotClick = (time) => {
        if (bookedSlots.includes(time)) return;
        setSelectedTimeSlot(time);
        setIsModalOpen(true);
    };

    const handleBookingSubmit = async (bookingDetails) => {
        const bookingData = {
            date: formattedSelectedDate,
            time: selectedTimeSlot,
            ...bookingDetails,
        };
        // Call the service to add the booking
        const newBooking = await addBooking(bookingData);
        // Update the state with the returned booking
        setBookings(prev => [...prev, newBooking]);
        setIsModalOpen(false);
        setFormData({ name: '', email: '' });
    };

    const cancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            // Call the service to delete the booking
            await deleteBooking(bookingId);
            // Update the state by removing the booking
            setBookings(bookings.filter((booking) => booking.id !== bookingId));
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-wrap justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">📅 Booking Master</h1>
                    {/* View Switcher... */}
                    <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 rounded-full p-1">
            <button onClick={() => setView('user')} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors${view === 'user' ? 'bg-white dark:bg-gray-900 shadow' : 'text-gray-600 dark:text-gray-300'}`}>User View</button>
            <button onClick={() => setView('admin')} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${view === 'admin' ? 'bg-white dark:bg-gray-900 shadow' : 'text-gray-600 dark:text-gray-300'}`}>Admin View</button>
          </div>
                </header>

                <main>
          {/* 3. ADD the logic to show the DataViewer */}
          {view === 'user' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Calendar selectedDate={selectedDate} onDateClick={handleDateClick} />
              <TimeSlots
                                selectedDate={selectedDate}
                                timeSlots={TIME_SLOTS}
                                bookedSlots={bookedSlots}
                                onTimeSlotClick={handleTimeSlotClick}
                            />
            </div>
          )}

          {view === 'admin' && (
            <AdminDashboard bookings={bookings} onCancelBooking={cancelBooking} />
          )}
        </main>
                

            </div>
            
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleBookingSubmit}
                date={formattedSelectedDate}
                time={selectedTimeSlot}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
};

export default App;