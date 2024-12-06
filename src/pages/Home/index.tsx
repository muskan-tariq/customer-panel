import BestSellers from '../../components/BestSellers';
import ProductCategories from '../../components/ProductCategories';
import BundlesAndDeals from '../../components/BundlesAndDeals';
import Hero from '../../components/Hero';
import BrandStatement from '../../components/BrandStatement';
import Testimonials from '../../components/Testimonials';
import PromotionalBanner from '../../components/PromotionalBanner';

const Home = () => {
  return (
    <main className="flex-grow">
      <Hero />
      <BrandStatement />
      <BestSellers />
      <ProductCategories />
      <PromotionalBanner />
      <BundlesAndDeals />
      <Testimonials />
    </main>
  );
};

export default Home; 