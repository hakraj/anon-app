import Entry from "./note_entry";

const Note = (
    { posts }
        :
        {
            posts: {
                _id: string,
                title: string,
                content: string
            }[]
        }
) => {
    return (
        <div className="m-auto my-8 w-11/12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {
                posts
                &&
                posts.map((post) => {
                    return (
                        <Entry
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            content={post.content}
                        />
                    )
                })
            }
        </div>
    )
}

export default Note;
