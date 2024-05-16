"use client";

import React, { useState, useEffect } from 'react';
import { FaHouseChimney } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import Loading from "@/components/Loading";

const MobileResolution = () => {
    return (
        <nav className="mobile-nav">
            <a href="#" className="bloc-icon">
                <FaHouseChimney className="mobile-icon" />
            </a>
            <a href="#" className="bloc-icon">
                <FaHeart className="mobile-icon" />
            </a>
            <a href="#" className="bloc-icon">
                <IoSettingsSharp className="mobile-icon" />
            </a>
        </nav>
    );
}

const DesktopResolution = () => {
    return (
        <div></div>
    );
}

const Header = () => {
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        let timeoutId;

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsMobile(window.innerWidth < 768);
            }, 100);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile === null ? <Loading /> : (isMobile ? <MobileResolution /> : <DesktopResolution />);
}

export default Header;
