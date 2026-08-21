import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { IconArrowLeft } from "../lib/icons";

export default function NotFound() {
  return (
    <div id="conteudo-principal" className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-extrabold text-brand-700">404</p>
      <h1 className="mt-3 text-2xl font-bold text-[#17301c]">Página não encontrada</h1>
      <p className="mt-2 text-[#3f5b45]">A página que você procura não existe ou foi movida.</p>
      <Link to="/" className="mt-6">
        <Button icon={<IconArrowLeft className="size-4" />}>Voltar para o início</Button>
      </Link>
    </div>
  );
}
