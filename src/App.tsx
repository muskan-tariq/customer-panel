import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BestSellers from './pages/BestSellers';
import BundlesAndDeals from './pages/BundlesAndDeals';
import MoisturizerPage from './pages/Moisturizer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/bundles" element={<BundlesAndDeals />} />
          <Route path="/products/moisturizer" element={<MoisturizerPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;