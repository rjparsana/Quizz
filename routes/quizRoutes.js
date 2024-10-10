const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz'); // Assuming you have defined your Quiz model
const Joi = require('joi');

// Create a validation schema for quizzes
const quizValidationSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    questions: Joi.array().items(
        Joi.object({
            questionText: Joi.string().min(5).required(),
            answerChoices: Joi.array().items(Joi.string()).min(2).required(),
            correctAnswer: Joi.string().required(),
        })
    ).min(1).required(),
});

// Inside the POST /quizzes route
router.post('/quizzes', async (req, res) => {
    // Validate quiz input
    const { error } = quizValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Proceed with saving the quiz if validation passes
    const quiz = new Quiz({
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions,
    });

    try {
        const newQuiz = await quiz.save();
        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Create a validation schema for quiz submissions
const submissionValidationSchema = Joi.object({
    answers: Joi.array().items(Joi.string().required()).min(1).required(),
});

// Inside the POST /quizzes/:id/submit route
router.post('/quizzes/:id/submit', async (req, res) => {
    // Validate submission input
    const { error } = submissionValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const userAnswers = req.body.answers;
        let score = 0;

        if (userAnswers.length !== quiz.questions.length) {
            return res.status(400).json({ message: 'Number of answers does not match the number of questions' });
        }

        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                score += 1;
            }
        });

        res.json({ score: score, totalQuestions: quiz.questions.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// 1. Add a new quiz
router.post('/quizzes', async (req, res) => {
    const quiz = new Quiz({
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions,
    });

    try {
        const newQuiz = await quiz.save();
        res.status(201).json(newQuiz); // 201 means "Created"
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// 2. Fetch all quizzes
router.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Fetch quiz by ID
router.get('/quizzes/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Submit quiz answers and calculate score
router.post('/quizzes/:id/submit', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const userAnswers = req.body.answers; // Expecting an array of answers from the client
        let score = 0;

        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                score += 1; // Increment score if answer is correct
            }
        });

        // Respond with the user's score and total number of questions
        res.json({ score: score, totalQuestions: quiz.questions.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
