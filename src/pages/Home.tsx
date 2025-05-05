import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Quiz {
  id: string;
  title: string;
  description: string;
  image: string;
  questions: number;
  slug: string;
  type: string;
}

const Home: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>('todos');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/quizzes`);
        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar quizzes:', error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = selectedType === 'todos'
    ? quizzes
    : quizzes.filter(quiz => quiz.type === selectedType);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="fb-card mb-6">
          <h1 className="text-xl font-bold text-facebook-blue mb-4">Descubra Seu Personagem</h1>
          <p className="mb-4">Faça nossos quizzes divertidos para descobrir quais personagens combinam com sua personalidade!</p>

          <div className="flex gap-2 mt-4">
            <button
              className={`px-4 py-2 rounded-sm text-sm font-bold ${
                selectedType === 'todos'
                  ? 'bg-facebook-blue text-white'
                  : 'bg-gray-100 text-facebook-blue hover:bg-gray-200'
              }`}
              onClick={() => setSelectedType('todos')}
            >
              Todos
            </button>
            <button
              className={`px-4 py-2 rounded-sm text-sm font-bold ${
                selectedType === 'filme'
                  ? 'bg-facebook-blue text-white'
                  : 'bg-gray-100 text-facebook-blue hover:bg-gray-200'
              }`}
              onClick={() => setSelectedType('filme')}
            >
              Filmes
            </button>
            <button
              className={`px-4 py-2 rounded-sm text-sm font-bold ${
                selectedType === 'série'
                  ? 'bg-facebook-blue text-white'
                  : 'bg-gray-100 text-facebook-blue hover:bg-gray-200'
              }`}
              onClick={() => setSelectedType('série')}
            >
              Séries
            </button>
          </div>
        </div>

        <div className="fb-card">
          <h2 className="text-lg font-bold text-facebook-blue mb-4">
            {selectedType === 'todos'
              ? 'Quizzes Disponíveis'
              : selectedType === 'filme'
                ? 'Quizzes de Filmes'
                : 'Quizzes de Séries'}
          </h2>

          {loading ? (
            <p>Carregando quizzes...</p>
          ) : filteredQuizzes.length === 0 ? (
            <p className="text-center py-4 text-gray-500">
              Nenhum quiz encontrado para esta categoria.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredQuizzes.map((quiz) => (
                <div key={quiz.id} className="border-b border-facebook-border pb-4 last:border-b-0 last:pb-0">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      src={quiz.image}
                      alt={quiz.title}
                      className="w-full md:w-32 h-32 object-cover rounded-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-facebook-blue font-bold text-lg">{quiz.title}</h3>
                        <span className="text-xs bg-facebook-highlight text-facebook-blue px-2 py-1 rounded-sm">
                          {quiz.type}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{quiz.description}</p>
                      <p className="text-xs text-gray-500 mb-3">{quiz.questions} perguntas</p>
                      <Link to={`/quiz/${quiz.slug}`} className="fb-button text-sm">
                        Fazer Quiz
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
