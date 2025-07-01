import dynamic from "next/dynamic";
import FirstSection from "./components/FirstSection";
import SearchBar from "./components/Searchbar";
const ProductGrid = dynamic(() => import("./components/ProductGrid"), {
  loading: () => <p>Loading...</p>,
});
const AboutSection = dynamic(() => import("./components/AboutSection"), {
  loading: () => <p>Loading...</p>,
});
const ContactSection = dynamic(() => import("./components/ContactSection"), {
  loading: () => <p>Loading...</p>,
});
const ReviewSection = dynamic(() => import("./components/ReviewSection"), {
  loading: () => <p>Loading...</p>,
});

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
