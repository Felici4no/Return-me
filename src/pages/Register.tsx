import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    // Enviar para servidor: método, email/phone, etc.
    // Simulação de registro
    localStorage.setItem('token', 'simulado-token-registro');
    navigate('/perfil');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4 relative">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-3xl font-bold text-facebook-blue mb-6 text-center">Cadastro</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Método de contato */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Como prefere receber seu código?</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="method"
                  value="email"
                  checked={method === 'email'}
                  onChange={() => setMethod('email')}
                />
                <span className="text-sm">E-mail</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="method"
                  value="phone"
                  checked={method === 'phone'}
                  onChange={() => setMethod('phone')}
                />
                <span className="text-sm">Celular</span>
              </label>
            </div>
          </div>

          {/* Campo condicional */}
          {method === 'email' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@exemplo.com"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número de Celular{' '}
                {/*
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-xs text-facebook-blue underline ml-1"
                >
                  Por quê?
                </button>
                */}
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="(11) 91234-5678"
              />
            </div>
          )}

          {/* Demais campos */}
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

        <p className="mt-4 text-sm text-center text-gray-500">Já tem conta? <a href="/login" className="text-facebook-blue hover:underline">Entrar</a></p>
      </div>

      {/* Modal explicativo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Por que pedimos seu número?</h3>
            <p className="text-sm text-gray-700 mb-3">
              O número de celular permite enviar o código de verificação de forma rápida e segura, garantindo que apenas você tenha acesso à conta. Também facilita a recuperação de acesso sem burocracia.
            </p>
            <p className="text-xs text-gray-500 mb-4 italic">
              Prometemos usar seu contato apenas para segurança e avisos relevantes. Nada de spam.
            </p>
            <div className="text-right">
              <button
                onClick={() => setShowModal(false)}
                className="text-facebook-blue font-medium hover:underline"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
