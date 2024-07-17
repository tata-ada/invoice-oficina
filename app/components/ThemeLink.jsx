// ThemeLink

import Link from 'next/link';
import React from 'react';

export default function ThemeLink({ className, href, title }) {
    return (
        <Link href={href} 
        className={className}>
            {title}
        </Link>
    );
}
