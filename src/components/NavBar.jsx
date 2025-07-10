import { Link } from "react-router";
import { useMyContext } from "../context/MyContext";

const NavBar = () => {
  const { count } = useMyContext();
  return (
    <div className="py-4 px-6 flex bg-blue-100 justify-between">
      <Link to="/" className="font-bold text-blue-700">
        Shopping App
      </Link>
      <div className="flex gap-2">
        <input
          className="border border-blue-300 py-1 px-2 rounded-md text-gray-800"
          type="text"
        />
        <button className="border border-blue-400 py-1 px-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
          Search
        </button>
      </div>
      <div className="flex gap-2">
        <Link className="text-blue-700 hover:underline" to="/profile">
          Profile
        </Link>
        <Link className="text-blue-700 hover:underline" to="/signup">
          SignUp
        </Link>
      </div>
      <div className="bg-indigo-400 h-8 w-8 rounded-full flex  items-center justify-center ">
        <p className=" text-zinc-800  font-bold">{count}</p>
      </div>
    </div>
  );
};
export { NavBar };
