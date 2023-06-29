
export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="text-center w-full">
            <p className="text-gray-300 my-6">hak_raj ⓒ {year}</p>
        </footer>
    );
};
