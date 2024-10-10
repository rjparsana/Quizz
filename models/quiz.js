const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    questions: [
        {
            questionText: { type: String, required: true },
            answerChoices: [String],
            correctAnswer: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('Quiz', quizSchema);
