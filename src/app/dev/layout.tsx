import Footer from "../components/Footer"
import Header from "../components/Navbar"
import IsAuth from "../components/is_auth"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <IsAuth>
            <Header />
            {children}
            <Footer />
        </IsAuth>
    )
}