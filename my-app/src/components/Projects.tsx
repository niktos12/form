import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
export function Projects() {
  const { projects, fetchProjects, addProject, user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState({
    photo: "",
    title: "",
    description: "",
    workType: "",
    client: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await addProject(newProject);
    if (result.success) {
      setNewProject({
        photo: "",
        title: "",
        description: "",
        workType: "",
        client: "",
      });
      setShowAddForm(false);
    } else {
      alert(result.error);
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#0F0F0F] to-[#00011A]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Наши проекты</h2>
            <p className="text-gray-300 text-lg">
              Реализованные решения для наших клиентов
            </p>
          </div>

          {user && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {showAddForm ? "Отмена" : "Добавить проект"}
            </button>
          )}
        </div>

        {/* Форма добавления проекта */}
        {showAddForm && user && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              Добавить новый проект
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block text-white mb-2">Ссылка на фото</label>
                <input
                  type="text"
                  name="photo"
                  value={newProject.photo}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  // placeholder="https://example.com/photo.jpg"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Название</label>
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Название проекта"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white mb-2">Описание</label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Подробное описание проекта"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Тип работы</label>
                <input
                  type="text"
                  name="workType"
                  value={newProject.workType}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Веб-разработка, дизайн и т.д."
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Заказчик</label>
                <input
                  type="text"
                  name="client"
                  value={newProject.client}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Компания или имя заказчика"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-800 text-white px-8 py-3 rounded-lg transition-colors"
                >
                  {isSubmitting ? "Добавление..." : "Добавить проект"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:transform hover:scale-[1.02] group cursor-pointer"
              onClick={() => navigate(`/project/${index}`)}
            >
              <div className="h-48 bg-gray-700 overflow-hidden">
                <img
                  src={project.photo }
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  // onError={(e) => {
                  //   (e.target as HTMLImageElement).src =
                  //     // "/placeholder-project.jpg";
                  // }}
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs font-medium mb-3">
                  {project.workType}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{project.workType}</span>
                  <span>{project.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Проекты пока не добавлены</p>
          </div>
        )}
      </div>
    </section>
  );
}
