import { Link } from "react-router-dom";
import logo from "../../icons/logo.png";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-150 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2 text-ink-900">
            <img src={logo} alt="" className="size-7" />
            <span className="text-base font-extrabold tracking-tight">ClimAqui Brasil</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-600">
            Plataforma de acompanhamento da situação climática dos estados e municípios do Brasil, com dados abertos
            para consulta e acompanhamento da população.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-500">Navegação</h3>
          <ul className="space-y-2 text-sm text-ink-700">
            <li>
              <Link to="/" className="hover:text-brand-700 hover:underline">
                ClimAqui
              </Link>
            </li>
            <li>
              <Link to="/noticias" className="hover:text-brand-700 hover:underline">
                Notícias
              </Link>
            </li>
            <li>
              <Link to="/comunidade" className="hover:text-brand-700 hover:underline">
                Comunidade
              </Link>
            </li>
            <li>
              <Link to="/relatos" className="hover:text-brand-700 hover:underline">
                Relatos
              </Link>
            </li>
            <li>
              <Link to="/educacao" className="hover:text-brand-700 hover:underline">
                Educação
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-500">Sobre os dados</h3>
          <p className="text-sm leading-relaxed text-ink-600">
            Os dados exibidos são reais, coletados a partir da plataforma{" "}
            <a
              href="https://climatescanner.org/pt/inicio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 hover:underline"
            >
              Climate Scanner
            </a>
            .
          </p>
        </div>
      </div>
      <div className="border-t border-ink-150 px-4 py-4 text-center text-xs text-ink-500 sm:px-6">
        ClimAqui Brasil — protótipo interativo. Dados coletados via Climate Scanner.
      </div>
    </footer>
  );
}
