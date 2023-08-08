

const Account = (
  { notes, }: {
    notes: {
      _id: string;
      author: {
        email: string;
        name: string;
      };
      title: string;
      content: string;
      likes: [];
      comments: {}[];
    }[],
  }
) => {

  const noteScore = notes && notes.length > 0 ?
    notes.reduce((prev, current) => {
      return {
        _id: "",
        author: {
          email: "",
          name: "",
        },
        title: "",
        content: "",
        likes: [...prev.likes, ...current.likes], comments: [...prev.comments, ...current.comments]
      }
    })
    :
    { likes: [], comments: [] }


  return (
    <div className="flex justify-evenly items-center w-11/12 my-8 mx-auto lg:w-1/2 ">
      <div className="text-center px-[5%] " >
        <h1 className="text-4xl sm:text-6xl">{notes ? notes.length : 0}</h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400">notes</p>
      </div>
      <div className="text-center px-[5%] ">
        <h1 className="text-4xl sm:text-6xl">{noteScore && ((noteScore.likes.length + noteScore.comments.length) * 10)}</h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400">notescore</p>
      </div>

    </div>
  )
}

export default Account;