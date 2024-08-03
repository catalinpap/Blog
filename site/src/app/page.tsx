import Image from "next/image";
import Hero from "./components/Hero/Hero";
import Card from "./components/Card/Card";

export default function Home() {
  return (
    <main>
      <Hero />
      <article className="page-content">
        <section className="grid grid-cols-2 gap-4 main-container">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </article>
      
      
    </main>
  );
}
