import { title } from 'process';
import React, { FC } from 'react';

interface HeroProps {
    title: string;
    content: string;
    backgroundImage: string;
}

const Hero: FC<HeroProps> = ({ title, content, backgroundImage }) => {
    return (<div className="hero min-h-screen" style={{ backgroundImage:` url(${backgroundImage})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                <p className="mb-5">{content}</p>
            </div>
        </div>
    </div>)
}

export default Hero;