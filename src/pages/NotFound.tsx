import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-facebook-blue mb-4">404</h1>
        <p className="text-xl font-semibold text-facebook-blue mb-2">Oops! Resposta incorreta! ❌</p>
        <p className="text-md text-gray-600 mb-6">
          Parece que essa página não está no nosso quiz. Que tal tentar outra pergunta ou voltar ao início?
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-facebook-blue rounded-md hover:bg-facebook-blue/90 transition"
        >
          Voltar para o Início do Quiz
        </Link>
      </div>
    </div>
  );
};

export default NotFound;