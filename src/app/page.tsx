import Intro from "./components/main/intro";
import CreateArea from "./components/main/create_area";
import AllNote from "./components/main/all_notes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import IsAuth from "./components/is_auth";


const Home = () => {
  return (
    <IsAuth>
      <Navbar />
      <main>
        <Intro text="Hello, Love to Share a note?" />
        <CreateArea />
        <AllNote />
      </main>
      <Footer />
    </IsAuth>
  )
}

export default Home;