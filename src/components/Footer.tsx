import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-facebook-border py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-facebook-blue font-bold">
              FeliQuiz
            </Link>
            <span className="text-gray-400 text-sm ml-2">© 2025 Por <a href="https://www.linkedin.com/in/lucas-feliciano-software/">Lucas Feliciano</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;