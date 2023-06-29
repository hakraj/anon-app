'use client'

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab/Fab";
import Zoom from "@mui/material/Zoom/Zoom";
import { useState } from "react";


export default function CreateArea() {

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
  const postData = async (post: { title: string, content: string, }) => {

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
      <form className="bg-white relative w-11/12 sm:w-[30rem] mx-auto my-4 p-3 rounded-lg shadow-md focus:shadow-[#f5ba13]">
        {isExpand && (
          <input
            className="w-full border-none p-1 outline-none text-xl font-family-inherit resize-none"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          className="w-full border-none p-1 outline-none text-base sm:text-xl font-family-inherit resize-none"
          onFocus={handleClick}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Make a post..."
          rows={isExpand ? 3 : 1}
        />
        <Zoom in={isExpand}>
          <Fab onClick={submitNote} className="absolute right-4 -bottom-5 bg-[#f5ba13] text-white hover:text-[#f5ba13] border-none w-9 h-9 shadow-sm cursor-pointer outline-none">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
