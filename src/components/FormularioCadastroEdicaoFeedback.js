import React, { useState, useEffect } from 'react';

const FormularioCadastroEdicao = ({ modo, dadosIniciais, onSubmit, onClose }) => {
  const [id, setId] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    if (modo === 'editar' && dadosIniciais) {
      setId(dadosIniciais.id || '');
      setObservacoes(dadosIniciais.observacoes || '');
    }
  }, [modo, dadosIniciais]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const dadosFormulario = {
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
