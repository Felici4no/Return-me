import React from 'react';

const Perfil: React.FC = () => {
  // Dados simulados
  const usuario = {
    nome: 'felipe',
    avatar: 'https://ui-avatars.com/api/?name=Felipe&background=3b5998&color=fff',
    atividades: [
      'Iniciou o quiz "Personagem de Filmes"',
      'Concluiu o quiz "História do Brasil"',
    ],
    resultados: [
      { titulo: 'Qual personagem de série é você?', resultado: 'Walter White', data: '10/05/2025' },
      { titulo: 'Que tipo de político você seria?', resultado: 'Diplomata', data: '09/05/2025' },
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <img
            src={usuario.avatar}
            alt={usuario.nome}
            className="w-20 h-20 rounded-full border-4 border-facebook-border shadow-md"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-facebook-dark-blue">
              {usuario.nome}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Usuário desde jan/2025
            </p>
          </div>
        </div>

        {/* Atividades */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-facebook-dark-blue mb-4 border-b-2 border-facebook-blue pb-2">
            Atividades Recentes
          </h3>
          <ul className="list-none space-y-3">
            {usuario.atividades.map((atividade, index) => (
              <li key={index} className="flex items-start">
                <span className="text-facebook-blue mr-2">•</span>
                <span className="flex-1 text-gray-700">{atividade}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Resultados */}
        <section>
          <h3 className="text-xl font-bold text-facebook-dark-blue mb-4 border-b-2 border-facebook-blue pb-2">
            Últimos Resultados
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {usuario.resultados.map((quiz, index) => (
              <div 
                key={index}
                className="border-l-4 border-facebook-blue p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
              >
                <p className="text-sm font-semibold text-gray-800">
                  {quiz.titulo}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Resultado: <span className="font-medium">{quiz.resultado}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <time dateTime="2025-05-10">{quiz.data}</time>
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

};

export default Perfil;
