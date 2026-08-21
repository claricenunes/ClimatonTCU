import { Link } from "react-router-dom";
import { IconSprout } from "../../lib/icons";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#d7e8da] bg-[#f0f8f1]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2 text-brand-800">
            <IconSprout className="size-5" />
            <span className="text-lg font-extrabold">SituaMap Brasil</span>
          </div>
          <p className="max-w-xs text-sm text-[#3f5b45]">
            Plataforma de acompanhamento da situação climática dos estados e municípios do Brasil, com dados abertos
            para consulta e acompanhamento da população.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#17301c]">Navegação</h3>
          <ul className="space-y-2 text-sm text-[#3f5b45]">
            <li>
              <Link to="/" className="hover:text-brand-700 hover:underline">
                SituaMap
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
              <Link to="/educacao" className="hover:text-brand-700 hover:underline">
                Educação
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#17301c]">Sobre os dados</h3>
          <p className="text-sm text-[#3f5b45]">
            Protótipo com dados simulados, preparado para futura integração com bases oficiais. A Bahia é o piloto
            com maior nível de detalhamento por município.
          </p>
        </div>
      </div>
      <div className="border-t border-[#d7e8da] px-4 py-4 text-center text-xs text-[#5c7a62] sm:px-6">
        SituaMap Brasil — protótipo interativo. Dados exibidos são simulados.
      </div>
    </footer>
  );
}
