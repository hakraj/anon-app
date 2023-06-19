import CreateArea from "./components/create_area"
import Intro from "./components/intro"
import Note from "./components/note"
// import Note from "../components/Note"

// const {notes, addNote, deleteNote} = props;

export default function Home() {
  return (
    <main>
      <Intro text="Hello, Love to Share Anon?" />
      <CreateArea />
      <Note />
      {/* <Note notes={notes} onDelete={deleteNote} /> */}
    </main>
  )
}
