'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Content from "./dropdown_content";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";



const Dropdown = () => {
  const router = useRouter();

  const [dropdown, setDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

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
  async function logout() {
    await signOut();
    router.push('/auth/login');
  }

  const links = [
    { dir: "/", name: "Home" },
    { dir: "/dev/explore", name: "Explore" },
    { dir: "/dev/user", name: "Account" },
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
          {dropdown && <Content links={links} onToggle={hideMenu} logout={logout} />}
        </div>
      ) : (
        <div className="text-white text-sm font-light space-x-8 mr-12">
          {links.map(({ dir, name }, index) => {
            return (
              <Link className="hover:text-gray-200" key={index} href={dir} >{name}</Link>
            );
          })}
          <button onClick={() => logout()} className='text-xs font-light text-white bg-red-400 border border-red-500 py-2 px-4 rounded-lg  hover:bg-transparent hover:text-red-500'>
            <svg className=" inline w-4 h-4 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
            Log out
          </button>
        </div>
      )}

    </>


  )
}

export default Dropdown;