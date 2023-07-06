'use client'
import { useState } from "react";


const CreateArea = () => {

  // state to expand the create_area
  const [isExpand, setIsExpand] = useState(false);

  // note input form state
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  // fn to handle the isExpand
  function handleClick() {
    setIsExpand(true);
  }

  // fn to handle change in input and textarea [nested setnote fn]
  function handleChange(event: { target: { name: any; value: any; }; }) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });

  }

  /* The POST method adds a new entry in the mongodb database. */
  async function postData(post: { title: string, content: string, }) {

    const contentType = 'application/json'

    try {
      const res: Response = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(post),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString())
      }

      const data = await res.json()

      console.log(data);

    } catch (error) {
      postMessage('Failed to add post')
    }
  }

  function submitNote(event: { preventDefault: () => void; }) {
    postData(note).then(() => {
      setNote({
        title: "",
        content: ""
      })
    })

    event.preventDefault();
  }


  return (
    <div>
      <form className="bg-white dark:bg-slate-700 relative w-11/12 sm:w-[30rem] mx-auto my-4 p-3 rounded-lg shadow-md focus:shadow-[#f5ba13]">
        {isExpand && (
          <input
            className="dark:bg-slate-700 w-full border-none p-1 outline-none text-xl font-family-inherit resize-none"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          className="dark:bg-slate-700 w-full border-none p-1 outline-none text-base sm:text-xl font-family-inherit resize-none"
          onFocus={handleClick}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Make a post..."
          rows={isExpand ? 3 : 1}
        />
        {isExpand &&
          <button onClick={submitNote} className=" flex justify-center items-center absolute right-4 -bottom-4 bg-[#f5ba13] text-white hover:text-[#f5ba13] hover:bg-[#eee] border-none w-8 h-8 shadow-sm cursor-pointer outline-none rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
          </button>}
      </form>
    </div>
  );
}

export default CreateArea;