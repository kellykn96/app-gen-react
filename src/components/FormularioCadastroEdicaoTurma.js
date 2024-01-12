import React, { useState, useEffect } from 'react';
import { getProfessores } from "../services/professorService";

const FormularioCadastroEdicao = ({ modo, dadosIniciais, onSubmit, onClose }) => {
  const [professors, setProfessores] = useState([]);

  const [id, setId] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [descricao, setDescricao] = useState('');
  const [professor, setProfessor] = useState('');

  useEffect(() => {
    fetchTurmas();
  }, []);

  useEffect(() => {
    if (modo === 'editar' && dadosIniciais) {
      setId(dadosIniciais.id || '');
      setAtivo(dadosIniciais.ativo);
      setProfessor(dadosIniciais.professor);
      setDescricao(dadosIniciais.descricao);
    }
  }, [modo, dadosIniciais]);

  const fetchTurmas = async () => {
    try {
        const data = await getProfessores();
        setProfessores(data);
    } catch (error) { 
        console.error('Erro ao buscar turmas:', error); 
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const dadosFormulario = {
      ativo,
      descricao,
      professor,
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
          <label>Descrição</label>
          <input
            type="text"
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <label>Professor</label>
          <select
            required
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            >
            <option value="" disabled>
              Selecione uma professor
            </option>
            {professors.map((professorOption) => (
              <option key={professorOption.id} value={professorOption.id}>
                {professorOption.nome}
              </option>
            ))}
          </select>

          <label>Status</label>
          <select
            required
            value={ativo}
            onChange={(e) => setAtivo(e.target.value === "true")}
          >
            <option value={true}>Ativo</option>
            <option value={false}>Inativo</option>
          </select>


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
