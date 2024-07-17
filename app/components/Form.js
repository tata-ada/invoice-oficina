import React from 'react';
import ThemeLink from './ThemeLink';

export default function Form() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md m-4 text-xl text-center">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg mx-auto" src="logo3.png" alt="Bonnie image" />
            <h1 className="text-2xl font-sanfrancisco font-semibold">Sistema de Orçamento</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Bem-vindo!</p>
            {/* Seu formulário continua aqui */}
            <div className='mt-8 flex flex-col gap-y-4'>
                <ThemeLink
                    className='py-3 px-6 rounded-xl bg-gray-700 text-white text-lg font-sanfrancisco font-bold hover:bg-gray-800 text-center border-2 border-gray-700'
                    title="Entrar"
                    href="/invoice/new"
                >
                    Entrar
                </ThemeLink>
            </div>
        </div>
    );
}
