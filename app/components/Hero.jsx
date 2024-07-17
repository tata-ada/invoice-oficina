"use client";
import React from 'react';
import ThemeLink from '../components/ThemeLink';
import Form from '../components/Form';

export default function Hero() {
    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <div className='w-full flex items-center justify-center lg:w-1/2'>
                <Form />
            </div>
        </div>
    );
}
