import { NavLink } from 'react-router-dom';
import '../pages/Profil.css';

function ProfileSidebar() {
  return (
    <aside className="profile-sidebar">
      <div className="profile-sidebar__header">
        <h2 className="profile-sidebar__title">Ubah Profil</h2>
        <p className="profile-sidebar__subtitle">Ubah data diri Anda</p>
      </div>

      <nav className="profile-sidebar__nav">
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            `profile-sidebar__item ${isActive ? 'is-active' : ''}`
          }
        >
          <span className="profile-sidebar__icon">👤</span>
          Profil Saya
        </NavLink>

        <NavLink
          to="/kelas-saya"
          className={({ isActive }) =>
            `profile-sidebar__item ${isActive ? 'is-active' : ''}`
          }
        >
          <span className="profile-sidebar__icon">📚</span>
          Kelas Saya
        </NavLink>

        <NavLink
          to="/pesanan"
          className={({ isActive }) =>
            `profile-sidebar__item ${isActive ? 'is-active' : ''}`
          }
        >
          <span className="profile-sidebar__icon">📦</span>
          Pesanan Saya
        </NavLink>
      </nav>
    </aside>
  )
}

export default ProfileSidebar