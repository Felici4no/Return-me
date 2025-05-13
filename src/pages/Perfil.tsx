import React from 'react';
import Emblema from "../components/Emblema"; // Ajuste o caminho conforme necessário

const Perfil: React.FC = () => {
  // Dados simulados
  const usuario = {
    nome: 'Lucas Feliciano',
    avatar: 'https://ui-avatars.com/api/?name=Felipe&background=3b5998&color=fff',
    atividades: [
      'Iniciou o quiz "Personagem de Filmes"',
      'Concluiu o quiz "História do Brasil"',
    ],
    resultados: [
      { titulo: 'Qual personagem de série é você?', resultado: 'Walter White', data: '10/05/2025' },
      { titulo: 'Que tipo de político você seria?', resultado: 'Diplomata', data: '09/05/2025' },
      { titulo: 'Qual personagem de Harry Potter você seria?', resultado: 'Harry Potter', data: '08/05/2025' },
      { titulo: 'Qual personagem de How I Met Your Mother é você?', resultado: 'How I Met Your Mother', data: '07/05/2025' },
      { titulo: 'Qual candidato à presidência 2022 você seria?', resultado: 'Candidato 2022', data: '06/05/2025' },
      { titulo: 'Qual imperador romano você seria?', resultado: 'Imperador Romano', data: '05/05/2025' },
      { titulo: 'Qual xícara de café você seria?', resultado: 'Xícara de Café', data: '04/05/2025' }
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
          <div className="mt-2 md:mt-0">
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
                className="group p-4 rounded-lg bg-white hover:bg-gray-50 transition-all 
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
        </section>
      </div>
    </div>
  );
  
};

export default Perfil;
