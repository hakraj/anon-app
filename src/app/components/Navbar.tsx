import Logo from "./logo";
import Features from "./dropdown";


const Header = () => {
    return (
        <header className=" flex justify-between items-center bg-[#f5ba13] py-4 mb-8 px-8 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] ">
            <Logo color={"white"} />
            <Features />
        </header>
    );
};

export default Header;