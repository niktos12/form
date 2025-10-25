import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useAuth, type User } from "../hooks/useAuth";

function MainContent() {
  const { user, logout, authFetch } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  const data = [
    { id: 1, text: "Описание товара 1", title: "Product 1" },
    { id: 2, text: "Описание товара 2", title: "Product 2" },
    { id: 3, text: "Описание товара 3", title: "Product 3" },
    { id: 4, text: "Описание товара 4", title: "Product 4" },
    { id: 5, text: "Описание товара 5", title: "Product 5" },
    { id: 6, text: "Описание товара 6", title: "Product 6" },
    { id: 7, text: "Описание товара 7", title: "Product 7" },
    { id: 8, text: "Описание товара 8", title: "Product 8" },
    { id: 9, text: "Описание товара 9", title: "Product 9" },
  ];

  const fetchUsers = async () => {
    try {
      const response = await authFetch("/api/users");
      if (response?.ok) {
        const usersData = await response.json();
        setUsers(usersData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-800 min-h-screen">
      <Header onLogout={logout} user={user} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-6">
        {data.map((card) => (
          <div
            key={card.id}
            className="gap-3 flex flex-col border-white border bg-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-sm"
          >
            <div className="w-full h-48 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white">Изображение {card.id}</span>
            </div>
            <h1 className="text-center text-white text-2xl font-bold">
              {card.title}
            </h1>
            <p className="text-white/80 text-center">{card.text}</p>
            <button className="p-4 rounded-2xl cursor-pointer bg-amber-400 text-gray-900 font-semibold hover:bg-amber-300 transition-all duration-200 transform hover:scale-105">
              Купить
            </button>
          </div>
        ))}
      </div>

      <div className="p-8">
        <h2 className="text-white text-2xl font-bold mb-4">
          Зарегистрированные пользователи:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20"
            >
              <h3 className="text-white font-semibold">{user.username}</h3>
              <p className="text-white/70">{user.phone}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export function Main() {
  return (
    <ProtectedRoute requireAuth={true}>
      <MainContent />
    </ProtectedRoute>
  );
}
