// src/components/AdminDashboard.jsx
import React, { useMemo } from 'react';

export const AdminDashboard = ({ bookings, onCancelBooking }) => {
    // Memoize the sorted bookings to avoid re-sorting on every render
    const sortedBookings = useMemo(() => {
        return [...bookings].sort((a, b) => new Date(a.date) - new Date(b.date) || a.time.localeCompare(b.time));
    }, [bookings]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Dashboard - All Bookings</h2>
            {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Time</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBookings.map((booking) => (
                                <tr key={booking.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">{booking.date}</td>
                                    <td className="px-6 py-4">{booking.time}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{booking.name}</td>
                                    <td className="px-6 py-4">{booking.email}</td>
                                    <td className="px-6 py-4">
                                        {/* Use the unique ID for cancellation */}
                                        <button onClick={() => onCancelBooking(booking.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Cancel</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No bookings found.</p>
            )}
        </div>
    );
};