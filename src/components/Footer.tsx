import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-facebook-border py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Link to="/" className="text-facebook-blue font-bold">
              FeliQuiz
            </Link>
            <span className="text-gray-400 text-sm ml-2">
              © 2025 por <a href="https://www.linkedin.com/in/lucas-feliciano-software/" className="hover:underline" target="_blank" rel="noopener noreferrer">Lucas Feliciano</a>
            </span>
          </div>

          <div className="flex space-x-4 text-sm text-facebook-blue font-semibold">
            <Link to="/sobre" className="hover:underline">Sobre Nós</Link>
            <Link to="/termos" className="hover:underline">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;