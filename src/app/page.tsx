import ProductsSection from "@/features/home/components/products";
import SearchBar from "@/features/home/components/search-bar";

export default function Home() {

  return (
    <div className="bg-A pt-20 container mx-auto px-10">
      <div>
        <SearchBar />
      </div>
      <ProductsSection />
    </div>
  );
  
}
