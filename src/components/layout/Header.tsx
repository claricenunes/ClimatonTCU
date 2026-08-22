import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconMenu, IconX } from "../../lib/icons";
import logo from "../../icons/logo.png";

const NAV_ITEMS = [
  { to: "/", label: "ClimAqui", end: true },
  { to: "/noticias", label: "Notícias" },
  { to: "/comunidade", label: "Comunidade" },
  { to: "/relatos", label: "Relatos" },
  { to: "/educacao", label: "Educação" },
  { to: "/central-dados", label: "Central de Dados" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <div className="bg-nav">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="" className="size-10" />
            <span className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-white">ClimAqui</span>
              <span className="hidden text-sm font-medium text-white/70 sm:inline">Brasil</span>
            </span>
          </NavLink>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.slice(1).map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors ${
                        isActive
                          ? "bg-highlight/20 text-highlight-strong"
                          : "text-white/90 hover:bg-highlight/20 hover:text-highlight-strong"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <IconX className="size-6" /> : <IconMenu className="size-6" />}
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" aria-label="Navegação principal (celular)" className="border-t border-white/15 md:hidden">
            <ul className="flex flex-col gap-1 px-4 py-3">
              {NAV_ITEMS.slice(1).map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-base font-semibold ${
                        isActive ? "bg-highlight/20 text-highlight-strong" : "text-white/90 hover:bg-white/10"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <div className="h-[3px] bg-highlight" aria-hidden="true" />
    </header>
  );
}
