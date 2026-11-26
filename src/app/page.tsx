import Hero from "@/components/home/Hero";
import FeaturedTattoos from "@/components/home/FeaturedTattoos";
import HomeServiceHighlight from "@/components/home/HomeServiceHighlight";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutServices from "@/components/home/AboutServices";
import ServicesPricing from "@/components/home/ServicesPricing";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedTattoos />
      <HomeServiceHighlight />
      <WhyChooseUs />
      <AboutServices />
      <ServicesPricing />
    </>
  );
}