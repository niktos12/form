import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function Adventages() {
  const { advantages, fetchAdvantages, addAdvantage, user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdvantage, setNewAdvantage] = useState({
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAdvantages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await addAdvantage(newAdvantage);
    if (result.success) {
      setNewAdvantage({
        title: "",
        description: "",
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
    setNewAdvantage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#00011A] to-[#0F0F0F]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Наши преимущества
            </h2>
            <p className="text-gray-300 text-lg">
              Почему клиенты выбирают именно нас
            </p>
          </div>

          {user && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {showAddForm ? "Отмена" : "Добавить преимущество"}
            </button>
          )}
        </div>

        {/* Форма добавления преимущества */}
        {showAddForm && user && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              Добавить новое преимущество
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Заголовок</label>
                <input
                  type="text"
                  name="title"
                  value={newAdvantage.title}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Например: Опыт работы"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Описание</label>
                <textarea
                  name="description"
                  value={newAdvantage.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Подробное описание преимущества"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-800 text-white px-8 py-3 rounded-lg transition-colors"
              >
                {isSubmitting ? "Добавление..." : "Добавить преимущество"}
              </button>
            </form>
          </div>
        )}

        {/* Сетка преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-amber-400/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {advantage.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {advantages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Преимущества пока не добавлены
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
