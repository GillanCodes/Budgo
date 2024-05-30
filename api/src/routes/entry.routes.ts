import { Router } from 'express';
import { deleteEntries, getEntries, getEntry, patchEntry, postEntry } from '../controllers/entry.controller';
let router:Router = Router();

router.get('/', getEntries);
router.get('/:id', getEntry);

router.post('/', postEntry);

router.patch('/:id', patchEntry);

router.delete('/', deleteEntries);

export default router;