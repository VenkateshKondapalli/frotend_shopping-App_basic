import { Link, useNavigate } from "react-router";
import { NavBar } from "../components/NavBar";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const obj = {
      email,
      password,
    };
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(obj),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const result = await resp.json();
      if (resp.status === 200) {
        alert("registration successful");
        navigate("/");
      } else {
        alert("resistration Error", result.message);
      }
    } catch (err) {
      console.log("Internal server error ", err.message);
    }
  };
  return (
    <div>
      <NavBar />
      <div className="flex justify-center p-10">
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
          onSubmit={handleRegister}
        >
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="user-email">
              Email
            </label>
            <input
              id="user-email"
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 mb-1 "
              htmlFor="user-password"
            >
              Password
            </label>
            <input
              id="user-password"
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Login
          </button>
          <p>
            <span>Already have account?</span>
            <Link to="/signup" className="text-blue-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export { LoginPage };
