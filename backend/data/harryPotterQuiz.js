export const harryPotterQuiz = {
  id: 'harry-potter',
  title: 'Qual personagem de Harry Potter é você?',
  description: 'Responda a estas perguntas para descobrir com qual personagem do mundo mágico de Harry Potter você mais se parece!',
  characters: [
    {
      id: 'harry',
      name: 'Harry Potter',
      description: 'Você é corajoso e leal, frequentemente colocando os outros antes de si mesmo. Tem um forte senso de justiça e não tem medo de quebrar regras pelo que acredita ser certo.',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Harry_Potter_character_poster.jpg/250px-Harry_Potter_character_poster.jpg',
      traits: ['corajoso', 'leal', 'impulsivo', 'rebelde', 'determinado']
    },
    {
      id: 'hermione',
      name: 'Hermione Granger',
      description: 'Você é incrivelmente inteligente e esforçado. Valoriza o conhecimento e as regras, mas as quebra quando necessário para o bem maior. Seus amigos confiam em sua lógica e preparação.',
      image: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Hermione_Granger_poster.jpg',
      traits: ['inteligente', 'lógico', 'organizado', 'determinado', 'competitivo']
    },
    {
      id: 'ron',
      name: 'Ron Weasley',
      description: 'Você é leal e engraçado, muitas vezes trazendo alívio cômico em situações tensas. Apesar das inseguranças, é corajoso quando importa e profundamente leal a quem você ama.',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg',
      traits: ['leal', 'engraçado', 'ciumento', 'emocional', 'protetor']
    },
    {
      id: 'dumbledore',
      name: 'Alvo Dumbledore',
      description: 'Você é sábio e poderoso, enxergando o panorama geral que outros não veem. Orienta os outros com compaixão e entende que o amor é a magia mais forte de todas.',
      image: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Dumbledore_-_Prisoner_of_Azkaban.jpg',
      traits: ['sábio', 'estratégico', 'misterioso', 'compassivo', 'poderoso']
    },
    {
      id: 'luna',
      name: 'Luna Lovegood',
      description: 'Você é único e vê o mundo de forma diferente. É honesto, às vezes até demais, e não se importa com o que os outros pensam de você. Sua perspectiva traz clareza em situações confusas.',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/LunaLovegood.jpeg/250px-LunaLovegood.jpeg',
      traits: ['criativo', 'honesto', 'excêntrico', 'intuitivo', 'tolerante']
    }
  ],
  questions: [
    {
      id: 'hp-q1',
      text: 'Seus amigos estão discutindo e pedem que você escolha um lado. O que você faz?',
      options: [
        {
          id: 'hp-q1-a',
          text: 'Ouve os dois lados e faz um julgamento justo',
          traits: ['sábio', 'lógico', 'justo']
        },
        {
          id: 'hp-q1-b',
          text: 'Fica do lado do seu melhor amigo, custe o que custar',
          traits: ['leal', 'protetor']
        },
        {
          id: 'hp-q1-c',
          text: 'Tenta fazer as pazes com uma piada ou distração',
          traits: ['engraçado', 'emocional']
        },
        {
          id: 'hp-q1-d',
          text: 'Aponta o que ambos estão deixando passar',
          traits: ['intuitivo', 'honesto', 'excêntrico']
        }
      ]
    },
    {
      id: 'hp-q2',
      text: 'Você descobre um objeto misterioso que pode ser perigoso. Qual é sua primeira reação?',
      options: [
        {
          id: 'hp-q2-a',
          text: 'Pesquisaria tudo sobre ele antes de fazer qualquer coisa',
          traits: ['inteligente', 'lógico', 'organizado']
        },
        {
          id: 'hp-q2-b',
          text: 'Esconderia de todos por segurança',
          traits: ['protetor', 'misterioso']
        },
        {
          id: 'hp-q2-c',
          text: 'Contaria imediatamente a uma autoridade',
          traits: ['seguidor de regras', 'sábio']
        },
        {
          id: 'hp-q2-d',
          text: 'Tocaria nele para ver o que acontece',
          traits: ['corajoso', 'impulsivo', 'curioso']
        }
      ]
    },
    {
      id: 'hp-q3',
      text: 'O que seus amigos diriam que é sua melhor qualidade?',
      options: [
        {
          id: 'hp-q3-a',
          text: 'Você sempre sabe a resposta certa',
          traits: ['inteligente', 'lógico']
        },
        {
          id: 'hp-q3-b',
          text: 'Você é leal acima de tudo',
          traits: ['leal', 'protetor']
        },
        {
          id: 'hp-q3-c',
          text: 'Você os faz rir nos momentos difíceis',
          traits: ['engraçado', 'emocional']
        },
        {
          id: 'hp-q3-d',
          text: 'Você é corajoso diante do perigo',
          traits: ['corajoso', 'determinado']
        }
      ]
    },
    {
      id: 'hp-q4',
      text: 'Você vê alguém colando em uma prova importante. O que você faz?',
      options: [
        {
          id: 'hp-q4-a',
          text: 'Denuncia imediatamente — regras são regras',
          traits: ['organizado', 'seguidor de regras']
        },
        {
          id: 'hp-q4-b',
          text: 'Nada — não é da sua conta',
          traits: ['tolerante', 'misterioso']
        },
        {
          id: 'hp-q4-c',
          text: 'Conversa com a pessoa depois para entender o motivo',
          traits: ['compassivo', 'sábio']
        },
        {
          id: 'hp-q4-d',
          text: 'Fica irritado porque ela pode tirar nota melhor que você injustamente',
          traits: ['competitivo', 'ciumento']
        }
      ]
    },
    {
      id: 'hp-q5',
      text: 'Pelo que você mais gostaria de ser lembrado?',
      options: [
        {
          id: 'hp-q5-a',
          text: 'Por ser a pessoa mais inteligente da sala',
          traits: ['inteligente', 'competitivo']
        },
        {
          id: 'hp-q5-b',
          text: 'Por defender o que é certo, mesmo quando é difícil',
          traits: ['corajoso', 'determinado']
        },
        {
          id: 'hp-q5-c',
          text: 'Por ser alguém em quem todos podiam confiar',
          traits: ['leal', 'protetor']
        },
        {
          id: 'hp-q5-d',
          text: 'Por ver o mundo de forma única',
          traits: ['excêntrico', 'criativo']
        }
      ]
    },
    {
      id: 'hp-q6',
      text: 'Seu maior medo é:',
      options: [
        {
          id: 'hp-q6-a',
          text: 'Fracasso ou vergonha',
          traits: ['competitivo', 'emocional']
        },
        {
          id: 'hp-q6-b',
          text: 'Perder as pessoas que ama',
          traits: ['leal', 'protetor']
        },
        {
          id: 'hp-q6-c',
          text: 'Não ser levado a sério',
          traits: ['excêntrico', 'honesto']
        },
        {
          id: 'hp-q6-d',
          text: 'Tomar a decisão errada no momento crucial',
          traits: ['sábio', 'lógico']
        }
      ]
    },
    {
      id: 'hp-q7',
      text: 'Você encontra uma carteira com muito dinheiro. O que faz?',
      options: [
        {
          id: 'hp-q7-a',
          text: 'Entrega imediatamente às autoridades',
          traits: ['seguidor de regras', 'justo']
        },
        {
          id: 'hp-q7-b',
          text: 'Procura por um documento de identidade e tenta devolver você mesmo',
          traits: ['determinado', 'corajoso']
        },
        {
          id: 'hp-q7-c',
          text: 'Pensa em pegar um pouco — ninguém saberia',
          traits: ['impulsivo', 'rebelde']
        },
        {
          id: 'hp-q7-d',
          text: 'Pergunta aos seus amigos o que deve fazer',
          traits: ['emocional', 'tolerante']
        }
      ]
    },
    {
      id: 'hp-q8',
      text: 'Qual é a sua atividade ideal de final de semana?',
      options: [
        {
          id: 'hp-q8-a',
          text: 'Ler ou aprender algo novo',
          traits: ['inteligente', 'organizado']
        },
        {
          id: 'hp-q8-b',
          text: 'Aventura e emoção com os amigos',
          traits: ['corajoso', 'impulsivo']
        },
        {
          id: 'hp-q8-c',
          text: 'Relaxar com as pessoas mais próximas',
          traits: ['leal', 'engraçado']
        },
        {
          id: 'hp-q8-d',
          text: 'Criar arte ou explorar a natureza',
          traits: ['criativo', 'excêntrico']
        }
      ]
    }
  ]
};
