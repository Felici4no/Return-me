import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Quiz {
  id: string;
  title: string;
  type: string;
  questions: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/quizzes`);
        const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
        setQuizzes(quizRes.data);
        setUsers(userRes.data);
      } catch (err) {
        console.error(err);
        setMessage('Erro ao carregar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImport = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/import`);
      setMessage('Importação realizada com sucesso!');
    } catch (err) {
      setMessage('Erro ao importar dados.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-facebook-blue">Painel do Administrador</h1>

        {message && (
          <div className="bg-yellow-100 border border-yellow-300 p-2 text-sm rounded text-yellow-800">
            {message}
          </div>
        )}

        {loading ? (
          <p>Carregando informações...</p>
        ) : (
          <>
            {/* Resumo geral */}
            <div className="fb-card">
              <h2 className="text-lg font-bold mb-2 text-facebook-blue">Resumo</h2>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total de quizzes: <strong>{quizzes.length}</strong></span>
                <span>Total de usuários: <strong>{users.length}</strong></span>
              </div>
            </div>

            {/* Importação */}
            <div className="fb-card">
              <h2 className="text-lg font-bold mb-2 text-facebook-blue">Importar Quizzes</h2>
              <p className="text-sm mb-2 text-gray-600">Você pode importar quizzes de fontes externas ou planilhas.</p>
              <button
                onClick={handleImport}
                className="fb-button"
              >
                Importar Agora
              </button>
            </div>

            {/* Gerenciamento de usuários */}
            <div className="fb-card">
              <h2 className="text-lg font-bold mb-2 text-facebook-blue">Usuários Cadastrados</h2>
              <div className="overflow-auto max-h-64 border rounded">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600">
                      <th className="p-2">Nome</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Função</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-t">
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ação: criar quiz */}
            <div className="text-center">
              <button
                className="px-5 py-2 bg-facebook-blue text-white rounded-md hover:bg-facebook-blue-dark transition"
                onClick={() => navigate('/admin/criar-quiz')}
              >
                Criar Novo Quiz
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
