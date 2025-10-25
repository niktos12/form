import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export interface User {
  id: number;
  username: string;
  phone: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  // Добавляем рефы для отслеживания состояния запросов
  const usersFetchRef = useRef(false);
  const authCheckRef = useRef(false);

  // Проверяем наличие токенов при инициализации - ТОЛЬКО ОДИН РАЗ
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // Защита от повторных вызовов
    if (authCheckRef.current) return;
    authCheckRef.current = true;

    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }

    // Загружаем пользователей только если нужно (для регистрации)
    // Убираем автоматическую загрузку пользователей
  }, []);

  // Функция для получения всех пользователей - ТОЛЬКО ПО ТРЕБОВАНИЮ
  const fetchAllUsers = async (force = false) => {
    // Защита от повторных одновременных запросов
    if (usersFetchRef.current && !force) return;
    usersFetchRef.current = true;

    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const usersData = await response.json();
        setAllUsers(usersData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      usersFetchRef.current = false;
    }
  };

  // Проверяем валидность токена
  const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return false;
    }

    try {
      const response = await fetch("/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setLoading(false);
        return true;
      } else {
        // Если токен невалиден, пробуем обновить
        const refreshed = await refreshToken();
        setLoading(false);
        return refreshed;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setLoading(false);
      return false;
    }
  };

  // Проверяем наличие валидного токена (быстрая проверка без запроса к серверу)
  const hasValidToken = (): boolean => {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;

    // Базовая проверка формата JWT токена
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      // Проверяем expiration time
      if (payload.exp && payload.exp < currentTime) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logout();
      return false;
    }

    try {
      const response = await fetch("/api/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        await checkAuth();
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return false;
    }
  };

  // Функция проверки существования пользователя
  const checkUserExists = (
    username: string,
    phone: string
  ): { exists: boolean; field: string; message: string } => {
    const existingUser = allUsers.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() ||
        user.phone === phone
    );

    if (existingUser) {
      if (existingUser.username.toLowerCase() === username.toLowerCase()) {
        return {
          exists: true,
          field: "username",
          message: "Пользователь с таким именем уже существует",
        };
      }
      if (existingUser.phone === phone) {
        return {
          exists: true,
          field: "phone",
          message: "Пользователь с таким номером телефона уже существует",
        };
      }
    }

    return { exists: false, field: "", message: "" };
  };

  const login = async (credentials: {
    username: string;
    password: string;
    phone: string;
  }) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setUser(data.user);

        navigate("/main");
        return { success: true };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || "Ошибка входа",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Ошибка сети",
      };
    }
  };

  const register = async (userData: {
    username: string;
    password: string;
    phone: string;
  }) => {
    // Сначала загружаем пользователей, если еще не загружены
    if (allUsers.length === 0) {
      await fetchAllUsers();
    }

    // Проверяем существование пользователя перед регистрацией
    const userCheck = checkUserExists(userData.username, userData.phone);
    if (userCheck.exists) {
      return {
        success: false,
        error: userCheck.message,
        field: userCheck.field,
      };
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setUser(data.user);

        // Обновляем список пользователей после успешной регистрации
        await fetchAllUsers(true);

        navigate("/main");
        return { success: true };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || "Ошибка регистрации",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Ошибка сети",
      };
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: refreshToken }),
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    // Сбрасываем флаги при выходе
    authCheckRef.current = false;
    usersFetchRef.current = false;
    navigate("/auth");
  };

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        await refreshToken();
        const newToken = localStorage.getItem("accessToken");
        if (newToken) {
          const newHeaders = {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          };
          return fetch(url, { ...options, headers: newHeaders });
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    allUsers,
    login,
    register,
    logout,
    authFetch,
    fetchAllUsers, // Экспортируем для явного вызова
    checkUserExists,
    hasValidToken,
    isAuthenticated: !!user,
  };
};
