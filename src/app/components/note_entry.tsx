import DelButton from "./del_button";

export default function Entry(
    { title, content }: {
        title: string,
        content: string,
    }
) {
    return (
        <div className="bg-white rounded-lg shadow-md p-2 m-2 sm:p-3 sm:m-4 h-fit float-left">
            <h1 className="text-[0.85rem] sm:text-[1.1rem] mb-2 break-words">{title && title.length > 30 ? title.substring(0, 30) + "..." : title}</h1>
            <p className="text-[0.85rem] sm:text-[1.1rem] mb-2 sm:mb-3 whitespace-pre-wrap break-words">{content && content.length > 100 ? content.substring(0, 100) + "..." : content}</p>
            <DelButton />
        </div>
    );
}