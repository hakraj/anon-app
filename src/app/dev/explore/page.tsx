'use client'

import { useState } from "react";
import { queryData } from "../../../../utils/service";
import IntroText from "../../components/main/intro";
import SearchArea from "../../components/main/search_area";
import SearchResponse from "../../components/main/search_res";
import Note from "../../components/main/note";


const Search = () => {

  const [foundNotes, setFoundNotes] = useState([]);
  const [isFeedback, setIsFeedback] = useState(false);

  const query = async (qnote: { qtitle?: string, qcontent?: string }) => {
    const matches = await queryData(qnote);
    setFoundNotes(matches);
    setIsFeedback(true);
  }

  return (
    <main>
      <IntroText text="Search for notes" />
      <SearchArea query={query} />
      <SearchResponse show={isFeedback} matchNo={foundNotes ? foundNotes.length : 0} />
      <Note notes={foundNotes} />
    </main>
  );
}

export default Search;