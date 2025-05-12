import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LogIn } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fb-header border-b border-facebook-border py-3 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <Home size={20} className="mr-2" />
            <span className="text-xl font-bold">FeliQuiz</span>
          </Link>
        </div>

        <div>
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <LogIn size={16} />
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
