import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean; // true - требует авторизации, false - требует отсутствия авторизации
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  // Пока проверяем аутентификацию, показываем загрузку
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  // Если маршрут требует авторизации, но пользователь не авторизован - на страницу входа
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Если маршрут требует отсутствия авторизации (как страницы входа/регистрации), 
  // но пользователь авторизован - на главную
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/main" replace />;
  }

  return <>{children}</>;
}