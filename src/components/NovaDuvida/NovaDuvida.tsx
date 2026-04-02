import { useRef } from 'react';
import styles from './NovaDuvida.module.css';
import { NovaDuvida as NovaDuvidaType, Prioridade } from '../../types';

interface Props {
  onCriar: (duvida: NovaDuvidaType) => void;
}

export function FormNovaDuvida({ onCriar }: Props) {
  const tituloRef = useRef<HTMLInputElement>(null);
  const materiaRef = useRef<HTMLInputElement>(null);
  const descricaoRef = useRef<HTMLTextAreaElement>(null);
  const prioridadeRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCriar({
      titulo: tituloRef.current?.value || '',
      materia: materiaRef.current?.value || 'Geral',
      descricao: descricaoRef.current?.value || '',
      prioridade: (prioridadeRef.current?.value as Prioridade) || 'media',
      status: 'pendente'
    });
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section className={styles.container} aria-labelledby="form-titulo">
      <h2 id="form-titulo">Registrar Nova Dúvida</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <div className={styles.field}>
            <label htmlFor="titulo">Título</label>
            <input id="titulo" ref={tituloRef} required placeholder="Ex: Erro no useEffect" />
          </div>
          <div className={styles.field}>
            <label htmlFor="materia">Matéria</label>
            <input 
              id="materia" 
              ref={materiaRef} 
              required 
              placeholder="Digite ou escolha..." 
              list="sugestoes-materias" 
            />
            <datalist id="sugestoes-materias">
              <option value="React" />
              <option value="TypeScript" />
              <option value="JavaScript" />
              <option value="CSS" />
              <option value="Node.js" />
            </datalist>
          </div>
          <div className={styles.field}>
            <label htmlFor="prioridade">Prioridade</label>
            <select id="prioridade" ref={prioridadeRef}>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="descricao">Descrição</label>
          <textarea id="descricao" ref={descricaoRef} rows={4} maxLength={500} placeholder="Descreva o que você não entendeu..." />
        </div>
        <button type="submit" className={styles.btnSubmit}>Salvar Dúvida</button>
      </form>
    </section>
  );
}