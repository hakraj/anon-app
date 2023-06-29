'use client'

import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

export default function DelButton({ _id }: { _id: string }) {
    const router = useRouter();

    async function deletePost(id: string) {
        try {
            await fetch(`/api/posts/${id}`, {
                method: 'Delete',
            })
            router.push('/')
        } catch (error) {
            postMessage('Failed to delete the pet.')
        }

    }

    return (
        <DeleteIcon className='text-[#f5ba13]' onClick={() => deletePost(_id)} />
    );
}