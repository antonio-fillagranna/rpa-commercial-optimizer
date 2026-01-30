import { Router } from 'express';
import { createLead } from '../controllers/LeadController.js';

const router = Router();

router.post('/leads', createLead);

export default router;