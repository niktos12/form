import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
export function Main() {
  const data = [
    {
      id: 1,
      text: "gdfgdfg",
      title: "product 1",
    },
    {
      id: 2,
      text: "gdfgdfg",
      title: "product 2",
    },
    {
      id: 3,
      text: "gdfgdfg",
      title: "product 3",
    },
    {
      id: 4,
      text: "gdfgdfg",
      title: "product 4",
    },
    {
      id: 5,
      text: "gdfgdfg",
      title: "product 5",
    },
    {
      id: 6,
      text: "gdfgdfg",
      title: "product 6",
    },
    {
      id: 7,
      text: "gdfgdfg",
      title: "product 7",
    },
    {
      id: 8,
      text: "gdfgdfg",
      title: "product 8",
    },
    {
      id: 9,
      text: "gdfgdfg",
      title: "product 9",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-800">
      <Header />
      <div className="grid grid-cols-3 p-8 gap-4">
        {data.map((card) => (
          <div
            key={card.id}
            className="gap-3 flex flex-col border-white border bg-gradient-to-br from-purple-900 to-indigo-800 rounded-3xl p-6 shadow-2xl"
          >
            <div className="w-[250px] h-[250px] bg-white self-center">png</div>
            <h1 className="text-center text-white text-3xl">{card.title}</h1>
            <p className="text-white">{card.text}</p>
            <button className="p-4 rounded-2xl cursor-pointer bg-white duration-300 hover:bg-amber-100">
              Buy
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-row overflow-x-scroll p-4 gap-4">
        {data.map((card) => (
          <div className="gap-2 flex flex-col border-white border p-4 rounded-2xl">
            <div className="w-[150px] h-[150px] bg-white">png</div>
            <h1 className="text-center text-white text-xl">{card.title}</h1>
            <p className="text-white">{card.text}</p>
            <button className="p-4 rounded-2xl cursor-pointer bg-white duration-300 hover:bg-amber-100">
              Buy
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
