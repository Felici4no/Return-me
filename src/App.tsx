import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Login from './pages/Login';
import Perfil from './pages/Perfil';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/results/:quizId" element={<Results />} />
            <Route path="/login" element={<Login />} /> {/* ← Adicione esta linha */}
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;