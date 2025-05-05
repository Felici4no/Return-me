import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

interface Character {
  id: string;
  name: string;
  description: string;
  image: string;
  traits: string[];
}

interface ResultState {
  answers: string[];
}

const Results: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const state = location.state as ResultState;
  
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!state?.answers) {
        setError('Nenhuma resposta encontrada. Por favor, faça o quiz primeiro.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/quizzes/${quizId}/results`, {
          answers: state.answers
        });
        
        setCharacter(response.data.character);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar resultados:', error);
        setError('Falha ao carregar seus resultados. Por favor, tente novamente.');
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId, state]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="fb-card text-center py-8">
          <p>Calculando seus resultados...</p>
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="fb-card text-center py-8">
          <p className="text-red-500">{error || 'Falha ao carregar resultados'}</p>
          <Link to="/" className="fb-button text-sm mt-4">
            Voltar para Início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="fb-card">
          <div className="bg-facebook-blue text-white p-4 -mt-4 -mx-4 mb-6">
            <h1 className="text-xl font-bold text-center">Seu Resultado</h1>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-facebook-blue mb-2">
              Você é {character.name}!
            </h2>
            <p className="text-sm text-gray-500">
              Com base em suas respostas, você se parece mais com este personagem
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3">
              <img 
                src={character.image} 
                alt={character.name} 
                className="w-full h-auto rounded-sm border border-facebook-border"
              />
            </div>
            
            <div className="w-full md:w-2/3">
              <p className="mb-4">{character.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {character.traits.map((trait, index) => (
                  <span 
                    key={index}
                    className="bg-facebook-highlight text-facebook-blue px-2 py-1 rounded-sm text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-facebook-border pt-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Link to="/" className="fb-button-secondary text-sm text-center">
                Voltar para Início
              </Link>
              <Link to={`/quiz/${quizId}`} className="fb-button text-sm text-center">
                Fazer Quiz Novamente
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;