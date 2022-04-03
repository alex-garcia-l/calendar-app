import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import { PublicRoute } from './PublicRoute';
import { startChecking } from '../actions/auth';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouters = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Cargando</h5>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute isAuthenticate={!!uid}>
                <LoginScreen />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticate={!!uid}>
                <CalendarScreen />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
