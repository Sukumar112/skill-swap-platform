import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [skillName, setSkillName] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchSkills = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/skills', {
        headers: { 'x-auth-token': token },
      });
      setSkills(res.data);
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/skills/${editId}`,
          { skillName, description },
          { headers: { 'x-auth-token': token } }
        );
        setEditId(null);
      } else {
        await axios.post(
          'http://localhost:5000/api/skills',
          { skillName, description },
          { headers: { 'x-auth-token': token } }
        );
      }

      setSkillName('');
      setDescription('');
      fetchSkills();
    } catch (err) {
      console.error('Error saving skill:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/skills/${id}`, {
        headers: { 'x-auth-token': token },
      });
      fetchSkills();
    } catch (err) {
      console.error('Error deleting skill:', err);
    }
  };

  const handleEdit = (skill) => {
    setEditId(skill._id);
    setSkillName(skill.skillName);
    setDescription(skill.description);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* 🔗 Link to Search Page */}
      <div className="mb-4">
        <Link to="/search" className="text-blue-600 hover:underline">
          Go to Search Page
        </Link>
      </div>

      {/* ➕ Add/Edit Skill Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block font-medium">Skill Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>

      {/* 📋 Skills List */}
      <h3 className="text-xl font-semibold mb-2">Your Skills</h3>
      <ul className="space-y-2">
        {skills.length === 0 && <p className="text-gray-500">No skills found.</p>}
        {skills.map((skill) => (
          <li key={skill._id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <strong>{skill.skillName}</strong>
              <p className="text-gray-600">{skill.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(skill)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(skill._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
