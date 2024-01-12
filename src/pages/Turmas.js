import React, {useState, useEffect} from "react";
import { getTurmas, deletarTurma, atualizarTurma, criarTurma } from "../services/turmaService";
import FormularioCadastroEdicao from "../components/FormularioCadastroEdicaoTurma";
import Navbar from "../components/Navbar";

const Turmas = () => {
    const [turmas, setTurmas] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [dadosEdicao, setDadosEdicao] = useState(null);

    useEffect(() => {
        fetchTurmas();
    },[setTurmas])

    const fetchTurmas = async () => {
        try {
            const data = await getTurmas();
            setTurmas(data);
        } catch (error) { 
            console.error('Erro ao buscar turmas:', error); 
        }
    };

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
            await atualizarTurma(id, dadosFormulario);
        } else {
            await criarTurma(dadosFormulario);
        }
        await fetchTurmas();
        handleFecharModal();
    };

    const deleteTurmas = async (id) => {
        await deletarTurma(id);
        await fetchTurmas();
    }

    return (
        <div className="container_view">
        <Navbar />
        <div className="container">
            <div className="header">
                <span>Turmas</span>
                <button className="new" onClick={handleAbrirModal}>Cadastrar</button>
            </div>

            <div className="divTable">
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Descrição</th>
                        <th>Professor</th>
                        <th>Ativo</th>
                        <th className="acao">Editar</th>
                        <th className="acao">Excluir</th>
                    </tr>
                    </thead>
                    <tbody>
                        {turmas.map((turma) => (
                            <tr key={turma.id}>
                                <td>{turma.id}</td>
                                <td>{turma.descricao}</td>
                                <td>{turma.professor.nome}</td>
                                <td>{(turma.ativo) ? 'Sim' : 'Não'}</td>
                                <td className="acao"><a onClick={() => handleEditarItem(turma)}>Editar</a></td>
                                <td className="acao"><a onClick={() => deleteTurmas(turma.id)}>Excluir</a></td>
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

export default Turmas;