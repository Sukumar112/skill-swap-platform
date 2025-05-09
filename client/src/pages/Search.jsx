import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skills, setSkills] = useState([]);
  const token = localStorage.getItem('token');

  // Function to handle the search
  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/skills?search=${searchTerm}`, {
        headers: { 'x-auth-token': token },
      });
      setSkills(res.data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // Function to handle skill request
  const handleSkillRequest = async (userId, skillId) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/skills/request',  // Make sure this is correct
        { userId, skillId },  // Sending the correct userId (the user who owns the skill) and skillId
        {
          headers: { 'x-auth-token': localStorage.getItem('token') },  // Add the auth token in the headers
        }
      );
      console.log('Skill request sent:', res.data);
      alert('Skill request sent successfully!');
    } catch (err) {
      console.error('Error sending skill request:', err);
      alert('Failed to request skill');
    }
  };
  
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Search Skills</h2>

      {/* Search Input and Button */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 w-full rounded-l"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Displaying Search Results */}
      {skills.length > 0 ? (
        <ul className="space-y-2">
          {skills.map((skill) => (
            <li key={skill._id} className="border p-3 rounded">
              <p className="text-sm text-gray-500">
                <strong>Posted by: {skill.user?.name || 'Unknown'}</strong>
              </p>
              <p>{skill.skillName}</p>
              <p className="text-gray-600">{skill.description}</p>
              
              {/* Request Skill Button */}
              <button
                onClick={() => handleSkillRequest(skill.user._id, skill._id)}
                className="mt-2 bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                Request Skill
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No skills found.</p>
      )}
    </div>
  );
};

export default Search;
