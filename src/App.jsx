import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import CustomCursor from "./components/CustomCursor";
import RandomDots from "./components/RandomDots";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import About from "./pages/About";
import { SoundProvider } from "./hooks/useSoundEffects";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProjectDetails from "./pages/ProjectDetails";

const App = () => {
  return (
    <SoundProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
        >
          <RandomDots count={200} />
        </div>
        <CustomCursor />
        <div className="relative min-h-screen text-main-text transition-colors duration-300 flex flex-col">
          <main id="main-content" className="grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
            </Routes>
          </main>
          <Footer />
          <Header />
        </div>
      </BrowserRouter>
    </SoundProvider>
  );
};

export default App;
