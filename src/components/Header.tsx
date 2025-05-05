import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fb-header">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold mr-2">FeliQuiz</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
