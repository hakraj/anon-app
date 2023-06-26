import Entry from "./note_entry";

export default function Note({ posts }: { posts: { _id: string, title: string, content: string }[] }) {
    return (
        <div className="m-auto bm-[10vh] w-11/12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {
                posts.map((post) => {
                    return (
                        <Entry
                            key={post._id}
                            // id={post._id} for onDelete action
                            title={post.title}
                            content={post.content}
                        />
                    )
                })
            }
        </div>
    )


}
