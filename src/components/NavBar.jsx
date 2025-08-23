import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium";
  const active =
    "bg-black text-white";
  const inactive =
    "text-black hover:bg-black/10";

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">UrbanClean</Link>
        <div className="flex gap-2">
          <NavLink to="/commander" className={({isActive}) => `${linkBase} ${isActive?active:inactive}`}>Commander</NavLink>
          <NavLink to="/historique" className={({isActive}) => `${linkBase} ${isActive?active:inactive}`}>Historique</NavLink>
          <NavLink to="/profil" className={({isActive}) => `${linkBase} ${isActive?active:inactive}`}>Profil</NavLink>
          <NavLink to="/aide" className={({isActive}) => `${linkBase} ${isActive?active:inactive}`}>Aide</NavLink>
        </div>
      </div>
    </nav>
  );
}
