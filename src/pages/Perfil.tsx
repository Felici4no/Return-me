import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Emblema from "../components/Emblema";
import { Calendar, MapPin, Link as LinkIcon, Mail } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  email: string;
  joinDate: string;
  stats: {
    quizzesTaken: number;
    achievements: number;
    followers: number;
    following: number;
  };
  activities: {
    type: string;
    description: string;
    date: string;
  }[];
  results: {
    titulo: string;
    resultado: string;
    data: string;
  }[];
}

const Perfil: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'atividades' | 'resultados'>('atividades');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId || 'me'}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-facebook-blue"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Perfil não encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-facebook-blue to-facebook-lightblue rounded-t-lg"></div>

        {/* Profile Header */}
        <div className="bg-white shadow-sm rounded-b-lg">
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-600 mt-1">{profile.bio}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {profile.location && (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {profile.location}
                </div>
              )}
              {profile.website && (
                <div className="flex items-center">
                  <LinkIcon size={16} className="mr-1" />
                  <a href={profile.website} className="text-facebook-blue hover:underline" target="_blank" rel="noopener noreferrer">
                    {profile.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="flex items-center">
                <Mail size={16} className="mr-1" />
                {profile.email}
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                Membro desde {profile.joinDate}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 border-t border-gray-200">
            <div className="text-center py-3">
              <div className="text-xl font-bold text-facebook-blue">{profile.stats.quizzesTaken}</div>
              <div className="text-sm text-gray-600">Quizzes</div>
            </div>
            <div className="text-center py-3">
              <div className="text-xl font-bold text-facebook-blue">{profile.stats.achievements}</div>
              <div className="text-sm text-gray-600">Conquistas</div>
            </div>
            <div className="text-center py-3">
              <div className="text-xl font-bold text-facebook-blue">{profile.stats.followers}</div>
              <div className="text-sm text-gray-600">Seguidores</div>
            </div>
            <div className="text-center py-3">
              <div className="text-xl font-bold text-facebook-blue">{profile.stats.following}</div>
              <div className="text-sm text-gray-600">Seguindo</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-sm rounded-lg mt-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 text-sm font-medium ${
                activeTab === 'atividades'
                  ? 'text-facebook-blue border-b-2 border-facebook-blue'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('atividades')}
            >
              Atividades
            </button>
            <button
              className={`flex-1 py-4 text-sm font-medium ${
                activeTab === 'resultados'
                  ? 'text-facebook-blue border-b-2 border-facebook-blue'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('resultados')}
            >
              Resultados
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'atividades' ? (
              <div className="space-y-6">
                {profile.activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-facebook-blue/10 flex items-center justify-center">
                        <span className="text-facebook-blue">{activity.type[0].toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.description}</p>
                      <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {profile.results.map((quiz, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-white hover:bg-gray-50 transition-all 
                      shadow-sm hover:shadow-md border border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <Emblema resultado={quiz.resultado} className="flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800 mb-2">
                          {quiz.titulo}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-gray-600">Resultado:</span>
                          <span className="text-xs font-medium text-gray-800">
                            {quiz.resultado}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          <time dateTime={quiz.data}>{quiz.data}</time>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;