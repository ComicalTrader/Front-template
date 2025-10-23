import { useState, useMemo } from "react";

export function useReceitas() {
  const [receitas, setReceitas] = useState([
    {
      id: 1,
      tipo: "Serviço",
      nome: "Corte de cabelo",
      cliente: "João Silva",
      valor: 40.0,
      formaPagamento: "Pix",
      status: "Pago",
      data: "2025-10-20",
    },
    {
      id: 2,
      tipo: "Produto",
      nome: "Pomada modeladora",
      cliente: "Carlos Souza",
      valor: 25.0,
      formaPagamento: "Cartão",
      status: "Pendente",
      data: "2025-10-22",
    },
  ]);

  const totalReceitas = useMemo(
    () => receitas.reduce((acc, item) => acc + item.valor, 0),
    [receitas]
  );

  const totalPendentes = useMemo(
    () =>
      receitas
        .filter((r) => r.status === "Pendente")
        .reduce((acc, item) => acc + item.valor, 0),
    [receitas]
  );

  function adicionarReceita(nova) {
    setReceitas([...receitas, { ...nova, id: Date.now() }]);
  }

  function atualizarStatus(id, novoStatus) {
    setReceitas(
      receitas.map((r) =>
        r.id === id ? { ...r, status: novoStatus } : r
      )
    );
  }

  return {
    receitas,
    totalReceitas,
    totalPendentes,
    adicionarReceita,
    atualizarStatus,
  };
}
