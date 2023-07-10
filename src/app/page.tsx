import Intro from "./components/intro";
import CreateArea from "./components/create_area";
import AllNote from "./components/all_notes";
import Footer from "./components/Footer";
import Header from "./components/Navbar";
import IsAuth from "./components/is_auth";


const Home = () => {
  return (
    <IsAuth>
      <Header />
      <main>
        <Intro text="Hello, Love to Share Anon?" />
        <CreateArea />
        <AllNote />
      </main>
      <Footer />
    </IsAuth>

  )
}

export default Home;