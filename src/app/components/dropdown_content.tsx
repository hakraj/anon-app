import Image from 'next/image';
import Link from 'next/link';
import { monofett } from '../fonts';

const Content = (
    { onToggle, links }:
        {
            onToggle: () => void,
            links: {
                dir: string,
                name: string
            }[]
        }
) => {

    return (
        <div className="absolute top-0 right-0 z-[1051] bg-[#f5ba13] min-h-screen w-full bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]">
            <header className=" flex justify-between items-center bg-[#f5ba13] py-4 px-8 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] ">
                <h1 className={` text-white text-4xl ${monofett.className}`} >
                    Anon
                </h1>
                <Image
                    onClick={() => onToggle()}
                    className="dropdown-menu"
                    src="/icon-close.svg"
                    alt="close-menu-icon"
                    width={20}
                    height={20}
                />
            </header>
            <div>
                {links.map(({ dir, name }, index) => {
                    return (
                        <h1 key={index} className="text-white text-center my-10 text-3xl">
                            <Link onClick={() => onToggle()} href={dir}>{name}</Link>
                        </h1>
                    );
                })}
            </div>
        </div>
    );
}

export default Content;