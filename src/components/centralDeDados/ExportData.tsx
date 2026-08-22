import type { ItemAvaliacaoClimatica } from "../../types";
import { DownloadCard } from "./DownloadCard";

interface ExportDataProps {
  avaliacoes: ItemAvaliacaoClimatica[];
  estadoNome: string;
}

export function ExportData({ avaliacoes, estadoNome }: ExportDataProps) {
  const handleDownloadCSV = () => {
    const headers = [
      "ID",
      "Eixo",
      "Componente",
      "Item",
      "Estágio",
      "Pontuação",
      "Estado",
      "Comentário",
    ];

    const rows = avaliacoes.map((item) => [
      item.id,
      item.eixo,
      item.componente,
      item.item,
      item.estagio,
      item.pontuacao,
      item.estadoUf,
      `"${item.comentario.replace(/"/g, '""')}"`,
    ]);

    const csv = [headers, ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `central-dados-${estadoNome}-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const handleDownloadJSON = () => {
    const json = JSON.stringify(
      {
        metadados: {
          estado: estadoNome,
          dataExportacao: new Date().toISOString(),
          totalRegistros: avaliacoes.length,
        },
        dados: avaliacoes,
      },
      null,
      2,
    );

    const blob = new Blob([json], {
      type: "application/json;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `central-dados-${estadoNome}-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  const handleDownloadExcel = () => {
    const escapeHtml = (value: string | number) =>
      String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const headers = ["ID", "Eixo", "Componente", "Item", "Estágio", "Pontuação", "Estado", "Comentário"];
    const headerRow = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("");
    const bodyRows = avaliacoes
      .map(
        (item) => `<tr>
          <td>${escapeHtml(item.id)}</td>
          <td>${escapeHtml(item.eixo)}</td>
          <td>${escapeHtml(item.componente)}</td>
          <td>${escapeHtml(item.item)}</td>
          <td>${escapeHtml(item.estagio)}</td>
          <td>${escapeHtml(item.pontuacao)}</td>
          <td>${escapeHtml(item.estadoUf)}</td>
          <td>${escapeHtml(item.comentario)}</td>
        </tr>`,
      )
      .join("");

    // Excel abre normalmente uma tabela HTML salva com extensão .xls — evita depender
    // de uma lib externa (o pacote "xlsx" do npm está com vulnerabilidade sem correção).
    const html = `<html><head><meta charset="UTF-8"></head><body><table border="1"><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table></body></html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `central-dados-${estadoNome}-${new Date().toISOString().split("T")[0]}.xls`;
    link.click();
  };

  const handleDownloadJSON_API = () => {
    const json = JSON.stringify(
      {
        version: "1.0",
        endpoint: "/api/avaliacao-climatica",
        timestamp: new Date().toISOString(),
        data: avaliacoes,
      },
      null,
      2,
    );

    const blob = new Blob([json], {
      type: "application/json;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `api-schema-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  return (
    <div className="rounded-2xl border border-[#e0ede1] bg-white p-6">
      <h2 className="mb-1 text-lg font-bold text-[#17301c]">Downloads dos dados</h2>
      <p className="mb-6 text-sm text-[#3f5b45]">
        Exporte os dados em diferentes formatos para análise, integração ou apresentação.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DownloadCard
          titulo="CSV bruto"
          descricao="Dados originais sem processamento, ideal para análise em ferramentas de dados."
          tamanho={`${(avaliacoes.length * 0.5).toFixed(1)} KB`}
          formato="csv"
          onDownload={handleDownloadCSV}
        />

        <DownloadCard
          titulo="Excel"
          descricao="Planilha pronta para abrir direto no Excel, sem processamento adicional."
          tamanho={`${(avaliacoes.length * 0.9).toFixed(1)} KB`}
          formato="excel"
          onDownload={handleDownloadExcel}
        />

        <DownloadCard
          titulo="JSON estruturado"
          descricao="Formato estruturado para integração com outras ferramentas."
          tamanho={`${(avaliacoes.length * 0.8).toFixed(1)} KB`}
          formato="json"
          onDownload={handleDownloadJSON}
        />

        <DownloadCard
          titulo="JSON API"
          descricao="Schema para documentação de API e integração com sistemas."
          tamanho="~5 KB"
          formato="json"
          onDownload={handleDownloadJSON_API}
        />
      </div>

      <div className="mt-6 rounded-lg bg-brand-50 p-4">
        <h3 className="text-sm font-semibold text-brand-700">Dica</h3>
        <p className="mt-1 text-sm text-brand-600">
          Escolha CSV ou Excel para usar em planilhas, JSON para integração com aplicações,
          ou JSON API para documentação técnica de integração.
        </p>
      </div>
    </div>
  );
}
