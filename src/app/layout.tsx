import { Metadata } from 'next'
import './globals.css'
import { montserrat } from './fonts'
import AuthContext from './auth_context'

const appName = 'notify'

export const metadata: Metadata = {
  title: appName,
  description: "Introducing a revolutionary anonymous social app! 🎉📲💬 Connect with others in a whole new way, where you can express yourself freely without revealing your identity. Share thoughts, ideas, and experiences with a supportive community, all while maintaining your privacy. Whether you're seeking advice, discussing hot topics, or simply looking to connect with like-minded individuals, this app provides a safe and judgment-free space for genuine interactions. Join the conversation today and let your voice be heard. #AnonSocial #AnonymousCommunity #BeYourself",
  openGraph: {
    title: appName,
    images: [{ url: `https://og-image.vercel.app/${encodeURI(appName,)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg` }]
  },
  twitter: { card: 'summary_large_image' }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <AuthContext>
      <html lang="en" className={montserrat.className}>
        <body className="relative min-h-screen">
          {children}
        </body>
      </html>
    </AuthContext>
  )
}

