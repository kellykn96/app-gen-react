import axios from 'axios';

const API_URL = 'https://aplicacao-spring-boot.onrender.com/api/turmas';

const getTurmas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar turmas:', error);
    throw error;
  }
};

const criarTurma = async (novaTurma) => {
  try {
    const response = await axios.post(API_URL, novaTurma);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar turma:', error);
    throw error;
  }
};

const atualizarTurma = async (id, turmaAtualizada) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, turmaAtualizada);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar turma:', error);
    throw error;
  }
};

const deletarTurma = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar turma:', error);
    throw error;
  }
};

export {
  getTurmas,
  criarTurma,
  atualizarTurma,
  deletarTurma,
};
