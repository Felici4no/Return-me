import React from 'react';

const Sobre: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-facebook-blue mb-4">Sobre Nós</h1>
      <p className="mb-4">
        O <strong>FeliQuiz</strong> foi criado com o objetivo de oferecer quizzes divertidos e interativos para você descobrir mais sobre si mesmo e seus personagens favoritos.
      </p>
      <p className="mb-4">
        Acreditamos que aprender e se entreter pode ser leve, personalizado e inteligente. Cada quiz é feito com carinho e criatividade!
      </p>
      <p className="text-sm text-gray-500">Desenvolvido por Lucas Feliciano — 2025.</p>
    </div>
  );
};

export default Sobre;
