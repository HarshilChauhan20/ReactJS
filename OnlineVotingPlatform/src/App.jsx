import React, { useState } from 'react';

export default function App() {

  const [poll, setPoll] = useState({
    question: "What's your favorite programming language?",
    options: [
      { id: 1, text: 'JavaScript', votes: 0 },
      { id: 2, text: 'Python', votes: 0 },
      { id: 3, text: 'C++', votes: 0 },
      { id: 4, text: 'Java', votes: 0 },
    ],
  });

  const handleVote = (optionId) => {
    
    setPoll(prevPoll => {
      const updatedOptions = prevPoll.options.map(option => {
        if (option.id === optionId) {
          return { ...option, votes: option.votes + 1 };
        }
        return option;
      });

      return {
        ...prevPoll,
        options: updatedOptions,
      };
    });
  };

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 m-4">
        {/* Display the poll question */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          {poll.question}
        </h1>
        
        {/* Container for the poll options */}
        <div className="space-y-4">
          {/* We map over the options array to display each one dynamically. */}
          {poll.options.map(option => {
            const percentage = totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100;

            return (
              <div key={option.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex-grow mb-2 sm:mb-0">
                    <span className="text-lg text-gray-700">{option.text}</span>
                    <span className="ml-4 text-sm font-semibold text-gray-500">
                      ({option.votes} {option.votes === 1 ? 'vote' : 'votes'})
                    </span>
                  </div>
                  <button
                    onClick={() => handleVote(option.id)}
                    className="w-full sm:w-auto bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Vote
                  </button>
                </div>
                
                {/* Bonus: Percentage Bar */}
                <div className="mt-4 bg-gray-200 rounded-full h-4 w-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Display the total votes at the bottom */}
        <div className="text-center mt-8">
            <p className="text-xl font-semibold text-gray-800">Total Votes: {totalVotes}</p>
        </div>
      </div>
    </div>
  );
}
