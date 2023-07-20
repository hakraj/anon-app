'use client'

import Image from "next/image";

const Account = (
  { img, notes, }: {
    img: string,
    notes: {
      _id: string;
      author: {
        email: string;
        name: string;
        image: string;
      };
      title: string;
      content: string;
      likes: [];
      comments: {}[];
    }[],
  }
) => {

  const noteScore = notes.length > 0 ?
    notes.reduce((prev, current) => {
      return {
        _id: "",
        author: {
          email: "",
          name: "",
          image: "",
        },
        title: "",
        content: "",
        likes: [...prev.likes, ...current.likes], comments: [...prev.comments, ...current.comments]
      }
    })
    :
    { likes: [], comments: [] }




  return (
    <div className="flex justify-start items-center w-11/12 my-8 mx-auto lg:w-1/2 ">
      <div className="ml-[5%] mr-auto">
        <Image
          className="rounded-full shadow-md outline-none"
          src={img}
          alt="avatar-img"
          width={102}
          height={102}
        />
      </div>

      <div className="text-center px-[5%] " >
        <h1 className="text-4xl sm:text-6xl">{notes.length}</h1>
        <p className="text-xs sm:text-base">notes</p>
      </div>
      <div className="text-center px-[5%] ">
        <h1 className="text-4xl sm:text-6xl">{(noteScore.likes.length + noteScore.comments.length) * 10}</h1>
        <p className="text-xs sm:text-base">notescore</p>
      </div>

    </div>
  )
}

export default Account;