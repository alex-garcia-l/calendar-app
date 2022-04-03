import { Router } from 'express';

import { getItmes, createItem, updateItem, deleteItem } from '../../controllers/CalendarEventController';
import { validateCreate, validateDelete, validateUpdate } from '../../middlewares/validators/calendarEventValidator';

const router = Router();

// GET api/v1/auth/calendar-events
router.get('/', getItmes);

// POST api/v1/auth/calendar-events
router.post('/', validateCreate, createItem);

// PUT api/v1/auth/calendar-events/:id
router.put('/:id', validateUpdate, updateItem);

// DELETE api/v1/auth/calendar-events/:id
router.delete('/:id', validateDelete, deleteItem);

export default router;
