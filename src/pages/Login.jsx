import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // validação simples
    if (user && pass) {
      navigate("/app");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-80"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">BarberPro</h1>
        <input
          type="text"
          placeholder="Usuário"
          className="w-full mb-3 p-2 border rounded"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-5 p-2 border rounded"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-gray-900 text-white p-2 rounded hover:bg-gray-800"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
