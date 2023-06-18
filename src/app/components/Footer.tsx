
export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="absolute bottom-0 text-center w-full">
            <p className="text-gray-300 my-6">hak_raj ⓒ {year}</p>
        </footer>
    );
};
