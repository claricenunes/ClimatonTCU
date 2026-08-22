import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { IntroAnimation } from "./components/intro/IntroAnimation";
import { AiHelperWidget } from "./components/ai/AiHelperWidget";
import { AccessibilityWidget } from "./components/accessibility/AccessibilityWidget";
import Home from "./pages/Home";
import MunicipioDetalhe from "./pages/MunicipioDetalhe";
import Noticias from "./pages/Noticias";
import NoticiaDetalhe from "./pages/NoticiaDetalhe";
import Comunidade from "./pages/Comunidade";
import Educacao from "./pages/Educacao";
import EducacaoDetalhe from "./pages/EducacaoDetalhe";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f9f4]">
      <IntroAnimation />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/municipio/:id" element={<MunicipioDetalhe />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:id" element={<NoticiaDetalhe />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/educacao" element={<Educacao />} />
          <Route path="/educacao/:id" element={<EducacaoDetalhe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <AccessibilityWidget />
      <AiHelperWidget />
    </div>
  );
}
