import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import Footer from "@/components/Footer";
import { Divider } from "@/components/ui";
import InstalacionesSection from "@/components/sections/InstalacionesSection";
import StatsSection from "@/components/sections/StatsSection";
import TorneosSection from "@/components/sections/TorneosSection";
import ExperienciaSection from "@/components/sections/ExperienciaSection";
import RankingSection from "@/components/sections/RankingSection";
import ReservasSection from "@/components/sections/ReservasSection";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#0a1628" }}>
      <Navbar />
      <HeroCanvas />
      <Divider />
      <InstalacionesSection />
      <Divider />
      <StatsSection />
      <Divider />
      <TorneosSection />
      <Divider />
      <ExperienciaSection />
      <Divider />
      <RankingSection />
      <Divider />
      <ReservasSection />
      <Footer />
    </main>
  );
}