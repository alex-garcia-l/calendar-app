import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouters = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/" element={<CalendarScreen />} />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
