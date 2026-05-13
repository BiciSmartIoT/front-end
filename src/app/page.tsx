
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Feature";
import Footer from "../components/landing/Footer";
import Contact from "../components/landing/Contact";
import WhyUs from "../components/landing/WhyUs";
import PricingPage from "../components/landing/Plans";
import InfoPage from "../components/landing/InfoPage";
import FaqPage from "../components/landing/FqaPage";

export default function Home() {
  return (
    <main className="w-full bg-black"> 
  
        <Hero />
         <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Features />
        <WhyUs/>
        <InfoPage/>
 
       </div>
       <PricingPage/>
         <FaqPage/>
      <Contact/>
      <Footer />
     
    </main>
  );
}