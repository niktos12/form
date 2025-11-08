import { useAuth } from "../hooks/useAuth";

export function NavHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="Logo" className="h-8" />
          <nav className="hidden md:flex space-x-4">
            <a href="/main" className="hover:text-amber-300 transition-colors">
              Главная
            </a>
            <a
              href="/projects"
              className="hover:text-amber-300 transition-colors"
            >
              Проекты
            </a>
            <a
              href="/advantages"
              className="hover:text-amber-300 transition-colors"
            >
              Преимущества
            </a>
            <a
              href="/contacts"
              className="hover:text-amber-300 transition-colors"
            >
              Контакты
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-amber-300">Привет, {user.username}!</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
              >
                Выйти
              </button>
            </div>
          ) : (
            <a
              href="/auth"
              className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded transition-colors"
            >
              Войти
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
