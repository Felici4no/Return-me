import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // Simulação de registro
    localStorage.setItem('token', 'simulado-token-registro');
    navigate('/perfil'); // Redireciona para o perfil após o cadastro
  };

  const handleGoogleRegister = () => {
    // Simulação de cadastro com Google
    localStorage.setItem('token', 'simulado-token-google');
    navigate('/perfil');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-facebook-blue mb-4 text-center">Cadastro</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
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
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-facebook-blue text-white py-2 px-4 rounded-md hover:bg-facebook-blue-dark transition"
          >
            Cadastrar
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">ou</div>

        <button
          onClick={handleGoogleRegister}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Cadastrar com Google
        </button>

        <p className="mt-4 text-sm text-center">
          Já tem uma conta? <a href="/login" className="text-facebook-blue hover:underline">Entrar</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
