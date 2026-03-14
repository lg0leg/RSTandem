import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SecondPage from './pages/SecondPage';
import GroqPage from './pages/GroqPage';
import GroqPage2 from './pages/GroqPage2';

function App() {
  return (
    <>
      <header>
        <nav className="p-4 border-b-2 border-b-amber-500">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `mr-5 ${isActive ? 'font-semibold text-amber-600 underline' : ''}`
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/secpage"
            className={({ isActive }) =>
              `mr-5 ${isActive ? 'font-semibold text-amber-600 underline' : ''}`
            }
          >
            Стор
          </NavLink>
          <NavLink
            to="/groq-page"
            className={({ isActive }) =>
              `mr-5 ${isActive ? 'font-semibold text-amber-600 underline' : ''}`
            }
          >
            Чат
          </NavLink>
          <NavLink
            to="/groq-page-2"
            className={({ isActive }) =>
              `mr-5 ${isActive ? 'font-semibold text-amber-600 underline' : ''}`
            }
          >
            Чат-sdk
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="secpage" element={<SecondPage />} />
          <Route path="groq-page" element={<GroqPage />} />
          <Route path="groq-page-2" element={<GroqPage2 />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
