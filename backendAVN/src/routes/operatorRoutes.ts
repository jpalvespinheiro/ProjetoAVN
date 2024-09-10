import express from 'express';
import { createOperator, getOperators, updateOperator, deleteOperator} from '../controllers/operatorControllers';

const router = express.Router();

router.post('/', createOperator);
router.get('/', getOperators);
router.put('/:id', updateOperator);
router.delete('/:id', deleteOperator);

export default router;
