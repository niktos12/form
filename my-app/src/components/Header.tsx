interface User {
  id: number;
  username: string;
  phone: string;
}
interface HeaderProps {
  user?: User | null;
  onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MyStore</div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-white">Привет, {user.username}!</span>
              <button
                onClick={onLogout}
                className="bg-amber-400 text-gray-900 px-4 py-2 rounded-xl font-semibold hover:bg-amber-300 transition-colors"
              >
                Выйти
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
