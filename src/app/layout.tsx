import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "../components/layout/Navbar";
import "./globals.css"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white">
        <AuthProvider>
          <Navbar />
          <main className="pt-20"> 
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}