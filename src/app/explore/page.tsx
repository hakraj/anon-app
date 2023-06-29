'use client'

import { useState } from "react";
import IntroText from "../components/intro";
import SearchArea from "../components/search_area";
import SearchResponse from "../components/search_res";
import Note from "../components/note";


export default function Search() {

  const [foundPosts, setFoundNotes] = useState([]);
  const [isFeedback, setIsFeedback] = useState(false);

  // fn to handle if query is found state 
  const found = (post: []) => {
    setFoundNotes(post)

    setIsFeedback(true)
  }

  /* The GET method adds a query entry in the mongodb database. */
  const queryData = async (query: { qtitle?: string, qcontent?: string }) => {
    try {
      const { qtitle, qcontent } = query

      const url = new URL('/api/posts/query', window.location.href);
      qtitle && url.searchParams.set('qtitle', qtitle.trim())
      qcontent && url.searchParams.set('qcontent', qcontent.trim())

      const res = await fetch(url.toString(), { cache: 'no-store' });

      if (!res.ok) {
        throw new Error('Request failed');
      }

      const data = await res.json()

      found(data.data);
    } catch (error) {
      console.log('Failed to find post')
    }
  }

  return (
    <main>
      <IntroText text="Search for posts" />
      <SearchArea queryData={queryData} />
      <SearchResponse show={isFeedback} matchNo={foundPosts ? foundPosts.length : 0} />
      <Note posts={foundPosts} />
    </main>
  );
}