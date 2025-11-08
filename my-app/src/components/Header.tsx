interface User {
  id: number;
  username: string;
  phone: string;
}
interface HeaderProps {
  user?: User | null;
  onLogout: () => void;
}
//{ user, onLogout }: HeaderProps
export function Header() {
  return (
    <header className="backdrop-blur-lg border-b border-white/20 bg-gradient-to-r
        from-[#00011A] to-[#0F0F0F]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* <div className="text-white text-2xl font-bold">MyStore</div> */}
        <img src="/logo.svg" />

        <div className="flex flex-row gap-14">
          <a href="#" className="text-white">О компании</a>
          <a href="#" className="text-white">Проекты</a>
          <a href="#" className="text-white">Каталог</a>
          <a href="#" className="text-white">Контакты</a>
        </div>
        {/* <div className="flex items-center gap-4">
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
        </div> */}
        <button className="rounded-sm bg-[#1078D7] text-white text-sm px-5 py-2 ">
          Получить КП
        </button>
      </div>
    </header>
  );
}
export default Header;
