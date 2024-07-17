import React from "react";

export default function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow-md m-4">
            <div className="max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex flex-col items-center justify-center">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 mb-1">
                        <img src="/logo3.png" className="h-8" alt="Logo da Oficina do Alumínio" />
                        <span className="text-xl font-semibold">Oficina do Alumínio</span>
                    </a>
                    <ul className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-gray-500 mt-4">
                        {/* Se houver itens para listar, adicione aqui */}
                    </ul>
                </div>
                <hr className="my-2 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 text-center">© 2024 <a href="https://flowbite.com/" className="hover:underline">Oficina do Aluminínio™</a>. Todos os direitos reservados.</span>
            </div>
        </footer>
    );
}
