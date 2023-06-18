'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Content from "./dropdown_content";
import Link from "next/link";


const Dropdown = () => {
    const [dropdown, setDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 641px)');

        const handleResize = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(event.matches);
        };

        // Initial check on component mount
        handleResize(mediaQuery);

        // Listen for changes in the media query
        mediaQuery.addEventListener('change', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    function toggleMenu() {
        setDropdown(!dropdown);
    }

    function hideMenu() {
        setDropdown(false);
    }

    const links = [
        { dir: "/", name: "Home" },
        { dir: "/search", name: "Search" },
        { dir: "/user", name: "Account" },
        { dir: "/settings", name: "Settings" },
        { dir: "/about", name: "About" }
    ]

    return (
        <>
            {isMobile ? (
                <div>
                    <Image
                        onClick={toggleMenu}
                        src="/icon-hamburger.svg"
                        alt="menu-icon"
                        width={24}
                        height={16}
                    />
                    {dropdown && <Content links={links} onToggle={hideMenu} />}
                </div>
            ) : (
                <div className="text-white text-sm font-extralight space-x-6 mr-12">
                    {links.map(({ dir, name }, index) => {
                        return (
                            <Link className="hover:text-gray-200" key={index} href={dir} >{name}</Link>
                        );
                    })}
                </div>
            )}

        </>


    )
}

export default Dropdown;