import Hero from "@/components/Hero";
import Banner from "@/components/Banner";
import Image from "next/image";
import Category from "@/components/Category";
import BestSellers from "@/components/BestSellers";
import NewArrivals from "@/components/NewArrivals";
import Bulking from '../components/Bulking';

export default function Home() {
  return (
  <main>
    <Hero />
    <Banner/>
    <Category/>
    <BestSellers/>
    <NewArrivals/>
    <Bulking/>
  </main>
  );
}
