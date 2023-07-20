import Intro from "./components/intro";
import CreateArea from "./components/create_area";
import AllNote from "./components/all_notes";
import Footer from "./components/Footer";
import Header from "./components/Navbar";


const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Intro text="Hello, Love to Share Anon?" />
        <CreateArea />
        <AllNote />
      </main>
      <Footer />
    </>
  )
}

export default Home;