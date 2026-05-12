// src/app/page.tsx
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Feature";
import Footer from "../components/landing/Footer";
import Contact from "../components/landing/Contact";
import WhyUs from "../components/landing/WhyUs";

export default function Home() {
  return (
    <main className="w-full bg-black"> 
    
       
        <Hero />
         <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <WhyUs/>
        <Features /> 
       </div>
      <Contact/>
      <Footer />
     
    </main>
  );
}