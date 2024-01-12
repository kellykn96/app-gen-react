import React, { useState, useEffect } from 'react';

const FormularioCadastroEdicao = ({ modo, dadosIniciais, onSubmit, onClose }) => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [materia, setMateria] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    if (modo === 'editar' && dadosIniciais) {
      setId(dadosIniciais.id || '');
      setNome(dadosIniciais.nome || '');
      setIdade(dadosIniciais.idade || '');
      setMateria(dadosIniciais.materia || '');
      setObservacoes(dadosIniciais.observacoes || '');
    }
  }, [modo, dadosIniciais]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const dadosFormulario = {
      nome,
      idade,
      materia,
      observacoes
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
            id="m-nome"
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>Idade</label>
          <input
            id="m-idade"
            type="number"
            required
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />

          <label>Materia</label>
          <input
            id="m-materia"
            type="text"
            required
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
          />

          <label>Observações</label>
          <input
            id="m-observacoes"
            type="text"
            required
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
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
