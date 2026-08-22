import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconMenu, IconX } from "../../lib/icons";
import logo from "../../icons/logo.png";

const NAV_ITEMS = [
  { to: "/", label: "SituaMap", end: true },
  { to: "/noticias", label: "Notícias" },
  { to: "/comunidade", label: "Comunidade" },
  { to: "/educacao", label: "Educação" },
  { to: "/gestor", label: "Gestor" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <div className="bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="" className="size-10" />
            <span className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-ink-900">SituaMap</span>
              <span className="hidden text-sm font-medium text-ink-500 sm:inline">Brasil</span>
            </span>
          </NavLink>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.slice(1).map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block border-b-2 px-3 py-2 text-[15px] font-semibold transition-colors ${
                        isActive
                          ? "border-brand-600 text-brand-700"
                          : "border-transparent text-ink-700 hover:border-ink-200 hover:text-brand-700"
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
            className="rounded-lg p-2 text-ink-700 hover:bg-ink-50 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <IconX className="size-6" /> : <IconMenu className="size-6" />}
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" aria-label="Navegação principal (celular)" className="border-t border-ink-150 md:hidden">
            <ul className="flex flex-col gap-1 px-4 py-3">
              {NAV_ITEMS.slice(1).map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-base font-semibold ${
                        isActive ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-50"
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
      <div className="h-[3px] bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500" aria-hidden="true" />
    </header>
  );
}
