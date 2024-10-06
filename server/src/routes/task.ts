import { Router } from 'express';
import {
  createTask,
  getTasks,
  getUserTasks,
  updateTask,
  updateTaskStatus,
} from '../controllers/task';

const router = Router();

router.get('/', getTasks);
router.get('/user/:userId', getUserTasks);
router.post('/', createTask);
router.patch('/:taskId', updateTask);
router.patch('/:taskId/status', updateTaskStatus);

export default router;
