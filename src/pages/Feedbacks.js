import React, { useEffect, useState } from "react";
import FormularioCadastroEdicao from "../components/FormularioCadastroEdicaoFeedback";
import {
    getFeedback,
    deletarFeedback,
    criarFeedback,
    atualizarFeedback,
  } from "../services/feedbackService";
import Navbar from "../components/Navbar";

  
const Feedbacks = () => {
    const [feedback, setFeedback] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [dadosEdicao, setDadosEdicao] = useState(null);

    useEffect(() => {
        fetchFeedback();
    }, []);
    

    const handleAbrirModal = () => {
        setModalAberto(true);
      };
    
      const handleFecharModal = () => {
        setModalAberto(false);
        setDadosEdicao(null);
      };
    
      const handleEditarItem = (dadosItem) => {
        setDadosEdicao(dadosItem);
        setModalAberto(true);
      };
    
      const handleFormSubmit = async (dadosFormulario, id) => {
        if (id) {
          await atualizarFeedback(id, dadosFormulario);
        } else {
          await criarFeedback(dadosFormulario);
        }
        await fetchFeedback();
        handleFecharModal();
      };
    
      const fetchFeedback = async () => {
        try {
          const data = await getFeedback();
          setFeedback(data);
        } catch (error) {
          console.error('Erro ao buscar feedback:', error);
        }
      };
    
      const deleteFeedback = async (id) => {
        await deletarFeedback(id);
        await fetchFeedback();
      };
    return (
       <div className="container_view">
        <Navbar />
        <div className="container">
            <div className="header">
                <span>Feedbacks</span>
                <button className="new" onClick={handleAbrirModal}>Cadastrar</button>
            </div>

            <div className="divTable">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Feed</th>
                            <th className="acao"></th>
                            <th className="acao"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedback.map((feedback) => (
                            <tr key={feedback.id}>
                                <td>{feedback.id}</td>
                                <td>{feedback.observacoes}</td>
                                <td className="acao">
                                    <a onClick={() => handleEditarItem(feedback)}>Editar</a>
                                </td>
                                <td className="acao">
                                    <a onClick={() => deleteFeedback(feedback.id)}>Excluir</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalAberto && (
                <FormularioCadastroEdicao
                    modo={dadosEdicao ? 'editar' : 'cadastro'}
                    dadosIniciais={dadosEdicao}
                    onSubmit={handleFormSubmit}
                    onClose={handleFecharModal}
                />
            )}
        </div>
       </div>
    )
}

export default Feedbacks;