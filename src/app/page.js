import FirstSection from "./components/FirstSection";
import SearchBar from "./components/Searchbar";
import ProductGrid from "./components/ProductGrid";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import ReviewSection from "./components/ReviewSection";
export default function HomePage() {
  return (
    <div style={styles.maindiv}>
      <div className="mobile-search">
        <SearchBar />
      </div>
      <FirstSection />
      <ProductGrid />
      <AboutSection />
      <ReviewSection />
      <ContactSection />
    </div>
  );
}

const styles = {};
