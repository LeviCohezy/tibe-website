import About from "@/components/About";
import Collection from "@/components/Collection";
import Contact from "@/components/Contact";
import Drip from "@/components/Drip";
import GroupBanner from "@/components/GroupBanner";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Lookbook from "@/components/Lookbook";
import Marquee from "@/components/Marquee";
import Spotlight from "@/components/Spotlight";

export default function Home() {
  return (
    <>
      <Loader />
      <main>
        <Hero />
        <Marquee />
        <About />
        <GroupBanner base="/img/groups/g1" kicker="✝ De crew" title={<>Kijk naar <span className="text-blood">mijn</span> ketting.</>} alt="Vier modellen in TIBE, zilveren kettingen in de hand" />
        <Drip />
        <Spotlight />
        <Collection />
        <Marquee reverse />
        <Lookbook />
        <Drip />
        <Contact />
      </main>
    </>
  );
}
