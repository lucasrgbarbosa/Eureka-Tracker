import { useState, useEffect, useMemo } from "react";
import { FormNovaDuvida } from "./components/NovaDuvida/NovaDuvida";
import { DuvidaCard } from "./components/DuvidaCard/DuvidaCard";
import { duvidaService } from "./services/duvidaService";
import { Duvida, NovaDuvida } from "./types";
import styles from "./App.module.css";
import Swal from 'sweetalert2';

export default function App() {
  const [duvidas, setDuvidas] = useState<Duvida[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Estado único para o Filtro
  const [filtroAtivo, setFiltroAtivo] = useState<
    "todas" | "pendente" | "resolvida"
  >("todas");

  useEffect(() => {
    duvidaService
      .listar()
      .then(setDuvidas)
      .catch(() =>
        setErro(
          "Erro ao conectar com a API. Verifique se o json-server está rodando.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  // Filtro otimizado: só roda quando a lista de dúvidas ou a aba clicada mudar
  const duvidasFiltradas = useMemo(() => {
    if (filtroAtivo === "todas") return duvidas;
    return duvidas.filter((duvida) => duvida.status === filtroAtivo);
  }, [duvidas, filtroAtivo]);

  const handleCriar = async (nova: NovaDuvida) => {
    try {
      const criada = await duvidaService.criar(nova);
      setDuvidas((prev) => [...prev, criada]);
    } catch (e) {
      alert("Erro ao criar dúvida");
    }
  };

  const handleAlternarStatus = async (id: string, resolvido: boolean) => {
    try {
      const statusNovo = resolvido ? "resolvida" : "pendente";
      const resolvidoEm = resolvido ? new Date().toISOString() : null;
      const atualizada = await duvidaService.atualizar(id, {
        status: statusNovo,
        resolvidoEm,
      });
      setDuvidas((prev) => prev.map((d) => (d.id === id ? atualizada : d)));
    } catch (e) {
      alert("Erro ao atualizar status");
    }
  };

  const handleRemover = async (id: string) => {
    const result = await Swal.fire({
      title: 'Excluir Dúvida?',
      text: "Essa ação não pode ser desfeita.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#334155',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      background: '#1e293b',
      color: '#f8fafc',
    });

    if (result.isConfirmed) {
      try {
        await duvidaService.remover(id);
        setDuvidas(prev => prev.filter(d => d.id !== id));
      } catch (e) { 
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível excluir a dúvida.',
          icon: 'error',
          background: '#1e293b',
          color: '#f8fafc'
        });
      }
    }
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.pageSubtitle}>Organizador De Estudos</p>
          <h1 className={styles.pageTitle}>Minhas Dúvidas</h1>
          <p className={styles.pageDescription}> Registre, acompanhe e resolva as dúvidas dos seus estudos</p>
        </div>
      </header>

      {erro && (
        <div className={styles.erro} role="alert">
          {erro}
        </div>
      )}

      <FormNovaDuvida onCriar={handleCriar} />

      {/* ÁREA APENAS COM AS ABAS DE FILTRO */}
      <section className={styles.filterSection}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${filtroAtivo === "todas" ? styles.tabActive : ""}`}
            onClick={() => setFiltroAtivo("todas")}
          >
            Todas
          </button>
          <button
            className={`${styles.tabBtn} ${filtroAtivo === "pendente" ? styles.tabActive : ""}`}
            onClick={() => setFiltroAtivo("pendente")}
          >
            Pendentes
          </button>
          <button
            className={`${styles.tabBtn} ${filtroAtivo === "resolvida" ? styles.tabActive : ""}`}
            onClick={() => setFiltroAtivo("resolvida")}
          >
            Resolvidas
          </button>
        </div>
      </section>

      <main>
        {loading ? (
          <p className={styles.loading}>Carregando suas dúvidas...</p>
        ) : duvidasFiltradas.length === 0 ? (
          <p className={styles.emptyState}>
            Nenhuma dúvida encontrada para esta aba.
          </p>
        ) : (
          <div className={styles.list}>
            {duvidasFiltradas.map((d) => (
              <DuvidaCard
                key={d.id}
                duvida={d}
                onAlternarStatus={handleAlternarStatus}
                onRemover={handleRemover}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
