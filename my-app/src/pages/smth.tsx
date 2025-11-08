import { Footer } from "../components/Footer";
import Header from "../components/Header";
import { NavHeader } from "../components/NavHeader";

export default function CleaningSystemPage() {
  return (
    <div
      className="bg-gradient-to-r
        from-[#00011A] to-[#0F0F0F] min-h-screen"
    >
      {/* Header */}
      <NavHeader />
      <Header />

      <div className="flex flex-row gap-10">
        <div className="flex flex-col px-10 py-8 gap-5">
          <h1 className="text-white font-bold text-4xl">
            АО «Васильевский рудник»
          </h1>
          <p className="text-[#FFFFFFCC] text-lg">
            Автономная система канализации эффективно и главное незаметно для
            проживающих и окружающих, выполняет свой прямой функционал и
            обеспечивает высокое качество очистки стоков.
          </p>
          <p className="text-[#FFFFFFCC] text-lg">
            <span className="font-bold text-white">Устаревшие варианты </span>
            септиков из колец, выгребные ямы и заглубленных в грунт
            перфорированные емкости — все эти версии канализации в частном доме
            достаточно серьезно вредят окружающей среде и загрязняют опасными
            биологическими включениями подземные воды.
          </p>
          <p className="text-[#FFFFFFCC] text-lg">
            <span className="font-bold text-white">
              Автономная канализация{" "}
            </span>
            дома полностью нивелирует вышеперечисленные риски навредить
            окружающей среде. Проходящие многоступенчатую систему очистки стоки
            на выходе из установки полностью {" "}
            <span className="font-bold text-white">
              соответствуют нормативам
            </span>
              для сброса в грунт или фильтрующие колодцы.
          </p>
          <h1 className="uppercase text-[#FFFFFFCC] text-xl font-semibold">
            Почему клиенты выбирают ЛОС:
          </h1>
          <p className="text-[#FFFFFFCC] text-lg">
            Срок службы
            <span className="text-white font-bold"> 50 лет</span>
          </p>
          <p className="text-[#FFFFFFCC] text-lg">
            Монтаж
            <span className="text-white font-bold"> за 1 день</span>
          </p>
          <p className="text-[#FFFFFFCC] text-lg">
            Производительность
            <span className="text-white font-bold"> до 15 человек</span>
          </p>
          <p className="text-[#FFFFFFCC] text-lg">
            Устойчивость
            <span className="text-white font-bold"> к залповым сбросам</span>
          </p>
          <p className="text-[#FFFFFFCC] text-lg">
            <span className="text-white font-bold">Отказ </span>
            от ассенизационной машины
          </p>
          <p className="text-[#FFFFFFCC] text-lg">
            Работает{" "}
            <span className="text-white font-bold">
              при отключенной электроэнергии
            </span>
          </p>
          <h1 className="uppercase text-[#FFFFFFCC] text-xl font-semibold">
            Также ЛОС выбирают за:
          </h1>
          <div>

          </div>
        </div>
        <img src="p1.svg" />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// const features = [
//   {
//     title: "ЭКОНОМИЧНОСТЬ",
//     description:
//       "Приобретая станцию у производителя, вы добьетесь экономической выгоды",
//   },
//   {
//     title: "ЭКОЛОГИЧНОСТЬ",
//     description:
//       "Стоки, прошедшие через установку, полностью безопасны для окружающей среды",
//   },
//   {
//     title: "ДОЛГОВЕЧНОСТЬ",
//     description:
//       "Стабилизированный пластиковый корпус прослужит не менее 50 лет",
//   },
//   {
//     title: "АВТОНОМНОСТЬ",
//     description:
//       "Вам не нужно вмешиваться в работу станции – она работает сама",
//   },
//   {
//     title: "ПРОСТОТА УСТАНОВКИ",
//     description: "Монтаж за 1 день, без значительных земляных работ",
//   },
//   {
//     title: "НАДЕЖНОСТЬ",
//     description:
//       "Использование компонентов импортных производителей – залог нашей надёжности",
//   },
// ];
