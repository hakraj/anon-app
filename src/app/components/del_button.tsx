'use client'
import DeleteIcon from "@mui/icons-material/Delete";

export default function DelButton() {
    return (
        <button className="bg-inherit relative float-right mr-2 text-[#f5ba13] border-none cursor-pointer outline-none sm:text-base">
            <DeleteIcon />
        </button>
    );
}