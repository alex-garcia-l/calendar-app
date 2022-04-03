import { Request, Response } from 'express';

import { CalendarEvent } from '../models';
import { httpError } from '../middlewares/generals/handleResponse';

export const getItmes = async (req: Request, res: Response) => {
  const events = await CalendarEvent.find().populate('user', ['name']);

  res.json({
    events,
  });
};

export const createItem = async (req: Request, res: Response) => {
  try {
    req.body.user = req.userLogged.id;
    let event = new CalendarEvent(req.body);
    event = await event.save();

    res.status(201).json({
      msg: 'Event create successful!.',
      event,
    });
  } catch (error) {
    httpError(res, error);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let event = await CalendarEvent.findById(id);

    if (!event) {
      throw { status: 404, msgCustom: 'The event not exists.' };
    }

    if (event.user.toString() !== req.userLogged.id) {
      throw { status: 401, msgCustom: 'Not have permission.' };
    }

    event = await CalendarEvent.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
      msg: 'Event update successful!.',
      event,
    });
  } catch (error) {
    httpError(res, error);
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let event = await CalendarEvent.findById(id);

    if (!event) {
      throw { status: 404, msgCustom: 'The event not exists.' };
    }

    if (event.user.toString() !== req.userLogged.id) {
      throw { status: 401, msgCustom: 'Not have permission.' };
    }

    event = await CalendarEvent.findByIdAndDelete(id);

    res.json({
      msg: 'Event delete successful!.',
      event,
    });
  } catch (error) {
    httpError(res, error);
  }
};
