import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SecondPage from './pages/SecondPage';

function App() {
  return (
    <>
      <header>
        <nav className="p-4 border-b-2 border-b-amber-500">
          <Link to="/" className="mr-5">
            Главная
          </Link>
          <Link to="/secpage" className="mr-5">
            Стор
          </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="secpage" element={<SecondPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
