
const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="text-center w-full">
            <p className="text-gray-300 dark:text-gray-600 my-6">hak_raj ⓒ {year}</p>
        </footer>
    );
};

export default Footer;