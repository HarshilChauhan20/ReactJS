import { useState, useEffect } from 'react';
import UserCard from './components/UserCard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      setUser(data.results[0]);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a user when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Random User Generator</h1>
      
      {loading ? (
        <p className="text-white text-xl">Loading...</p>
      ) : (
        user && <UserCard user={user} />
      )}
      
      <button
        onClick={fetchUser}
        disabled={loading}
        className="mt-8 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-400"
      >
        {loading ? 'Loading...' : 'Get New User'}
      </button>
    </div>
  );
}

export default App;