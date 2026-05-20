# TaskFlow

TaskFlow is a full-stack task management system developed for the System Analysis and Design course.

## Features

- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Search tasks
- Responsive dark UI
- Swagger API documentation

## Technologies Used

### Backend
- Node.js
- Express.js
- SQLite

### Frontend
- HTML
- CSS
- Vanilla JavaScript

## Project Structure

backend/
│
├── controllers/
├── models/
├── routes/
├── services/
├── swagger/
├── frontend/
├── tests/
├── app.js
├── server.js

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get task by ID |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

## Swagger Documentation

Open:

http://localhost:3000/api-docs

## Installation

```bash
npm install