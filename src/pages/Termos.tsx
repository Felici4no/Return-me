import React from 'react';

const Termos: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-facebook-blue mb-4">Termos de Uso</h1>
      <p className="mb-4">
        Ao utilizar o FeliQuiz, você concorda com os seguintes termos:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Os quizzes são apenas para entretenimento e não possuem caráter científico ou definitivo.</li>
        <li>Não coletamos informações pessoais além do necessário para uso da plataforma.</li>
        <li>Todo conteúdo é protegido por direitos autorais e não deve ser reproduzido sem autorização.</li>
      </ul>
      <p className="text-sm text-gray-500">
        Em caso de dúvidas, entre em contato conosco.
      </p>
    </div>
  );
};

export default Termos;
