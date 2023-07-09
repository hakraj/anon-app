'use client'
import { useState } from "react";

const SearchArea = (
  { queryData }: {
    queryData: (
      query: {
        qtitle: string,
        qcontent: string,
      }
    ) => Promise<void>
  }
) => {

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
      <form className="bg-white dark:bg-slate-700 relative w-11/12 sm:w-[30rem] mx-auto my-4 p-3 rounded-lg shadow-md focus:shadow-[#f5ba13]">
        <input
          className="dark:bg-slate-700 w-full border-none p-1 outline-none text-xl font-family-inherit resize-none"
          name="qtitle"
          onChange={handleChange}
          value={query.qtitle}
          placeholder="Find a Title"
        />
        <textarea
          className="dark:bg-slate-700 w-full border-none p-1 outline-none text-base sm:text-xl font-family-inherit resize-none"
          name="qcontent"
          onChange={handleChange}
          value={query.qcontent}
          placeholder="Find a post..."
          rows={3}
        />
        <button onClick={submitQuery} className=" flex justify-center items-center absolute right-4 -bottom-4 bg-[#f5ba13] text-white hover:text-[#f5ba13] hover:bg-[#eee] border-none w-8 h-8 shadow-sm cursor-pointer outline-none rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SearchArea;