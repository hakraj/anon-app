import { monofett } from "../fonts";
import Features from "./dropdown";


export default function Header() {
    return (
        <header className=" flex justify-between items-center bg-[#f5ba13] py-4 mb-8 px-8 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] ">
            <h1 className={` text-white text-4xl ${monofett.className}`} >
                Anon
            </h1>
            <Features />
        </header>
    );
};
