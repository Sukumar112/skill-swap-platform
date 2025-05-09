import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      alert('Login successful');
      navigate('/dashboard');
      localStorage.setItem('token', res.token);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleLogin}>
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Login
      </button>
      <p className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/register')}>
          Register
        </span>
      </p>
    </form>
  );
}

export default Login;
