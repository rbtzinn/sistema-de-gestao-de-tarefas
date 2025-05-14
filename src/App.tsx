import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Painel from './container/Painel';
import './sytles/globalstyle.css';
import PaginaQuadro from './pages/PáginaQuadro';
import { QuadrosProvider } from './contexts/QuadrosContext';

function App() {
  return (
    <QuadrosProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/" element={<Painel />} />
            <Route path="/quadro/:id" element={<PaginaQuadro />} />
          </Routes>
        </div>
      </Router>
    </QuadrosProvider>
  );
}

export default App;
