import About from "@/components/About";
import Collection from "@/components/Collection";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Drip from "@/components/Drip";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Lookbook from "@/components/Lookbook";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Spotlight from "@/components/Spotlight";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <div className="grain" aria-hidden />
      <div className="scanlines" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
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
