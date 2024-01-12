import React, {useState, useEffect} from "react";
import FormularioCadastroEdicao from "../components/FormularioCadastroEdicaoAluno";
import { atualizarAluno, criarAluno, deletarAluno, getAlunos, getAlunosByNome } from "../services/alunoService";
import Navbar from "../components/Navbar";

const Alunos = () => {
    const [alunos, setAlunos] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [dadosEdicao, setDadosEdicao] = useState(null);
    const [nomePesquisa, setNomePesquisa] = useState("");

    useEffect(() => {
        fetchAlunos();
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
            await atualizarAluno(id, dadosFormulario);
        } else {
            await criarAluno(dadosFormulario);
        }
        await fetchAlunos();
        handleFecharModal();
    };

    const fetchAlunos = async () => {
    try {
        const data = await getAlunos();
        setAlunos(data);
    } catch (error) {
        console.error('Erro ao buscar feedback:', error);
    }
    };

    const deleteAlunos = async (id) => {
        await deletarAluno(id);
        await fetchAlunos();
    };

    const handlePesquisarPorNome = async () => {
        try {
            const data = await getAlunosByNome(nomePesquisa);
            setAlunos(data);
        } catch (error) {
            console.error('Erro ao buscar alunos por nome:', error);
        }
    };
    
    
    return (
        <div className="container_view">
        <Navbar />
        <div className="container">
            <div className="header">
                <span>Alunos</span>
                <button className="new" onClick={handleAbrirModal}>Cadastrar</button>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pesquisar por nome"
                    value={nomePesquisa}
                    onChange={(e) => setNomePesquisa(e.target.value)}
                />
                <button className="new" onClick={handlePesquisarPorNome}>Pesquisar</button>
            </div>

            <div className="divTable">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Turma</th>
                            <th>Data de nascimento</th>
                            <th>Nota do primeiro semestre</th>
                            <th>Nota do segundo semestre</th>
                            <th>Media final</th>
                            <th className="acao">Editar</th>
                            <th className="acao">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.idade}</td>
                                <td>{aluno.turma.descricao}</td>
                                <td>{aluno.dataNascimento}</td>
                                <td>{aluno.notaPrimeiroSemestre}</td>
                                <td>{aluno.notaSegundoSemestre}</td>
                                <td>{aluno.mediaFinal}</td>
                                <td className="acao">
                                    <a onClick={() => handleEditarItem(aluno)}>Editar</a>
                                </td>
                                <td className="acao">
                                    <a onClick={() => deleteAlunos(aluno.id)}>Excluir</a>
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

export default Alunos;