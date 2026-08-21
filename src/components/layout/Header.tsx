import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AccessibilityBar } from "./AccessibilityBar";
import { IconMenu, IconX, IconSprout } from "../../lib/icons";

const NAV_ITEMS = [
  { to: "/", label: "SituaMap", end: true },
  { to: "/noticias", label: "Notícias" },
  { to: "/comunidade", label: "Comunidade" },
  { to: "/educacao", label: "Educação" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <AccessibilityBar />
      <div className="bg-gradient-to-r from-brand-700 to-brand-600">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2 text-white" onClick={() => setMenuOpen(false)}>
            <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
              <IconSprout className="size-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">SituaMap</span>
            <span className="hidden text-sm font-medium text-brand-100 sm:inline">Brasil</span>
          </NavLink>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.slice(1).map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-2.5 text-[15px] font-bold uppercase tracking-wide transition-colors ${
                        isActive ? "bg-white text-brand-800" : "text-white hover:bg-white/15"
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
            className="rounded-lg p-2 text-white hover:bg-white/15 md:hidden"
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
                      `block rounded-lg px-4 py-3 text-base font-bold uppercase tracking-wide ${
                        isActive ? "bg-white text-brand-800" : "text-white hover:bg-white/15"
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
    </header>
  );
}
