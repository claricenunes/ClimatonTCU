import { IconDownload, IconFileText } from "../../lib/icons";

interface DownloadCardProps {
  titulo: string;
  descricao: string;
  tamanho?: string;
  formato: "csv" | "json" | "excel";
  onDownload: () => void;
}

const FORMATO_ICONS = {
  csv: <IconFileText className="size-5" />,
  json: <IconFileText className="size-5" />,
  excel: <IconFileText className="size-5" />,
};

const FORMATO_LABEL = {
  csv: "CSV",
  json: "JSON",
  excel: "Excel",
};

export function DownloadCard({
  titulo,
  descricao,
  tamanho,
  formato,
  onDownload,
}: DownloadCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#e0ede1] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            {FORMATO_ICONS[formato]}
          </div>
          <div>
            <h3 className="font-bold text-[#17301c]">{titulo}</h3>
            <p className="text-sm text-[#3f5b45]">{descricao}</p>
            {tamanho && <p className="mt-1 text-xs text-[#8ba690]">{tamanho}</p>}
          </div>
        </div>
        <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
          {FORMATO_LABEL[formato]}
        </span>
      </div>
      <button
        onClick={onDownload}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        <IconDownload className="size-4" />
        Baixar
      </button>
    </div>
  );
}
