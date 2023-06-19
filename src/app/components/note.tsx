import Entry from "./note_entry";

const notes = [
    {
        title: "React.js",
        content: `A js library for building user interfaces
        ~uses componenets to make repetitive element
        ~cleaner and modular code
        ~combining html,css,js
        ~ incredibly interactive UI components`
    },
    { title: "CodeSandBox", content: "The Online Code Editor For React" },
    { title: "CodeSandBox", content: "The Online Code Editor For React" },
    { title: "Baluu", content: "Let's f* go" }
]



export default function Note() {

    return (
        <div className="m-auto bm-20 w-11/12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {notes.map((noteItem, index) => {
                return (
                    <Entry
                        key={index}
                        // id={index} for onDelete action
                        title={noteItem.title}
                        content={noteItem.content}
                    />
                );
            })}
        </div>
    )


}

