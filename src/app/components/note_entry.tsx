import DelButton from "./del_button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Entry(
    { id, title, content }: {
        id: string,
        title: string,
        content: string,
    }
) {
    const router = useRouter();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 641px)');

        const handleResize = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(event.matches);
        };

        // Initial check on component mount
        handleResize(mediaQuery);

        // Listen for changes in the media query
        mediaQuery.addEventListener('change', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    function handleClick() {
        router.push(`/${id}`)
    }


    return (
        <div onClick={handleClick} className="bg-white rounded-lg shadow-md p-2 sm:p-3 m-2 sm:m-4 h-fit w-full float-left">
            <h1 className="text-[0.85rem] sm:text-[1.1rem] mb-2 break-words">{title && title.length > 30 ? title.substring(0, 30) + "..." : title}</h1>
            <p className="text-[0.85rem] sm:text-[1.1rem] mb-2 sm:mb-3 whitespace-pre-wrap break-words">{content && content.length > 100 ? content.substring(0, 100) + "..." : content}</p>
            {!isMobile &&
                <button className="bg-inherit relative float-right mr-2 text-[#f5ba13] border-none cursor-pointer outline-none sm:text-base">
                    <DelButton _id={id} />
                </button>
            }
        </div>
    );
}