'use client'
import { MouseEventHandler, useEffect, useState } from "react";
import { postData } from "../../../../utils/service";
import { useSession } from "next-auth/react";
import { getUser } from "../../../../utils/user";


const CreateArea = () => {
  // auth session
  const { data: session, status } = useSession()
  const userEmail = session?.user?.email as string;

  const [user, setUser] = useState({ email: userEmail, name: "" });

  useEffect(() => {
    if (session?.user?.name) {
      setUser({
        email: session?.user?.email as string,
        name: session?.user?.name as string,
      })
    } else {
      // Fetch the current user 
      const fetchUser = async () => {
        const res = await getUser({ email: userEmail })
        setUser(res.data)
      }
      fetchUser();
    }
  }, [session?.user?.email, session?.user?.name, userEmail]);

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

  //fn to ubmit and create new note
  const submitNote: MouseEventHandler<HTMLButtonElement> = (event) => {

    postData({ author: user, note: note }).then(() => {
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
            maxLength={60}
          />
        )}
        <textarea
          className="dark:bg-slate-700 w-full border-none p-1 outline-none text-base sm:text-xl font-family-inherit resize-none"
          onFocus={handleClick}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Make a note..."
          rows={isExpand ? 3 : 1}
          maxLength={2450}
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