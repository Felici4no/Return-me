import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Option {
  id: string;
  text: string;
  traits: string[];
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

const Quiz: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/quizzes/${quizId}`);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar quiz:', error);
        setError('Falha ao carregar o quiz. Por favor, tente novamente.');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleSelectOption = (optionId: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = optionId;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAnswers();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitAnswers = async () => {
    try {
      await axios.post(`http://localhost:3001/api/quizzes/${quizId}/results`, {
        answers: selectedAnswers
      });
      navigate(`/results/${quizId}`, { state: { answers: selectedAnswers } });
    } catch (error) {
      console.error('Erro ao enviar respostas:', error);
      setError('Falha ao enviar respostas. Por favor, tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="fb-card text-center py-8">
          <p>Carregando quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="fb-card text-center py-8">
          <p className="text-red-500">{error || 'Quiz não encontrado'}</p>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="fb-card mb-4">
          <h1 className="text-xl font-bold text-facebook-blue mb-2">{quiz.title}</h1>
          <p className="text-sm mb-4">{quiz.description}</p>
          
          <div className="w-full bg-gray-200 h-2 rounded-sm mb-6">
            <div 
              className="bg-facebook-blue h-2 rounded-sm" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-gray-500 mb-4">
            Pergunta {currentQuestion + 1} de {quiz.questions.length}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">{question.text}</h2>
            
            <div className="space-y-3">
              {question.options.map((option) => (
                <div 
                  key={option.id}
                  className={`border border-facebook-border rounded-sm p-3 cursor-pointer transition-colors duration-200 ${
                    selectedAnswers[currentQuestion] === option.id
                      ? 'bg-facebook-highlight border-facebook-blue'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectOption(option.id)}
                >
                  {option.text}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              className="fb-button-secondary text-sm"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Anterior
            </button>
            
            <button 
              className="fb-button text-sm"
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion]}
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Finalizar' : 'Próxima'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;