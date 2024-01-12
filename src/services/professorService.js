import axios from 'axios';

const API_URL = 'https://aplicacao-spring-boot.onrender.com/api/professores';

const getProfessoresByNome = async (nome) => {
  try {
    const response = await axios.get(API_URL + '/nome?nome=' + nome);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    throw error;
  }
};


const getProfessores = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    alert('Erro ao buscar professores:', error);
  }
};

const criarProfessor = async (novoProfessor) => {
  try {
    const response = await axios.post(API_URL, novoProfessor);
    return response.data;
  } catch (error) {
    alert('Erro ao criar professor:', error);
  }
};

const atualizarProfessor = async (id, professorAtualizado) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, professorAtualizado);
    return response.data;
  } catch (error) {
    alert('Erro ao atualizar professor:', error);
  }
};

const deletarProfessor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    if (response.status === 200) return response.data;
  } catch (error) {
    alert('Erro ao deletar professor', error);
  }
};

export {
  getProfessores,
  criarProfessor,
  atualizarProfessor,
  deletarProfessor,
  getProfessoresByNome
};
