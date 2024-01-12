import axios from 'axios';

const API_URL = 'https://aplicacao-spring-boot.onrender.com/api/feedback';

const getFeedback = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar feedback:', error);
    throw error;
  }
};

const criarFeedback = async (novaTurma) => {
  try {
    const response = await axios.post(API_URL, novaTurma);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar feedback:', error);
    throw error;
  }
};

const atualizarFeedback = async (id, turmaAtualizada) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, turmaAtualizada);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar feedback:', error);
    throw error;
  }
};

const deletarFeedback = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar feedback:', error);
    throw error;
  }
};

export {
  getFeedback,
  criarFeedback,
  atualizarFeedback,
  deletarFeedback,
};
