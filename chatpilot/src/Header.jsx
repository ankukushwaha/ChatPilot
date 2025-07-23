// components/Header.jsx
import { useTheme } from './Context/UseTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="d-flex justify-content-between align-items-center px-3 py-2 header-bar">
      <div className="d-flex align-items-center gap-2">
        <span className="fw-bold fs-5">Chat Pilot</span>
        {/* <span className="badge bg-success">#2F3437</span> */}
      </div>
      <div className="d-flex gap-3 align-items-center">
        <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        {/* <i className="bi bi-search"></i> */}
        <i className="bi bi-person-circle"></i>
      </div>
    </div>
  );
}
