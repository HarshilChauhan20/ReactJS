import React from 'react';

const UserCard = ({ user }) => {
  const { name, picture, email, location, phone } = user;
  const fullName = `${name.first} ${name.last}`;
  const address = `${location.city}, ${location.country}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center transform hover:scale-105 transition-transform duration-300">
      <img
        src={picture.large}
        alt={fullName}
        className="w-32 h-32 rounded-full mx-auto -mt-20 border-8 border-white shadow-md"
      />
      <h2 className="text-2xl font-bold text-gray-800 mt-4">{fullName}</h2>
      <p className="text-gray-500 mt-1">{email}</p>
      <p className="text-gray-700 mt-4">{address}</p>
      <p className="text-gray-600 mt-2">{phone}</p>
    </div>
  );
};

export default UserCard;