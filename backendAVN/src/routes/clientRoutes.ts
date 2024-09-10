// No seu arquivo clientRoutes.ts
import express from 'express';
import {
    importClients,
    getClients,
    createClient,
    updateClient,
    deleteClient,
    redistributeClients,
} from '../controllers/clientControllers';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configuração do multer

router.get('/', getClients);  // Rota para obter todos os clientes
router.post('/', createClient); // Criar cliente
router.post('/import', upload.single('file'), importClients); // Importar clientes com multer
router.put('/:id', updateClient); // Atualizar cliente
router.delete('/:id', deleteClient);
router.post('/redistribute', redistributeClients); // Redistribuir clientes

export default router;
