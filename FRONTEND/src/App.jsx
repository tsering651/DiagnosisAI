import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import BackgroundVideo from './components/BackgroundVideo.jsx';
import DiagnosisForm from './components/diagnosisForm.jsx';
import Contact from './components/Contact.jsx';
import Devloper from './components/devloper.jsx';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative bg-transparent text-white">
        <BackgroundVideo /> {/* Fixed video behind everything */}

        {/* Header always visible */}
        <Header />

        {/* Routing for pages */}
        <main className="z-10 relative space-y-16">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="pt-24 px-6">
                    <h1 className="text-5xl font-bold text-center">Welcome to Diagnosis AI</h1>
                    <p className="text-lg max-w-2xl mx-auto mt-4 text-center">
                      Empowering healthcare professionals with AI-driven diagnosis tools for faster, more accurate results.
                    </p>
                  </section>

                  <DiagnosisForm />
                </>
              }
            />
            <Route path="/about" element={<Devloper />} />
            
            <Route path="/contact" element={<Contact />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>

        {/* Footer always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
