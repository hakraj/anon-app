'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


const Edit = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the latest posts data from the server
      const response = await fetch(`/api/posts/${params.id}`);
      const data = await response.json();
      const postInfo = { title: data.data.title, content: data.data.content }
      setPost(postInfo);

    };

    // Fetch the initial posts data
    fetchData();

  }, [params.id]);

  // fn to handle change in input and textarea [nested setnote fn]
  function handleChange(event: { target: { name: any; value: any; }; }) {
    const { name, value } = event.target;

    setPost((prevPost) => {
      return {
        ...prevPost,
        [name]: value
      };
    });
  }

  /* The PUT method adds a new entry in the mongodb database. */
  const putData = async (post: { title: string, content: string, }) => {

    const contentType = 'application/json'

    try {
      const res: Response = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
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

  function submitPost(event: { preventDefault: () => void; }) {
    console.log(post);

    putData(post).then(() => {
      setPost({
        title: "",
        content: ""
      })
    })

    event.preventDefault();

    router.push(`/${params.id}`)
  }



  return (
    <main>
      <div className="container flex justify-center items-center">
        <div className="w-11/12 sm:w-3/4 p-4 sm:p-8">

          <div className='flex items-center justify-between m-1'>
            <h1 className="text-2xl">Edit Post</h1>
            <svg className='w-5 h-5 fill-current text-[#f5ba13]' xmlns="http://www.w3.org/2000/svg" onClick={() => router.back()}>
              <path d="M17.778.808l1.414 1.414L11.414 10l7.778 7.778-1.414 1.414L10 11.414l-7.778 7.778-1.414-1.414L8.586 10 .808 2.222 2.222.808 10 8.586 17.778.808z" fill-rule="evenodd" />
            </svg>
          </div>

          <hr className="mb-8 border-slate-300 dark:border-slate-500" />

          <form>
            <div className="my-4">
              <label htmlFor="postTitle">Title</label>
              <input className="dark:bg-slate-700 w-full border border-slate-300 dark:border-slate-500 focus:border-[#f5ba13] rounded-lg mt-1 p-1.5 outline-none text-xl font-family-inherit resize-none"
                onChange={handleChange}
                type="text"
                name="title"
                id="postTitle"
                required
                value={post.title}
              />
            </div>
            <div className="my-4">
              <label htmlFor="postContent">Content</label>
              <textarea className="dark:bg-slate-700 w-full border border-slate-300 dark:border-slate-500 focus:border-[#f5ba13] rounded-lg mt-1 p-1.5 outline-none text-base sm:text-xl font-family-inherit resize-none "
                onChange={handleChange}
                name="content"
                id="postContent"
                rows={7}
                required
                value={post.content}
              />
            </div>
            <button onClick={submitPost} className="hover:bg-white p-1 px-2 hover:text-[#f5ba13] border-[#f5ba13] border rounded-lg text-white bg-[#f5ba13]">Done</button>
          </form>


        </div>
      </div>
    </main>

  )
}

export default Edit;