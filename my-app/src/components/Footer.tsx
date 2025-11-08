export function Footer() {
  return (
    <div className="bg-gradient-to-r from-[#090B1A] to-[#060B17] p-22 px-32 grid grid-cols-4 gap-40">
      <div className="flex flex-col gap-7">
        <img src="/logo.svg" className="w-[240px]" />
        <div className="flex flex-col gap-3">
          <p className="text-white text-sm">ООО «ТОРГОВЫЙ ДОМ «ЛОС-БИО»</p>
          <div className="flex flex-row">
            <p className="text-white text-sm">
              <span className="text-[#FFFFFF54]">ИНН:</span>2463123719
            </p>
            <p className="text-white text-sm">
              <span className="text-[#FFFFFF54]"> КПП:</span>
              246301001
            </p>
          </div>
          <p className="text-white text-sm">
            <span className="text-[#FFFFFF54]"> ОГРН: </span>
            1212400008688F
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-white text-lg font-semibold uppercase">Компания</h1>
        <a href="#" className="text-[#FFFFFFCC]">
          О компании
        </a>
        <a href="#" className="text-[#FFFFFFCC]">
          Проекты
        </a>
        <a href="#" className="text-[#FFFFFFCC]">
          Каталог
        </a>
        <a href="#" className="text-[#FFFFFFCC]">
          Контакты
        </a>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-white text-lg font-semibold uppercase">Каталог</h1>
        <a href="#" className="text-[#FFFFFFCC]">
          КНС
        </a>
        <a href="#" className="text-[#FFFFFFCC]">
          Ёмкости
        </a>
        <a href="#" className="text-[#FFFFFFCC] max-w-[179px]">
          Ливневые очистные-сооружения
        </a>
        <a href="#" className="text-[#FFFFFFCC] max-w-[179px]">
          Хозяйственно-бытовые очистные сооружения
        </a>
        <a href="#" className="text-[#FFFFFFCC]">
          Комплектующие
        </a>
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-white text-lg font-semibold uppercase">Контакты</h1>
        <div className="gap-2 flex flex-row items-center">
          <img src="/phone.svg" />
          <p className="text-white">+7 (391) 209-57-57</p>
        </div>
        <div className="gap-2 flex flex-row items-center">
          <img src="/phone.svg" />
          <p className="text-white">+7 (391) 209-57-57</p>
        </div>
        <div className="gap-2 flex flex-row items-center">
          <img src="/letter.svg" />
          <p className="text-white underline">los-bio@mail.ru</p>
        </div>
        <div className="gap-2 flex flex-row items-center">
          <img src="/arrow.svg" />
          <p className="text-white underline">Заказать звонок</p>
        </div>
        <button className="rounded-sm bg-[#1078D7] text-white text-sm px-5 py-2 ">
          Получить КП
        </button>
      </div>
    </div>
  );
}
