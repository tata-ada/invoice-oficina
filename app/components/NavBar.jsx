"use client"
import { useState, useEffect } from 'react';
import { BiMenu } from 'react-icons/bi';
import Link from 'next/link';
import ThemeLink from './ThemeLink';
import { AiOutlineClose } from 'react-icons/ai';

export default function NavBar() {
    const [show, setShow] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className={`bg-gray-700 fixed top-0 right-0 left-0 h-14 flex items-center justify-between px-16 text-white transition-transform duration-300 ${scrolled ? '-translate-y-14' : 'translate-y-0'}`}>
                <Link href="/" className="text-xl font-bold font-sanfrancisco">Orcamentos</Link>
                <nav className="hidden sm:flex items-center gap-3">
                    {/* Adicione links de navegação aqui se necessário */}
                    
                </nav>
            </header>
        </>
    );
}

