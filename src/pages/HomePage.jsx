import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

import Hero from "../components/home/Hero.jsx";
import Categories from "../components/home/Categories.jsx";
import ContactTeaser from "../components/home/ContactTeaser.jsx";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <ContactTeaser />
      </main>
      <Footer />
    </>
  );
}
