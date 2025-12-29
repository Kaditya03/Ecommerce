import Hero from "@/components/Hero";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import BestSellers from "@/components/BestSellers";
import NewArrivals from "@/components/NewArrivals";
import Bulking from "@/components/Bulking";

export default function MainPage() {
  return (
    <main>
      <Hero />
      <Banner />
      <Category />
      <BestSellers />
      <NewArrivals />
      <Bulking />
    </main>
  );
}
