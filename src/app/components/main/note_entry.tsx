import { useState, MouseEventHandler, useEffect } from "react";
import { useRouter } from "next/navigation";
import { putData } from "../../../../utils/service";
import { useSession } from "next-auth/react";
import { getUser } from "../../../../utils/user";

export default function Entry(
  { id, name, title, content, likes, comments }: {
    id: string,
    name: string,
    title: string,
    content: string,
    likes: string[],
    comments: {}[],
  }
) {
  const router = useRouter();
  const { data: session, status } = useSession()
  const userEmail = session?.user?.email as string;

  const [currentUser, setCurrentUser] = useState("");

  const [like, setLike] = useState(likes)
  const [isLiked, setLiked] = useState(false)

  useEffect(() => {
    if (session?.user?.name) {
      setCurrentUser(session?.user?.name as string)
    } else {
      // Fetch the current user 
      const fetchUser = async () => {
        const res = await getUser({ email: userEmail })
        setCurrentUser(res.data.name)
      }
      fetchUser();
    }

    // Fetch the user like status
    if (status === "authenticated") {
      const showLike = likes.includes(currentUser)

      setLiked(showLike);
    }

  }, [currentUser, likes, session?.user?.name, status, userEmail]);



  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    router.push(`/dev/${id}`)
  }

  const handleLike: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();

    if (!isLiked) {
      setLiked(true)
      like.push(currentUser);
      setLike(like)
      putData({ id, likes: like })
    } else {
      setLiked(false)
      const newlikes = likes.filter(val => val !== currentUser);
      setLike(newlikes)
      putData({ id, likes: newlikes })
    }

  }

  const handleComment: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();

    router.push(`/dev/${id}#comment`)
  }



  return (
    <div onClick={handleClick} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-2 sm:p-3 m-2 sm:m-4 h-fit float-left">

      <h1 className=" dark:text-white text-[1rem] sm:text-[1.2rem] my-2 break-words">{title && title.length > 30 ? title.substring(0, 30) + " ..." : title}</h1>
      <p className="text-slate-600 dark:text-slate-400 text-[0.85rem] sm:text-[1.1rem] mb-2 sm:mb-3 whitespace-pre-wrap break-words">{content && content.length > 100 ? content.substring(0, 100) + " ..." : content}</p>

      <p className="text-right text-xs text-slate-500">~ {name}</p>

      <div className=" flex justify-between items-center my-1">
        <div className="flex justify-around items-center w-2/5 sm:w-1/3 ">
          <p className="text-[0.5rem]">{(likes.length !== 0) && likes.length}</p>
          {isLiked ?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-600 dark:text-red-400" onClick={handleLike}>
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600 dark:text-red-400" onClick={handleLike}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          }
          <p className="text-[0.5rem]">{(comments.length !== 0) && comments.length}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#f5ba13]" onClick={handleComment}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>

        </div>
      </div>
    </div>
  );
}