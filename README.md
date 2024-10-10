# Quiz Application Backend

## Description

This project is a backend API for managing quizzes and storing user responses, built using Node.js, Express, and MongoDB. It allows users to:

Fetch a list of all quizzes.
Fetch a specific quiz by its ID.
Submit a quiz and calculate the score.
Input validation for quizzes and submissions has been implemented for error handling.

## Technologies Used

Node.js (v12 or above)
Express.js (Web framework for Node.js)
MongoDB (NoSQL Database)
Mongoose (ODM for MongoDB)
Joi (For input validation)

## Server starts command:

node server.js

## Environment Variables
To run the project, you will need to create a .env file in the root directory with the following environment variables:

MONGO_URI= mongodb+srv://rjparsana8:G1WVk2Di8npna3wA@cluster0.lrmlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3000

## API Endpoints
Here are the available API endpoints:

### 1. Fetch all quizzes
Endpoint: GET /api/quizzes
Description: Fetches a list of all available quizzes.

### 2. Fetch a quiz by ID
Endpoint: GET /api/quizzes/:id
Description: Fetches a specific quiz by its ID, including the questions.
Parameters:
id: The ID of the quiz.

### 3. Submit answers for a quiz
Endpoint: POST /api/quizzes/:id/submit
Description: Submits answers for a quiz and calculates the score.
Parameters:
id: The ID of the quiz.

## Error Handling and Validation

### 1. Quiz Creation Validation
The POST /api/quizzes endpoint includes input validation to ensure:
Each quiz has a title, description, and valid questions.
Each question has text, answer choices, and a correct answer.

### 2. Quiz Submission Validation
The POST /api/quizzes/:id/submit endpoint includes validation to ensure:
The number of submitted answers matches the number of questions in the quiz.
The answers are submitted in the correct format.
