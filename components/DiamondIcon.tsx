import React from 'react';

const DiamondIcon: React.FC = () => (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#f9a8d4', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#db2777', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path d="M12 2L2 8.5L12 22L22 8.5L12 2Z" fill="url(#diamondGradient)" fillOpacity="0.2" stroke="url(#diamondGradient)" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M2 8.5L12 12L22 8.5" stroke="url(#diamondGradient)" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M12 22V12" stroke="url(#diamondGradient)" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M5.5 10.25L2 8.5L12 12" stroke="url(#diamondGradient)" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M18.5 10.25L22 8.5L12 12" stroke="url(#diamondGradient)" strokeWidth="1" strokeLinejoin="round"/>
    </svg>
);

export default DiamondIcon;
