import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export interface User {
  id: number;
  username: string;
  phone: string;
}
export interface Project {
  id: number;
  photo: string;
  title: string;
  description: string;
  workType: string;
  client: string;
}

export interface Advantage {
  title: string;
  description: string;
}

// export interface Contact {
//   phones: string[];
//   address: string;
//   email: string;
//   title: string;
// }
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

const API_BASE_URL = "";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [advantages, setAdvantages] = useState<Advantage[]>([]);
  // const [contacts, setContacts] = useState<Contact | null>(null);

  const navigate = useNavigate();

  const usersFetchRef = useRef(false);
  const authCheckRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (authCheckRef.current) return;
    authCheckRef.current = true;

    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await authFetch("/api/projects");
      if (response?.ok) {
        const projectsData = await response.json();
        setProjects(projectsData);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  const addProject = async (projectData: Omit<Project, "id">) => {
    try {
      const response = await authFetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(projectData),
      });

      if (response?.ok) {
        await fetchProjects();
        return { success: true };
      } else {
        return { success: false, error: "Ошибка при добавлении проекта" };
      }
    } catch (error) {
      return { success: false, error: "Ошибка сети" };
    }
  };
  const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};
  const fetchAdvantages = async () => {
    try {
      const response = await authFetch("/api/advantages");
      if (response?.ok) {
        const advantagesData = await response.json();
        setAdvantages(advantagesData);
      }
    } catch (error) {
      console.error("Error fetching advantages:", error);
    }
  };
  const addAdvantage = async (advantageData: Advantage) => {
    try {
      const response = await authFetch("/api/advantages", {
        method: "POST",
        body: JSON.stringify(advantageData),
      });

      if (response?.ok) {
        await fetchAdvantages();
        return { success: true };
      } else {
        return { success: false, error: "Ошибка при добавлении преимущества" };
      }
    } catch (error) {
      return { success: false, error: "Ошибка сети" };
    }
  };
  const fetchAllUsers = async (force = false) => {
    if (usersFetchRef.current && !force) return;
    usersFetchRef.current = true;

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`);
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

  const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/protected`, {
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

  const hasValidToken = (): boolean => {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return !(payload.exp && payload.exp < currentTime);
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
      const response = await fetch(`${API_BASE_URL}/api/refresh`, {
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
      const response = await fetch(`${API_BASE_URL}/api/login`, {
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
    if (allUsers.length === 0) {
      await fetchAllUsers();
    }

    const userCheck = checkUserExists(userData.username, userData.phone);
    if (userCheck.exists) {
      return {
        success: false,
        error: userCheck.message,
        field: userCheck.field,
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
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
        await fetch(`${API_BASE_URL}/api/logout`, {
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
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        await refreshToken();
        const newToken = localStorage.getItem("accessToken");
        if (newToken) {
          const newHeaders = {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          };
          return fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers: newHeaders,
          });
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
    advantages,
    projects,
    login,
    register,
    logout,
    authFetch,
    fetchAllUsers,
    checkUserExists,
    getProjectById,
    fetchAdvantages,
    addAdvantage,
    fetchProjects,
    addProject,
    hasValidToken,
    isAuthenticated: !!user,
  };
};
