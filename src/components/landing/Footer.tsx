export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest max-w-[200px] text-center md:text-left">
            © 2026 VELOCITY PERFORMANCE RENTALS. ENGINEERED FOR SPEED.
          </p>
        </div>
        
        <div className="flex gap-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
          <a href="#" className="hover:text-primary">Fleet</a>
          <a href="#" className="hover:text-primary">Contact</a>
        </div>
      </div>
    </footer>
  );
}