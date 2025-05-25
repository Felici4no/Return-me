// src/pages/CreateQuiz.tsx

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Trash2, Save } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  description: string;
  image: string;
  traits: string[];
}

interface Option {
  id: string;
  text: string;
  traits: string[];
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

const quizTypes = [
  'filme',
  'série',
  'política',
  'história',
  'culinária',
  'programação',
  'artes'
];

const CreateQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [quiz, setQuiz] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
    type: '',
    slug: '',
    characters: [] as Character[],
    questions: [] as Question[]
  });

  // === 1) Computar lista única de traits vindas dos personagens ===
  //    Sempre que 'quiz.characters' mudar, re-calculamos a lista de traits.
  const availableTraits = useMemo(() => {
    const allTraits = quiz.characters.flatMap((c) => c.traits);
    return Array.from(new Set(allTraits));
  }, [quiz.characters]);

  // === 2) Adicionar um personagem vazio ===
  const handleAddCharacter = () => {
    const newCharacter: Character = {
      id: `char-${Date.now()}`,
      name: '',
      description: '',
      image: '',
      traits: []
    };
    setQuiz((prev) => ({
      ...prev,
      characters: [...prev.characters, newCharacter]
    }));
  };

  // === 3) Adicionar uma pergunta vazia com 4 opções vazias ===
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `q${quiz.questions.length + 1}`,
      text: '',
      options: Array(4)
        .fill(null)
        .map((_, i) => ({
          id: `q${quiz.questions.length + 1}-${String.fromCharCode(97 + i)}`,
          text: '',
          traits: []
        }))
    };
    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  // === 4) Atualizar campos do personagem (nome, descrição, imagem) ===
  const handleCharacterChange = (
    index: number,
    field: keyof Character,
    value: string
  ) => {
    setQuiz((prev) => {
      const updated = [...prev.characters];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, characters: updated };
    });
  };

  // === 5) Atualizar traits do personagem (split por vírgula) ===
  const handleCharacterTraits = (index: number, traits: string) => {
    setQuiz((prev) => {
      const updated = [...prev.characters];
      updated[index] = {
        ...updated[index],
        traits: traits
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
      };
      return { ...prev, characters: updated };
    });
  };

  // === 6) Atualizar texto da pergunta ===
  const handleQuestionChange = (
    questionIndex: number,
    value: string
  ) => {
    setQuiz((prev) => {
      const updated = [...prev.questions];
      updated[questionIndex] = { ...updated[questionIndex], text: value };
      return { ...prev, questions: updated };
    });
  };

  // === 7) Atualizar texto de uma opção ===
  const handleOptionTextChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options[optionIndex].text = value;
      return { ...prev, questions: updatedQuestions };
    });
  };

  // === 8) Atualizar traits de uma opção, mas somente entre `availableTraits` ===
  const handleOptionTraitsChange = (
    questionIndex: number,
    optionIndex: number,
    selected: string[]
  ) => {
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[questionIndex].options[optionIndex].traits = selected;
      return { ...prev, questions: updatedQuestions };
    });
  };

  // === 9) Remover personagem ===
  const handleRemoveCharacter = (index: number) => {
    setQuiz((prev) => {
      const updated = prev.characters.filter((_, i) => i !== index);
      return { ...prev, characters: updated };
    });
  };

  // === 10) Remover pergunta ===
  const handleRemoveQuestion = (index: number) => {
    setQuiz((prev) => {
      const updated = prev.questions.filter((_, i) => i !== index);
      return { ...prev, questions: updated };
    });
  };

  // === 11) Enviar ao backend ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Monta payload no formato que o seu backend espera
    const payload = {
      //id: quiz.id,
      slug: quiz.id,
      title: quiz.title,
      description: quiz.description,
      image_url: quiz.image,
      type: quiz.type,
      questions_count: quiz.questions.length,
      characters: quiz.characters.map((char) => ({
        name: char.name,
        description: char.description,
        image_url: char.image,
        traits: char.traits
      })),
      questions: quiz.questions.map((q) => ({
        text: q.text,
        options: q.options.map((opt) => ({
          text: opt.text,
          traits: opt.traits
        }))
      }))
    };

    try {
      await axios.post('http://localhost:3001/api/quizzes', payload);
      navigate('/admin');
    } catch (err: any) {
      console.error('Erro ao criar quiz:', err);
      alert('Erro ao criar quiz. ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-facebook-blue mb-6">
            Criar Novo Quiz
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ===== Dados Básicos ===== */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID do Quiz
                </label>
                <input
                  type="text"
                  value={quiz.id}
                  onChange={(e) =>
                    setQuiz((prev) => ({ ...prev, id: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="ex: qual-dev-brasileiro-voce-seria"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={quiz.title}
                  onChange={(e) =>
                    setQuiz((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Qual dev brasileiro você seria?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={quiz.description}
                  onChange={(e) =>
                    setQuiz((prev) => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagem do Quiz
                </label>
                <input
                  type="url"
                  value={quiz.image}
                  onChange={(e) =>
                    setQuiz((prev) => ({ ...prev, image: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="URL da imagem de capa"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  value={quiz.type}
                  onChange={(e) =>
                    setQuiz((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Selecione um tipo</option>
                  {quizTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ===== Personagens ===== */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-facebook-blue">
                  Personagens
                </h2>
                <button
                  type="button"
                  onClick={handleAddCharacter}
                  className="flex items-center text-sm text-facebook-blue hover:text-facebook-blue/80"
                >
                  <Plus size={16} className="mr-1" />
                  Adicionar Personagem
                </button>
              </div>

              <div className="space-y-6">
                {quiz.characters.map((character, index) => (
                  <div
                    key={character.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-medium text-gray-700">
                        Personagem {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleRemoveCharacter(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <input
                        type="text"
                        value={character.name}
                        onChange={(e) =>
                          handleCharacterChange(
                            index,
                            'name',
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Nome do personagem"
                        required
                      />

                      <textarea
                        value={character.description}
                        onChange={(e) =>
                          handleCharacterChange(
                            index,
                            'description',
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Descrição do personagem"
                        rows={2}
                        required
                      />

                      <input
                        type="url"
                        value={character.image}
                        onChange={(e) =>
                          handleCharacterChange(
                            index,
                            'image',
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="URL da imagem"
                        required
                      />

                      {/* ===== Traits do personagem (input livre) ===== */}
                      <div className="my-2">
                        <label className="block font-medium mb-1">Traits</label>
                        <div className="flex flex-wrap gap-2 border px-3 py-2 rounded">
                          {character.traits.map((trait, tIndex) => (
                            <span
                              key={tIndex}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center space-x-1"
                            >
                              <span>{trait}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setQuiz((prev) => {
                                    const updated = [...prev.characters];
                                    updated[index].traits.splice(tIndex, 1);
                                    return { ...prev, characters: updated };
                                  });
                                }}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}

                          <input
                            type="text"
                            placeholder="Digite e pressione Enter"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault();
                                const newTrait = e.currentTarget.value.trim();
                                if (
                                  newTrait &&
                                  !character.traits.includes(newTrait)
                                ) {
                                  handleCharacterTraits(
                                    index,
                                    character.traits.concat(newTrait).join(', ')
                                  );
                                }
                                e.currentTarget.value = '';
                              }
                            }}
                            className="flex-1 min-w-[120px] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== Perguntas ===== */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-facebook-blue">
                  Perguntas
                </h2>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="flex items-center text-sm text-facebook-blue hover:text-facebook-blue/80"
                >
                  <Plus size={16} className="mr-1" />
                  Adicionar Pergunta
                </button>
              </div>

              <div className="space-y-6">
                {quiz.questions.map((question, qIndex) => (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-medium text-gray-700">
                        Pergunta {qIndex + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(qIndex)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) =>
                          handleQuestionChange(qIndex, e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Pergunta"
                        required
                      />

                      <div className="space-y-3">
                        {question.options.map((option, oIndex) => (
                          <div
                            key={option.id}
                            className="grid grid-cols-2 gap-2"
                          >
                            {/* === 7.1 Texto da opção === */}
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) =>
                                handleOptionTextChange(
                                  qIndex,
                                  oIndex,
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md px-3 py-2"
                              placeholder={`Opção ${String.fromCharCode(
                                65 + oIndex
                              )}`}
                              required
                            />

                            {/* === 8.1 Traits da opção: <select multiple> com availableTraits === */}
                            <div className="flex flex-col">
                              <label className="text-sm font-medium text-gray-700 mb-1">
                                Traits (⇧/Ctrl para múltiplos)
                              </label>
                              <select
                                multiple
                                value={option.traits}
                                onChange={(e) => {
                                  // extrai valores selecionados
                                  const selected = Array.from(
                                    e.target.selectedOptions
                                  ).map((opt) => opt.value);
                                  handleOptionTraitsChange(
                                    qIndex,
                                    oIndex,
                                    selected
                                  );
                                }}
                                className="h-24 border border-gray-300 rounded-md px-3 py-2"
                              >
                                {availableTraits.map((trait) => (
                                  <option key={trait} value={trait}>
                                    {trait}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== Botão Salvar ===== */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center bg-facebook-blue text-white px-6 py-2 rounded-md hover:bg-facebook-blue/90 transition disabled:opacity-50"
              >
                <Save size={16} className="mr-2" />
                {loading ? 'Salvando...' : 'Salvar Quiz'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
