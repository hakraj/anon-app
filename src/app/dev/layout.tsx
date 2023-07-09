import Footer from "../components/Footer"
import Header from "../components/Navbar"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}