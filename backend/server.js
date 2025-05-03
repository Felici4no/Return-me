import express from 'express';
import cors from 'cors';
import { quizzes } from './data/quizzes.js';
import { harryPotterQuiz } from './data/harryPotterQuiz.js';
import { himymQuiz } from './data/himymQuiz.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/quizzes', (req, res) => {
  res.json(quizzes);
});

app.get('/api/quizzes/:id', (req, res) => {
  const { id } = req.params;
  
  if (id === 'harry-potter') {
    return res.json(harryPotterQuiz);
  } else if (id === 'himym') {
    return res.json(himymQuiz);
  } else {
    return res.status(404).json({ error: 'Quiz not found' });
  }
});

app.post('/api/quizzes/:id/results', (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;
  
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid answers format' });
  }
  
  let quiz;
  if (id === 'harry-potter') {
    quiz = harryPotterQuiz;
  } else if (id === 'himym') {
    quiz = himymQuiz;
  } else {
    return res.status(404).json({ error: 'Quiz not found' });
  }
  
  // Calculate result
  const characterScores = {};
  
  // Initialize scores for each character
  quiz.characters.forEach(character => {
    characterScores[character.id] = 0;
  });
  
  // Calculate scores based on answers
  answers.forEach((answer, index) => {
    const question = quiz.questions[index];
    if (!question) return;
    
    const selectedOption = question.options.find(option => option.id === answer);
    if (!selectedOption) return;
    
    // Add points to characters based on traits
    selectedOption.traits.forEach(trait => {
      quiz.characters.forEach(character => {
        if (character.traits.includes(trait)) {
          characterScores[character.id] += 1;
        }
      });
    });
  });
  
  // Find character with highest score
  let maxScore = 0;
  let resultCharacter = null;
  
  Object.entries(characterScores).forEach(([characterId, score]) => {
    if (score > maxScore) {
      maxScore = score;
      resultCharacter = quiz.characters.find(c => c.id === characterId);
    }
  });
  
  return res.json({ character: resultCharacter });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});