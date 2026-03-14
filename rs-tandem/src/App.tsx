import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import { routes } from './routes/public';

function App() {
  return (
    <>
      <header>
        <nav className="p-4 border-b-2 border-b-amber-500">
          {routes.map((obj) => (
            <NavLink
              key={obj.to}
              to={obj.to}
              className={({ isActive }) => `mr-5 ${isActive ? 'font-semibold text-amber-600 underline' : ''}`}
            >
              {obj.name}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          {routes.map((obj) => {
            if (obj.index) {
              return <Route key="index" index element={<obj.component />} />;
            }
            return <Route key={obj.to} path={obj.to} element={<obj.component />} />;
          })}
        </Routes>
      </main>
    </>
  );
}

export default App;
