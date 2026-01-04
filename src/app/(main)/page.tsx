import Hero from "@/components/Hero";
import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import NewArrivals from "@/components/NewArrivals";
import Bulking from "@/components/Bulking";

export default function MainPage() {
  return (
    <main>
      <Hero />
      <Banner />
      <Categories />
      <BestSellers />
      <NewArrivals />
      <Bulking />
    </main>
  );
}
