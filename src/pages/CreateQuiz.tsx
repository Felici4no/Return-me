import React, { useState } from 'react';
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

  const handleAddCharacter = () => {
    const newCharacter: Character = {
      id: `char-${Date.now()}`,
      name: '',
      description: '',
      image: '',
      traits: []
    };
    setQuiz({ ...quiz, characters: [...quiz.characters, newCharacter] });
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `q${quiz.questions.length + 1}`,
      text: '',
      options: Array(4).fill(null).map((_, i) => ({
        id: `q${quiz.questions.length + 1}-${String.fromCharCode(97 + i)}`,
        text: '',
        traits: []
      }))
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const handleCharacterChange = (index: number, field: keyof Character, value: string) => {
    const updatedCharacters = [...quiz.characters];
    updatedCharacters[index] = { ...updatedCharacters[index], [field]: value };
    setQuiz({ ...quiz, characters: updatedCharacters });
  };

  const handleCharacterTraits = (index: number, traits: string) => {
    const updatedCharacters = [...quiz.characters];
    updatedCharacters[index] = {
      ...updatedCharacters[index],
      traits: traits.split(',').map(trait => trait.trim())
    };
    setQuiz({ ...quiz, characters: updatedCharacters });
  };

  const handleQuestionChange = (questionIndex: number, field: string, value: string) => {
    const updatedQuestions = [...quiz.questions];
    if (field === 'text') {
      updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], text: value };
    }
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, field: string, value: string) => {
    const updatedQuestions = [...quiz.questions];
    const option = updatedQuestions[questionIndex].options[optionIndex];
    
    if (field === 'text') {
      option.text = value;
    } else if (field === 'traits') {
      option.traits = value.split(',').map(trait => trait.trim());
    }
    
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleRemoveCharacter = (index: number) => {
    const updatedCharacters = quiz.characters.filter((_, i) => i !== index);
    setQuiz({ ...quiz, characters: updatedCharacters });
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalQuiz = {
      ...quiz,
      questions: quiz.questions.length,
      slug: quiz.id
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/quizzes`, finalQuiz);
      navigate('/admin');
    } catch (error) {
      console.error('Erro ao criar quiz:', error);
      alert('Erro ao criar quiz. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-facebook-blue mb-6">Criar Novo Quiz</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID do Quiz</label>
                <input
                  type="text"
                  value={quiz.id}
                  onChange={(e) => setQuiz({ ...quiz, id: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="ex: qual-dev-brasileiro-voce-seria"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={quiz.title}
                  onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Qual dev brasileiro você seria?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={quiz.description}
                  onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem do Quiz</label>
                <input
                  type="url"
                  value={quiz.image}
                  onChange={(e) => setQuiz({ ...quiz, image: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="URL da imagem de capa"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={quiz.type}
                  onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Selecione um tipo</option>
                  {quizTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Characters */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-facebook-blue">Personagens</h2>
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
                  <div key={character.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-medium text-gray-700">Personagem {index + 1}</h3>
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
                        onChange={(e) => handleCharacterChange(index, 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Nome do personagem"
                        required
                      />

                      <textarea
                        value={character.description}
                        onChange={(e) => handleCharacterChange(index, 'description', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Descrição do personagem"
                        rows={2}
                        required
                      />

                      <input
                        type="url"
                        value={character.image}
                        onChange={(e) => handleCharacterChange(index, 'image', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="URL da imagem"
                        required
                      />

                      <input
                        type="text"
                        value={character.traits.join(', ')}
                        onChange={(e) => handleCharacterTraits(index, e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Características (separadas por vírgula)"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-facebook-blue">Perguntas</h2>
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
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-medium text-gray-700">Pergunta {qIndex + 1}</h3>
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
                        onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Pergunta"
                        required
                      />

                      <div className="space-y-3">
                        {question.options.map((option, oIndex) => (
                          <div key={option.id} className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, 'text', e.target.value)}
                              className="border border-gray-300 rounded-md px-3 py-2"
                              placeholder={`Opção ${String.fromCharCode(65 + oIndex)}`}
                              required
                            />
                            <input
                              type="text"
                              value={option.traits.join(', ')}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, 'traits', e.target.value)}
                              className="border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Características (separadas por vírgula)"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
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