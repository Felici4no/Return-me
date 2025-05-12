import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação de login com nome de usuário
    if (username === 'felipe' && password === '123456') {
      localStorage.setItem('token', 'simulado-token-usuario');
      navigate('/perfil'); // Redireciona para a página de perfil após o login
    } else {
      setError('Nome de usuário ou senha inválidos.');
    }
  };

  const handleGoogleLogin = () => {
    // Simulação de login Google
    localStorage.setItem('token', 'simulado-token-google');
    navigate('/perfil'); // Redireciona para a página de perfil após o login
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-facebook-blue mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-facebook-blue text-white py-2 px-4 rounded-md hover:bg-facebook-blue-dark transition"
          >
            Entrar
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">ou</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Entrar com Google
        </button>

        <p className="mt-4 text-sm text-center">
          Não tem uma conta? <a href="/register" className="text-facebook-blue hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
