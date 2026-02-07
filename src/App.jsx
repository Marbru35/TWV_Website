import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import ContactTeaser from "./components/home/ContactTeaser";

export default function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Categories />
        <ContactTeaser />
      </main>
      <Footer />
    </div>
  );
}
