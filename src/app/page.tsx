import CreateArea from "./components/create_area";
import AllNote from "./components/all_notes";
import Intro from "./components/intro";


export default function Home() {
  return (
    <main>
      <Intro text="Hello, Love to Share Anon?" />
      <CreateArea />
      <AllNote />
    </main>
  )
}
