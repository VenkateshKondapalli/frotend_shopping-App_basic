import { Link } from "react-router";

const NavBar = () => {
  return (
    <div className="py-4 px-6 flex bg-blue-100 justify-between">
      <h1 className="font-bold text-blue-700">Shopping App</h1>
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
      <div className="bg-black h-8 w-8 rounded-full"></div>
    </div>
  );
};
export { NavBar };
