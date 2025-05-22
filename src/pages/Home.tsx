import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Quiz {
  id: string;
  title: string;
  description: string;
  image: string;
  questions: number;
  slug: string;
  type: string;
  subtype?: string;
  timesAnswered?: number; // <-- novo campo
}


const subfilters: Record<string, string[]> = {
  filme: ['Ação', 'Comédia', 'Terror'],
  série: ['Drama', 'Sitcom', 'Documentário'],
  política: ['Brasil', 'Mundo'],
  história: ['Antiga', 'Moderna'],
  culinária: ['Doce', 'Salgado'],
  programação: ['Frontend', 'Backend', 'Fullstack'],
  artes: ['Pintura', 'Escultura', 'Música'],
  casal: ['Romântico', 'Amizade','Par Ideal'],
};

const Home: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [selectedSubfilter, setSelectedSubfilter] = useState<string>('todos');
  const [showSubfilters, setShowSubfilters] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSurpriseMe = () => {
    if (quizzes.length > 0) {
      const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
      navigate(`/quiz/${randomQuiz.slug}`);
    }
  };
    const EM_MANUTENCAO = import.meta.env.VITE_EM_MANUTENCAO === 'true';

    if (EM_MANUTENCAO) {
      return (
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">🚧 Sistema em manutenção</h1>
          <p className="text-gray-600">Estamos atualizando o sistema. Tente novamente mais tarde.</p>
        </div>
      );
    }

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

  useEffect(() => {
    setShowSubfilters(selectedType !== 'todos' && subfilters[selectedType] !== undefined);
    setSelectedSubfilter('todos');
  }, [selectedType]);

  const filteredQuizzes = quizzes.filter(
    quiz =>
      (selectedType === 'todos' || quiz.type === selectedType) &&
      (selectedSubfilter === 'todos' || quiz.subtype?.toLowerCase() === selectedSubfilter.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="fb-card mb-6">
          <h1 className="text-xl font-bold text-facebook-blue mb-4">Descubra Seu Personagem</h1>
          
          <p className="mb-4">Faça nossos quizzes divertidos para descobrir quais personagens combinam com sua personalidade!</p>
          
          {/* Filtros principais */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
            {[
              { label: 'Todos', value: 'todos' },
              { label: 'Filmes', value: 'filme' },
              { label: 'Séries', value: 'série' },
              { label: 'Política', value: 'política' },
              { label: 'História', value: 'história' },
              { label: 'Culinária', value: 'culinária' },
              { label: 'Programação', value: 'programação' },
              { label: 'Artes', value: 'artes' },
              { label: 'Casal', value: 'casal' },
             
            ].map(({ label, value }) => (
              <button
                key={value}
                className={`px-4 py-2 rounded-sm text-sm font-bold transition ${
                  selectedType === value
                    ? 'bg-facebook-blue text-white'
                    : 'bg-gray-100 text-facebook-blue hover:bg-gray-200'
                }`}
                onClick={() => setSelectedType(value)}
              >
                {label}
              </button>
            ))}          
          </div>

          {/* Subfiltros com animação */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              showSubfilters ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                className={`px-3 py-1 rounded text-sm font-medium ${
                  selectedSubfilter === 'todos' ? 'bg-facebook-blue text-white' : 'bg-gray-200'
                }`}
                onClick={() => setSelectedSubfilter('todos')}
              >
                Todos
              </button>
              {selectedType !== 'todos' &&
                subfilters[selectedType]?.map((sub) => (
                  <button
                    key={sub}
                    className={`px-3 py-1 rounded text-sm font-medium transition ${
                      selectedSubfilter === sub
                        ? 'bg-facebook-blue text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedSubfilter(sub)}
                  >
                    {sub}
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="fb-card">
          <h2 className="text-lg font-bold text-facebook-blue mb-4">
            {selectedType === 'todos'
              ? 'Quizzes Disponíveis'
              : `Quizzes de ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`}
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
                      className="w-full md:w-32 h-32 object-cover object-top rounded-sm border border-facebook-border mb-4 md:mb-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-facebook-blue font-bold text-lg">{quiz.title}</h3>
                        <span className="text-xs bg-facebook-highlight text-facebook-blue px-2 py-1 rounded-sm">
                          {quiz.type}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{quiz.description}</p>
                      
                      <p className="text-xs text-gray-500 mb-1">
                        {quiz.timesAnswered ?? 0} resposta{(quiz.timesAnswered ?? 0) === 1 ? '' : 's'}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">{quiz.questions} perguntas</p>

                      <Link to={`/quiz/${quiz.slug}`} className="fb-button text-sm">
                        Fazer Quiz
                      </Link>


                    </div>
                  </div>
                </div>
              ))}
              <div className="mb-4 text-center">
            <button
              onClick={handleSurpriseMe}
              className="px-4 py-2 bg-facebook-blue text-white rounded-md hover:bg-facebook-blue-dark transition"
            >
              Me Surpreenda
            </button>
          </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
