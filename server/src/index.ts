import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

// ROUTE IMPORTS
import projectRoutes from './routes/project';
import taskRoutes from './routes/task';
import searchRoutes from './routes/search';
import userRoutes from './routes/user';
import teamRoutes from './routes/team';

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/// ROUTES

app.use('/projects', projectRoutes);

app.use('/tasks', taskRoutes);

app.use('/search', searchRoutes);

app.use('/users', userRoutes);

app.use('/teams', teamRoutes);

// SERVER

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`🔥 Server started on port ${port}`));
