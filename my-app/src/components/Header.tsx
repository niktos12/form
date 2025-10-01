import { useNavigate } from "react-router";
export function Header() {
    const navigate = useNavigate()
  return (
    <div className="flex flex-row items-center justify-around p-4">
      <img alt="logo" src="" />
      <div className="flex flex-row gap-4">
        <a href="" onClick={() => navigate("/main")} className="text-white font-medium">
          Main
        </a>
        <a href="" className="text-white font-medium">
          Products
        </a>
        <a href="" className="text-white font-medium">
          Account
        </a>
        <a href="" className="text-white font-medium">
          Tech support
        </a>
      </div>
      <button className="px-8 py-4 rounded-2xl cursor-pointer bg-white">
        Выйти
      </button>
    </div>
  );
}
