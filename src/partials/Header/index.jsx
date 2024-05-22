"use client";

import React, { useState, useEffect } from 'react';
import { FaHouseChimney } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import Loading from "@/components/Loading";
import { InputGroup, Form, Container } from "react-bootstrap";

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
        <nav className='p-3'>
            <Container>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        type="search"
                    />
                </InputGroup>
            </Container>
        </nav>
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
