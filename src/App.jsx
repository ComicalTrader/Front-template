import React from "react";

const App = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-6 text-white bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold">BarberPro</h2>
        <ul className="space-y-3">
          <li>Home</li>
          <li>Agenda</li>
          <li>Financeiro</li>
          <li>Clientes</li>
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-red-500">
        <h1 className="text-3xl font-bold text-white">Testando Tailwind!</h1>
        <p className="mt-4 text-white">Se você vê isso vermelho, Tailwind está funcionando!</p>
      </main>
    </div>
  );
};

export default App;
