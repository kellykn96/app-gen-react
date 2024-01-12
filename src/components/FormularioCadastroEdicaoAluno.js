import React, { useState, useEffect } from 'react';
import { getTurmas } from "../services/turmaService";

const FormularioCadastroEdicao = ({ modo, dadosIniciais, onSubmit, onClose }) => {
  const [turmas, setTurmas] = useState([]);

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [turma, setTurma] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [notaPrimeiroSemestre, setNotaPrimeiroSemestre] = useState('');
  const [notaSegundoSemestre, setNotaSegundoSemestre] = useState('');
 

  useEffect(() => {
    fetchTurmas();
  }, []);

  useEffect(() => {
    if (modo === 'editar' && dadosIniciais) {
      setId(dadosIniciais.id || '');
      setNome(dadosIniciais.nome);
      setTurma(dadosIniciais.turma);
      setIdade(dadosIniciais.idade);
      setDataNascimento(dadosIniciais.dataNascimento);
      setNotaPrimeiroSemestre(dadosIniciais.notaPrimeiroSemestre);
      setNotaSegundoSemestre(dadosIniciais.notaSegundoSemestre);
    }
  }, [modo, dadosIniciais]);

  const fetchTurmas = async () => {
    try {
        const data = await getTurmas();
        setTurmas(data);
    } catch (error) { 
        console.error('Erro ao buscar turmas:', error); 
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const dadosFormulario = {
      nome,
      idade,
      turma,
      dataNascimento,
      notaPrimeiroSemestre,
      notaSegundoSemestre
    };
    
    onSubmit(dadosFormulario, id);
    onClose(); 
  };

  const handleFecharModal = () => {
    onClose();
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <form onSubmit={handleFormSubmit}>
          <label>Nome</label>
          <input
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>Idade</label>
          <input
            type="number"
            required
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />

          <label>Turma</label>
          <select
            required
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            >
            <option value="" disabled>
              Selecione uma turma
            </option>
            {turmas.map((turmaOption) => (
              <option key={turmaOption.id} value={turmaOption.id}>
                {turmaOption.descricao}
              </option>
            ))}
          </select>


          <label>Data de Nascimento</label>
          <input
            type="date"
            required
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          <label>Nota do Primeiro Semestre</label>
          <input
            type="number"
            step="0.1"
            required
            value={notaPrimeiroSemestre}
            onChange={(e) => setNotaPrimeiroSemestre(e.target.value)}
          />

          <label>Nota do Segundo Semestre</label>
          <input
            type="number"
            step="0.1"
            required
            value={notaSegundoSemestre}
            onChange={(e) => setNotaSegundoSemestre(e.target.value)}
          />

          <button id="btnSalvar" type="submit">
            {modo === 'cadastro' ? 'Cadastrar' : 'Salvar'}
          </button>

          <button type="button" onClick={handleFecharModal}>
            Fechar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioCadastroEdicao;
