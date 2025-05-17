import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Painel from './container/Painel';
import './sytles/globalstyle.css';
import PaginaQuadro from './pages/PáginaQuadro';
import { QuadrosProvider } from './contexts/QuadrosContext';
import { AuthProvider } from './contexts/AuthContext';
import { EquipeProvider } from './contexts/EquipeContext';
import Equipe from './pages/Equipe';

function App() {
  return (
    <EquipeProvider>
      <AuthProvider>
        <QuadrosProvider>
          <Router>
            <Navbar />
            <div>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/" element={<Painel />} />
                <Route path="/quadro/:id" element={<PaginaQuadro />} />
                <Route path="/equipe" element={<Equipe />} />
              </Routes>
            </div>
          </Router>
        </QuadrosProvider>
      </AuthProvider>
    </EquipeProvider>
  );
}


export default App;
