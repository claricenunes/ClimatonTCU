import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../icons/logo.png";
import { IconX, IconChevronRight, IconArrowLeft } from "../../lib/icons";

interface OpcaoNavegacao {
  label: string;
  to: string;
}

interface PerguntaComResposta {
  type: "resposta";
  question: string;
  answer: string;
}

interface PerguntaComOpcoes {
  type: "opcoes";
  question: string;
  opcoes: OpcaoNavegacao[];
}

type CannedQuestion = PerguntaComResposta | PerguntaComOpcoes;

const QUESTIONS: CannedQuestion[] = [
  {
    type: "resposta",
    question: "Como funciona o mapa?",
    answer:
      "Clique em um estado colorido no mapa, selecione na caixa ao lado ou escolha na lista — os três caminhos levam ao mesmo lugar e mostram os indicadores daquele estado.",
  },
  {
    type: "resposta",
    question: "O que significam as cores do mapa?",
    answer: "Verde é situação normal, amarelo é atenção, laranja é alerta e vermelho é emergência.",
  },
  {
    type: "resposta",
    question: "Quais estados a plataforma cobre?",
    answer: "O ClimAqui acompanha os 26 estados e o Distrito Federal, com indicadores atualizados regularmente.",
  },
  {
    type: "resposta",
    question: "Como faço um relato da minha região?",
    answer: "Acesse a página Relatos e clique em \"Fazer um relato\" para compartilhar o que está acontecendo perto de você.",
  },
  {
    type: "resposta",
    question: "Os dados exibidos são reais?",
    answer:
      "Não. Este protótipo usa dados simulados para fins de demonstração, preparado para uma futura integração com bases oficiais.",
  },
  {
    type: "opcoes",
    question: "Qual seu nível de conhecimento em gráficos?",
    opcoes: [
      { label: "Nenhum", to: "/noticias" },
      { label: "Básico", to: "/" },
      { label: "Avançado", to: "/central-dados" },
    ],
  },
];

export function AiHelperWidget() {
  const navigate = useNavigate();
  const [showTeaser, setShowTeaser] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<CannedQuestion | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteractedRef.current) setShowTeaser(true);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>("button, [href]");
    firstFocusable?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function openPanel() {
    hasInteractedRef.current = true;
    setShowTeaser(false);
    setOpen(true);
  }

  function closePanel() {
    setOpen(false);
    setActiveQuestion(null);
  }

  function handleOpcaoClick(to: string) {
    closePanel();
    navigate(to);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {showTeaser && !open && (
        <div className="relative w-64 animate-scale-in rounded-2xl bg-white p-4 pr-9 shadow-elevated sm:w-72">
          <button
            onClick={() => {
              hasInteractedRef.current = true;
              setShowTeaser(false);
            }}
            aria-label="Fechar mensagem"
            className="absolute right-2.5 top-2.5 flex size-6 items-center justify-center rounded-full bg-ink-100 text-ink-600 hover:bg-ink-150"
          >
            <IconX className="size-3.5" />
          </button>
          <button onClick={openPanel} className="text-left text-[15px] font-bold leading-snug text-ink-900">
            Oi! Você tem alguma dúvida?
          </button>
        </div>
      )}

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Assistente do ClimAqui"
          className="w-72 animate-scale-in overflow-hidden rounded-2xl bg-white shadow-elevated sm:w-80"
        >
          <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={logo} alt="" className="size-6" />
              <p className="text-sm font-bold text-ink-900">Assistente ClimAqui</p>
            </div>
            <button
              onClick={closePanel}
              aria-label="Fechar assistente"
              className="flex size-7 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-800"
            >
              <IconX className="size-4" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto p-4">
            {activeQuestion ? (
              <>
                <button
                  onClick={() => setActiveQuestion(null)}
                  className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
                >
                  <IconArrowLeft className="size-3.5" /> Voltar
                </button>
                <p className="mb-2 text-sm font-bold text-ink-900">{activeQuestion.question}</p>
                {activeQuestion.type === "resposta" ? (
                  <p className="text-sm leading-relaxed text-ink-600">{activeQuestion.answer}</p>
                ) : (
                  <ul className="space-y-1.5">
                    {activeQuestion.opcoes.map((opcao) => (
                      <li key={opcao.label}>
                        <button
                          onClick={() => handleOpcaoClick(opcao.to)}
                          className="flex w-full items-center justify-between gap-2 rounded-lg border border-ink-150 px-3 py-2.5 text-left text-sm font-medium text-ink-800 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                        >
                          {opcao.label}
                          <IconChevronRight className="size-4 shrink-0 text-ink-400" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                <p className="mb-3 text-sm text-ink-600">Oi! Você tem alguma dúvida? Escolha uma pergunta:</p>
                <ul className="space-y-1.5">
                  {QUESTIONS.map((q) => (
                    <li key={q.question}>
                      <button
                        onClick={() => setActiveQuestion(q)}
                        className="flex w-full items-center justify-between gap-2 rounded-lg border border-ink-150 px-3 py-2.5 text-left text-sm font-medium text-ink-800 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                      >
                        {q.question}
                        <IconChevronRight className="size-4 shrink-0 text-ink-400" />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        onClick={() => (open ? closePanel() : openPanel())}
        aria-expanded={open}
        aria-label={open ? "Fechar assistente virtual" : "Abrir assistente virtual"}
        className="flex size-20 shrink-0 items-center justify-center rounded-full border-[3px] border-brand-600 bg-white shadow-elevated transition-transform hover:scale-105 active:scale-95 sm:size-24"
      >
        <img src={logo} alt="" className="size-14 sm:size-16" />
      </button>
    </div>
  );
}
