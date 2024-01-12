import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Feedbacks from "./pages/Feedbacks";
import Professores from "./pages/Professores";
import Turmas from "./pages/Turmas";
import Alunos from "./pages/Alunos";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feedbacks/>}/>
                <Route path="/professores" element={<Professores/>}/>
                <Route path="/turmas" element={<Turmas/>}/>
                <Route path="/alunos" element={<Alunos/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;