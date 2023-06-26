'use client'

import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Fab from "@mui/material/Fab/Fab";
import Zoom from "@mui/material/Zoom/Zoom";

export default function SearchArea(
  { queryData }: {
    queryData: (
      query: {
        qtitle: string,
        qcontent: string,
      }
    ) => Promise<void>
  }
) {

  // Query_note input form state
  const [query, setQuery] = useState({ qtitle: "", qcontent: "" });

  // fn to handle change in input and textarea [nested setQuery_note fn]
  function handleChange(event: { target: { name: any; value: any; }; }) {
    const { name, value } = event.target;

    setQuery((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });

  }

  function submitQuery(event: { preventDefault: () => void; }) {
    queryData(query).then(() => {
      setQuery({
        qtitle: "",
        qcontent: ""
      })
    })

    event.preventDefault();
  }

  return (
    <div>
      <form className="bg-white relative w-11/12 sm:w-[30rem] mx-auto my-4 p-3 rounded-lg shadow-md focus:shadow-[#f5ba13]">
        <input
          className="w-full border-none p-1 outline-none text-xl font-family-inherit resize-none"
          name="qtitle"
          onChange={handleChange}
          value={query.qtitle}
          placeholder="Find a Title"
        />
        <textarea
          className="w-full border-none p-1 outline-none text-base sm:text-xl font-family-inherit resize-none"
          name="qcontent"
          onChange={handleChange}
          value={query.qcontent}
          placeholder="Find a note..."
          rows={3}
        />
        <Zoom in={true}>
          <Fab onClick={submitQuery} className="absolute right-4 -bottom-5 bg-[#f5ba13] text-white hover:text-[#f5ba13] border-none w-9 h-9 shadow-sm cursor-pointer outline-none">
            <SearchIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
