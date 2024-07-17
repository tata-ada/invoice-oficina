"use client"

import '../styles/main.scss'
import { Inter } from "next/font/google";
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Orcamentos",
  description: "Sistema Orcamentos e Recibos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}
      >
      <NavBar/>
       <div className='mt-16'></div>
       {children}
       <Footer/>
        
        </body>
    </html>
  );
}