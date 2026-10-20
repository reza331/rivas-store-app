import PageControl from "@/components/page-control";
import ProductsSection from "@/features/home/components/products";
import SearchBar from "@/features/home/components/search-bar";

export default function Home() {

  return (
    <div className="bg-A pt-20 container mx-auto px-10">
      <div className="flex items-center gap-5">
        <div className="w-full">
          <SearchBar />
        </div>
        <PageControl />
      </div>
      <ProductsSection />
    </div>
  );

}
