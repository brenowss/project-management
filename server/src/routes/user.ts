import { Router } from 'express';
import { createUser, getUserByCogId, getUsers } from '../controllers/user';

const router = Router();

router.get('/', getUsers);

router.get('/:cognitoId', getUserByCogId);

router.post('/create', createUser);

export default router;
