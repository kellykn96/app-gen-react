import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li><Link to="/">Feedback</Link></li>
                <li><Link to="/professores">Professores</Link></li>
                <li><Link to="/alunos">Alunos</Link></li>
                <li><Link to="/turmas">Turmas</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;