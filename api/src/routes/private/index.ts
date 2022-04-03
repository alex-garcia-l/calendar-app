import { Router } from 'express';

import calendarRouters from './calendarEventRouter';

const router = Router();

// Calendar Routes
router.use('/calendar-events', calendarRouters);

export default router;
