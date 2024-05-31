import { Router } from 'express';
import { deleteEntry, getEntries, getEntry, patchEntry, postEntry } from '../controllers/entry.controller';
let router:Router = Router();

router.get('/', getEntries);
router.get('/:id', getEntry);

router.post('/', postEntry);

router.patch('/:id', patchEntry);

router.delete('/:id', deleteEntry);

export default router;