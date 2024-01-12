import axios from 'axios';

const API_URL = 'https://aplicacao-spring-boot.onrender.com/api/alunos';

const getAlunosByNome = async (nome) => {
  try {
    const response = await axios.get(API_URL + '/nome?nome=' + nome);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    throw error;
  }
};

const getAlunos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    throw error;
  }
};

const criarAluno = async (novoAluno) => {
  try {
    const response = await axios.post(API_URL, novoAluno);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    throw error;
  }
};

const atualizarAluno = async (id, alunoAtualizado) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, alunoAtualizado);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    throw error;
  }
};

const deletarAluno = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    throw error;
  }
};

export {
  getAlunos,
  criarAluno,
  atualizarAluno,
  deletarAluno,
  getAlunosByNome
};
