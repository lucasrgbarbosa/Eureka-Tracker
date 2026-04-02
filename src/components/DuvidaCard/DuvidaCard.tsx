import { Duvida } from '../../types';
import styles from './DuvidaCard.module.css';

interface Props {
  duvida: Duvida;
  onAlternarStatus: (id: string, resolvido: boolean) => void;
  onRemover: (id: string) => void;
}

export function DuvidaCard({ duvida, onAlternarStatus, onRemover }: Props) {
  const isResolvida = duvida.status === 'resolvida';

  // Formata a data no estilo "19 mar. 2025"
  const dataReferencia = isResolvida ? duvida.resolvidoEm : duvida.criadoEm;
  const dataFormatada = dataReferencia 
    ? new Date(dataReferencia).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace(' de ', ' ')
    : '';

  return (
    <article className={`${styles.card} ${isResolvida ? styles.resolvida : ''}`}>
      
      {/* Botão Resolver/Reabrir (Círculo à esquerda) */}
      <button 
        className={`${styles.btnStatus} ${isResolvida ? styles.btnResolvida : ''}`}
        onClick={() => onAlternarStatus(duvida.id, !isResolvida)}
        title={isResolvida ? "Reabrir dúvida" : "Marcar como resolvida"}
        aria-label="Alternar status"
      >
        {isResolvida ? '✓' : ''}
      </button>

      {/* Conteúdo Central */}
      <div className={styles.content}>
        <h3 className={styles.titulo}>{duvida.titulo}</h3>
        <p className={styles.descricao}>{duvida.descricao || 'Sem descrição'}</p>
        
        <div className={styles.tags}>
          <span className={styles.materia}>{duvida.materia}</span>
          <span className={`${styles.prioridade} ${styles[duvida.prioridade]}`}>
            • {duvida.prioridade.charAt(0).toUpperCase() + duvida.prioridade.slice(1)}
          </span>
          {/* Data exibida no mobile, oculta no desktop */}
          {isResolvida && <span className={styles.dataMobile}>Resolvida em {dataFormatada}</span>}
        </div>
      </div>

      {/* Ações e Data à direita */}
      <div className={styles.rightActions}>
        <span className={isResolvida ? styles.dataResolvida : styles.dataCriacao}>
          {isResolvida ? `Resolvida em ${dataFormatada}` : dataFormatada}
        </span>
        
        {/* Ícone de Excluir Sutil */}
        <button 
          className={styles.btnDelete}
          onClick={() => onRemover(duvida.id)}
          title="Excluir"
          aria-label="Excluir dúvida"
        >
          ✕
        </button>
      </div>

    </article>
  );
}