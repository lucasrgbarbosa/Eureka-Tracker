import { Duvida, NovaDuvida, AtualizarDuvida } from '../types';


const API_URL = import.meta.env.VITE_API_URL;

export const duvidaService = {
  async listar(): Promise<Duvida[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Falha ao carregar');
    return res.json();
  },

  async criar(dados: NovaDuvida): Promise<Duvida> {
    const payload = { ...dados, criadoEm: new Date().toISOString(), resolvidoEm: null };
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async atualizar(id: string, dados: AtualizarDuvida): Promise<Duvida> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    return res.json();
  },

  async remover(id: string): Promise<void> {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  }
};