'use client'

import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Zoom } from "@mui/material";

export default function CreateArea() {
    // note input form state
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    // state to expand the create_area
    const [isExpand, setIsExpand] = useState(false);

    // fn to handle change in input and textarea [nested setnote fn]
    function handleChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value
            };
        });

        console.log(note);

    }

    // function submitNote(event: { preventDefault: () => void; }) {
    //     props.onAdd(note);
    //     setNote({
    //         title: "",
    //         content: ""
    //     });
    //     event.preventDefault();
    // }

    // fn to handle the isExpand
    function handleClick() {
        setIsExpand(true);
    }

    return (
        <div>
            <form className="bg-white relative w-11/12 sm:w-[30rem] mx-auto my-4 p-3 rounded-lg shadow-md focus:shadow-[#f5ba13]">
                {isExpand && (
                    <input
                        className="w-full border-none p-1 outline-none text-xl font-family-inherit resize-none"
                        name="title"
                        onChange={handleChange}
                        value={note.title}
                        placeholder="Title"
                    />
                )}
                <textarea
                    className="w-full border-none p-1 outline-none text-base sm:text-xl font-family-inherit resize-none"
                    onFocus={handleClick}
                    name="content"
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={isExpand ? 3 : 1}
                />
                <Zoom in={isExpand}>
                    <Fab className="absolute right-4 -bottom-5 bg-[#f5ba13] text-white hover:text-[#f5ba13] border-none w-9 h-9 shadow-sm cursor-pointer outline-none">
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}
