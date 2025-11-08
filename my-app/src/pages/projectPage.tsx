import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { NavHeader } from "../components/NavHeader";
import { Footer } from "../components/Footer";
import { ProtectedRoute } from "../components/ProtectedRoute";

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, fetchProjects } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);

  useEffect(() => {
    const loadProject = async () => {
      await fetchProjects();
      setLoading(false);
    };

    loadProject();
  }, []);

  useEffect(() => {
    if (projects.length > 0 && id) {
      const projectId = parseInt(id);
      const foundProject = projects[projectId];

      if (foundProject) {
        setProject(foundProject);

        // Находим связанные проекты
        const related = projects
          .filter((p, index) => {
            return p.workType === foundProject.workType && index !== projectId;
          })
          .slice(0, 3);
        setRelatedProjects(related);
      }
    }
  }, [projects, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#00011A] to-[#0F0F0F]">
        <NavHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-white text-xl">Загрузка проекта...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#00011A] to-[#0F0F0F]">
        <NavHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Проект не найден
          </h1>
          <p className="text-gray-400 mb-8">
            Извините, запрашиваемый проект не существует.
          </p>
          <Link
            to="/main"
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-r from-[#00011A] to-[#0F0F0F]">
        <NavHeader />

        {/* Хлебные крошки */}
        <nav className="bg-gray-900 border-b border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link
                to="/main"
                className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
              >
                Главная
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-white font-medium">Проект #{id}</span>
            </div>
          </div>
        </nav>

        {/* Основная информация о проекте */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Изображение проекта */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={project.photo}
                    alt={project.title}
                    className="w-full h-96 object-cover"
                    // onError={(e) => {
                    //   (e.target as HTMLImageElement).src =
                    //     "/placeholder-project.jpg";
                    // }}
                  />
                </div>
              </div>

              {/* Информация о проекте */}
              <div className="space-y-6">
                <div>
                  <span className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {project.workType}
                  </span>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    {project.title}
                  </h1>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-t border-b border-white/10">
                  <div>
                    <h3 className="text-gray-400 text-sm font-medium mb-2">
                      Клиент
                    </h3>
                    <p className="text-white font-semibold">{project.client}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm font-medium mb-2">
                      Категория
                    </h3>
                    <p className="text-white font-semibold">
                      {project.workType}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm font-medium mb-2">
                      ID проекта
                    </h3>
                    <p className="text-white font-semibold">
                      #{parseInt(id!) + 1}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm font-medium mb-2">
                      Статус
                    </h3>
                    <p className="text-green-400 font-semibold">Завершен</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg transition-colors font-semibold">
                    Обсудить проект
                  </button>
                  <button className="border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white px-8 py-3 rounded-lg transition-colors font-semibold">
                    Поделиться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Детальное описание */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">О проекте</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Подробности реализации
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {project.description} Этот проект был реализован с
                    использованием современных технологий и лучших практик в
                    области {project.workType.toLowerCase()}. Мы уделили особое
                    внимание качеству исполнения и удовлетворенности клиента.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Каждый этап проекта тщательно планировался и контролировался
                    для обеспечения максимального соответствия требованиям
                    заказчика и установленным срокам.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Технологии
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-300">
                      <span>Frontend</span>
                      <span className="text-amber-400">React, TypeScript</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Backend</span>
                      <span className="text-amber-400">Node.js, Express</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>База данных</span>
                      <span className="text-amber-400">MongoDB</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Характеристики
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-300">
                      <span>Срок реализации</span>
                      <span className="text-amber-400">3 месяца</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Бюджет</span>
                      <span className="text-amber-400">По запросу</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Команда</span>
                      <span className="text-amber-400">5 специалистов</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Связанные проекты */}
        {relatedProjects.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-8">
                Похожие проекты
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject, index) => {
                  const relatedId = projects.findIndex(
                    (p) => p === relatedProject
                  );
                  return (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:transform hover:scale-[1.02] group cursor-pointer"
                      onClick={() => navigate(`/project/${relatedId}`)}
                    >
                      <div className="h-48 bg-gray-700 overflow-hidden">
                        <img
                          src={
                            relatedProject.photo
                          }
                          alt={relatedProject.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          // onError={(e) => {
                          //   (e.target as HTMLImageElement).src =
                          //     "/placeholder-project.jpg";
                          // }}
                        />
                      </div>
                      <div className="p-6">
                        <span className="inline-block bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs font-medium mb-3">
                          {relatedProject.workType}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-gray-300 line-clamp-2">
                          {relatedProject.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </ProtectedRoute>
  );
}

export default ProjectPage;
