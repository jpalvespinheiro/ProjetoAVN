import express from 'express';
import {
    importClients,
    getClients,
    createClient,
    updateClient,
    deleteClient,
    redistributeClients,
    getRedistributedClients
} from '../controllers/clientControllers';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getClients);
router.post('/', createClient);
router.post('/import', upload.single('file'), importClients);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.post('/redistribute', redistributeClients);
router.get('/redistributed', getRedistributedClients);

export default router;
