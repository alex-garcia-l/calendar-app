import { types } from '../../types/types';

describe('Pruebas en el archivo types.jsx', () => {
  test('debe ser iguales', () => {
    expect(types).toEqual({
      uiOpenModal: '[ui] OpenModal',
      uiCloseModal: '[ui] CloseModal',

      calendarEventStartAddNew: '[calendar event] Start add new',
      calendarEventAddNew: '[calendar event] Add new',
      calendarEventUpdated: '[calendar event] Update',
      calendarEventDeleted: '[calendar event] Delete',
      calendarEventSetActive: '[calendar event] Set Active',
      calendarEventCleanActive: '[calendar event] Clean Active',
      calendarEventsLoaded: '[calendar event] Events loaded',
      calendarEventsReset: '[calendar event] Events reset',

      authCheckingFinish: '[auth] Finish checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout',
    });
  });
});
