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
  // image_url: string;  ← você pode até remover este campo da interface, já que não será usado aqui
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

  const apiUrl = `${import.meta.env.VITE_API_URL}/api/quizzes/${quizId}`;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get<QuizData>(apiUrl);
        setQuiz(response.data);
      } catch (err) {
        console.error('Erro ao carregar quiz:', err);
        setError('Falha ao carregar o quiz. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleSelectOption = (optionId: string) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = optionId;
    setSelectedAnswers(updated);
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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/quizzes/${quizId}/results`,
        { answers: selectedAnswers }
      );
      navigate(`/results/${quizId}`, { state: { answers: selectedAnswers } });
    } catch (err) {
      console.error('Erro ao enviar respostas:', err);
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
          <h1 className="text-xl font-bold text-facebook-blue mb-2">
            {quiz.title}
          </h1>
          <p className="text-sm mb-4">{quiz.description}</p>

          {/* Imagem removida aqui */}

          <div className="w-full bg-gray-200 h-2 rounded-sm mb-6">
            <div
              className="bg-facebook-blue h-2 rounded-sm transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
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
              {currentQuestion === quiz.questions.length - 1
                ? 'Finalizar'
                : 'Próxima'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
