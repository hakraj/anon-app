'use client'

import { useState } from "react";
import IntroText from "../../components/intro";
import SearchArea from "../../components/search_area";
import SearchResponse from "../../components/search_res";
import Note from "../../components/note";


const Search = () => {

  const [foundPosts, setFoundNotes] = useState([]);
  const [isFeedback, setIsFeedback] = useState(false);

  /* The GET method finds a query entry in the mongodb database. */
  async function queryData(query: { qtitle?: string, qcontent?: string }) {
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

      console.log(data);


      if (data.success) {
        setFoundNotes(data.data)

        setIsFeedback(true)
      }
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

export default Search;