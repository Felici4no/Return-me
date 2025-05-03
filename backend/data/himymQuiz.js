export const himymQuiz = {
  id: 'himym',
  title: 'Qual personagem de How I Met Your Mother é você?',
  description: 'Faça este quiz para descobrir com qual personagem do MacLaren\'s Pub você mais se parece!',
  characters: [
    {
      id: 'ted',
      name: 'Ted Mosby',
      description: 'Você é um romântico incurável que acredita fortemente no destino e em almas gêmeas. Pode ser um pouco pretensioso às vezes, mas seu coração está sempre no lugar certo. Você tem padrões elevados e não se contenta com menos do que acredita merecer.',
      image: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Ted_Mosby.jpg',
      traits: ['romântico', 'idealista', 'intelectual', 'leal', 'teimoso']
    },
    {
      id: 'barney',
      name: 'Barney Stinson',
      description: 'Você é carismático, confiante e sempre o centro das atenções. Por trás da sua personalidade extravagante, há alguém que valoriza profundamente a amizade e está disposto a ir longe pelas pessoas que ama. Também é extremamente comprometido com sua carreira.',
      image: 'https://preview.redd.it/who-has-slept-with-more-girls-barney-stinson-or-charlie-v0-pd5j4f85cc8d1.jpg?width=630&format=pjpg&auto=webp&s=4902339c70c49621a8c7e24224b1e21c6616d33c',
      traits: ['confiante', 'carismático', 'ambicioso', 'leal', 'aventureiro']
    },
    {
      id: 'marshall',
      name: 'Marshall Eriksen',
      description: 'Você é bondoso, otimista e extremamente leal. Seu senso moral é forte, e você sempre tenta fazer o que é certo. Os valores familiares são importantes para você, e todos os seus amigos sabem que podem contar com seu apoio e conselhos sensatos.',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Marshall_Eriksen.jpg',
      traits: ['bondoso', 'otimista', 'leal', 'moral', 'prestativo']
    },
    {
      id: 'lily',
      name: 'Lily Aldrin',
      description: 'Você é apaixonado, criativo e extremamente protetor com seus amigos. Adora reunir as pessoas e não tem medo de manipular situações para alcançar o que acredita ser o melhor para todos. Valoriza a estabilidade, mas também tem um lado selvagem.',
      image: 'https://upload.wikimedia.org/wikipedia/en/f/fe/Lily_aldrin.jpg',
      traits: ['apaixonado', 'criativo', 'protetor', 'manipulador', 'leal']
    },
    {
      id: 'robin',
      name: 'Robin Scherbatsky',
      description: 'Você é independente, focado na carreira e, às vezes, emocionalmente reservado. Valoriza sua liberdade e pode ter medo de compromissos, mas também é extremamente leal ao seu círculo íntimo. Tem um lado competitivo e não gosta de demonstrar vulnerabilidade.',
      image: 'https://upload.wikimedia.org/wikipedia/en/c/c9/Robin_Scherbatsky.png',
      traits: ['independente', 'ambicioso', 'competitivo', 'reservado', 'leal']
    }
  ],
  questions: [
    {
      id: 'himym-q1',
      text: 'Qual é a sua abordagem para relacionamentos?',
      options: [
        {
          id: 'himym-q1-a',
          text: 'Procurando "a pessoa certa" e acreditando no destino',
          traits: ['romântico', 'idealista']
        },
        {
          id: 'himym-q1-b',
          text: 'Evitando compromisso e mantendo as coisas casuais',
          traits: ['independente', 'aventureiro']
        },
        {
          id: 'himym-q1-c',
          text: 'Valorizando estabilidade e compromisso a longo prazo',
          traits: ['leal', 'prestativo']
        },
        {
          id: 'himym-q1-d',
          text: 'Equilibrando metas de carreira com necessidades do relacionamento',
          traits: ['ambicioso', 'independente']
        }
      ]
    },
    {
      id: 'himym-q2',
      text: 'Seus amigos estão discutindo. Qual é o seu papel?',
      options: [
        {
          id: 'himym-q2-a',
          text: 'Mediador - você tenta entender os dois lados e encontrar um meio-termo',
          traits: ['prestativo', 'moral']
        },
        {
          id: 'himym-q2-b',
          text: 'O solucionador - você trabalha nos bastidores para resolver a situação',
          traits: ['manipulador', 'protetor']
        },
        {
          id: 'himym-q2-c',
          text: 'Alívio cômico - você alivia o clima com humor',
          traits: ['carismático', 'confiante']
        },
        {
          id: 'himym-q2-d',
          text: 'Advogado do diabo - ajuda ambos a ver novas perspectivas',
          traits: ['intelectual', 'independente']
        }
      ]
    },
    {
      id: 'himym-q3',
      text: 'O que é mais importante para você na carreira?',
      options: [
        {
          id: 'himym-q3-a',
          text: 'Causar um impacto positivo na vida das pessoas',
          traits: ['moral', 'bondoso']
        },
        {
          id: 'himym-q3-b',
          text: 'Alcançar reconhecimento e sucesso',
          traits: ['ambicioso', 'competitivo']
        },
        {
          id: 'himym-q3-c',
          text: 'Seguir sua paixão, mesmo que seja fora do comum',
          traits: ['criativo', 'apaixonado']
        },
        {
          id: 'himym-q3-d',
          text: 'Estabilidade e equilíbrio entre vida pessoal e profissional',
          traits: ['leal', 'prestativo']
        }
      ]
    },
    {
      id: 'himym-q4',
      text: 'Como você lida com desafios?',
      options: [
        {
          id: 'himym-q4-a',
          text: 'Enfrento de frente com confiança',
          traits: ['confiante', 'competitivo']
        },
        {
          id: 'himym-q4-b',
          text: 'Analiso todas as possibilidades antes de decidir',
          traits: ['intelectual', 'reservado']
        },
        {
          id: 'himym-q4-c',
          text: 'Mantenho o otimismo e acredito que tudo vai se resolver',
          traits: ['otimista', 'idealista']
        },
        {
          id: 'himym-q4-d',
          text: 'Confio nos amigos e entes queridos para me apoiar',
          traits: ['leal', 'prestativo']
        }
      ]
    },
    {
      id: 'himym-q5',
      text: 'Qual é o seu maior ponto fraco?',
      options: [
        {
          id: 'himym-q5-a',
          text: 'Ser idealista ou perfeccionista demais',
          traits: ['idealista', 'romântico']
        },
        {
          id: 'himym-q5-b',
          text: 'Evitar vulnerabilidade emocional',
          traits: ['reservado', 'independente']
        },
        {
          id: 'himym-q5-c',
          text: 'Controlar demais as situações',
          traits: ['manipulador', 'protetor']
        },
        {
          id: 'himym-q5-d',
          text: 'Confiar demais nas pessoas ou ser ingênuo',
          traits: ['otimista', 'bondoso']
        }
      ]
    },
    {
      id: 'himym-q6',
      text: 'Seu fim de semana ideal inclui:',
      options: [
        {
          id: 'himym-q6-a',
          text: 'Um evento cultural seguido de conversas profundas',
          traits: ['intelectual', 'criativo']
        },
        {
          id: 'himym-q6-b',
          text: 'Uma noite épica com os amigos',
          traits: ['carismático', 'aventureiro']
        },
        {
          id: 'himym-q6-c',
          text: 'Tempo de qualidade em casa com quem você ama',
          traits: ['prestativo', 'leal']
        },
        {
          id: 'himym-q6-d',
          text: 'Buscar uma meta pessoal ou desafio',
          traits: ['ambicioso', 'independente']
        }
      ]
    },
    {
      id: 'himym-q7',
      text: 'Como você encara as regras?',
      options: [
        {
          id: 'himym-q7-a',
          text: 'As regras fornecem estrutura necessária e devem ser seguidas',
          traits: ['moral', 'leal']
        },
        {
          id: 'himym-q7-b',
          text: 'Regras são mais como diretrizes – flexibilidade é importante',
          traits: ['idealista', 'criativo']
        },
        {
          id: 'himym-q7-c',
          text: 'Regras devem ser quebradas quando necessário',
          traits: ['confiante', 'aventureiro']
        },
        {
          id: 'himym-q7-d',
          text: 'Regras devem ser questionadas e melhoradas',
          traits: ['intelectual', 'independente']
        }
      ]
    },
    {
      id: 'himym-q8',
      text: 'O que você mais valoriza em uma amizade?',
      options: [
        {
          id: 'himym-q8-a',
          text: 'Lealdade inabalável e apoio',
          traits: ['leal', 'protetor']
        },
        {
          id: 'himym-q8-b',
          text: 'Diversão e experiências compartilhadas',
          traits: ['carismático', 'aventureiro']
        },
        {
          id: 'himym-q8-c',
          text: 'Honestidade e conexões autênticas',
          traits: ['moral', 'prestativo']
        },
        {
          id: 'himym-q8-d',
          text: 'Crescimento e melhoria mútua',
          traits: ['ambicioso', 'intelectual']
        }
      ]
    }
  ]
};
