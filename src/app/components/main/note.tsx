import Entry from "./note_entry";

const Note = (
  { notes }
    :
    {
      notes: {
        _id: string,
        author: { email: string, name: string }
        title: string,
        content: string,
        likes: [],
        comments: {}[]
      }[]
    }
) => {
  return (
    <div className="m-auto my-8 w-11/12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
      {
        notes
        &&
        notes.map((note) => {
          return (
            <Entry
              key={note._id}
              id={note._id}
              name={note.author.name}
              title={note.title}
              content={note.content}
              likes={note.likes}
              comments={note.comments}
            />
          )
        })
      }
    </div>
  )
}

export default Note;
