import Intro from "./components/intro";
import CreateArea from "./components/create_area";
import AllNote from "./components/all_notes";


const Home = () => {
  return (
    <main>
      <Intro text="Hello, Love to Share Anon?" />
      <CreateArea />
      <AllNote />
    </main>
  )
}

export default Home;