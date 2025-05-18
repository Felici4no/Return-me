import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart3, Users, Brain, Trophy } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  type: string;
  questions: number;
  totalAttempts: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  quizzesTaken: number;
  joinDate: string;
}

interface Stats {
  totalUsers: number;
  totalQuizzes: number;
  totalAttempts: number;
  averageScore: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalQuizzes: 0,
    totalAttempts: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizRes, userRes, statsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/quizzes`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/users`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/stats`)
        ]);
        
        setQuizzes(quizRes.data);
        setUsers(userRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-facebook-blue mt-1">{value}</p>
        </div>
        <div className="text-facebook-blue opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-facebook-blue">Painel Administrativo</h1>
          <button
            onClick={() => navigate('/admin/novo-quiz')}
            className="bg-facebook-blue text-white px-4 py-2 rounded-md hover:bg-facebook-blue/90 transition"
          >
            Criar Novo Quiz
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-facebook-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando dados...</p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total de Usuários"
                value={stats.totalUsers}
                icon={<Users size={24} />}
              />
              <StatCard
                title="Total de Quizzes"
                value={stats.totalQuizzes}
                icon={<Brain size={24} />}
              />
              <StatCard
                title="Tentativas Totais"
                value={stats.totalAttempts}
                icon={<BarChart3 size={24} />}
              />
              <StatCard
                title="Média de Pontuação"
                value={stats.averageScore}
                icon={<Trophy size={24} />}
              />
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-facebook-blue">Usuários Recentes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quizzes</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.slice(0, 5).map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-facebook-blue/10 flex items-center justify-center text-facebook-blue">
                              {user.name[0].toUpperCase()}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.quizzesTaken}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Popular Quizzes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-facebook-blue">Quizzes Populares</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Questões</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tentativas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {quizzes.slice(0, 5).map((quiz) => (
                      <tr key={quiz.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">{quiz.title}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.questions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.totalAttempts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;