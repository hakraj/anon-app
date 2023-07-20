'use client'

import FormBtn from "@/app/components/auth/form_btn";
import FormTitle from "@/app/components/auth/form_title";
import Link from "next/link";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import ErrorMessage from "@/app/components/auth/error_message";


const OnboardingAvatar = () => {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState("")

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target?.files?.[0];

    if (file && isImageFile(file)) {
      setSelectedImage(file);
    } else {
      // Handle invalid image selection (e.g., show an error message)
      setError("invalid image selection")
    }
  };

  const isImageFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      // Invalid file type
      setError("Invalid file type")
      return false;
    }

    if (file.size > maxSize) {
      // File size exceeds limit
      setError("File size exceeds limit")
      return false;
    }

    return true;
  };

  return (
    <main>
      <div className="container flex justify-center items-center">
        <div className="bg-white dark:bg-slate-800 rounded-lg w-5/6 sm:w-[25rem] p-6 sm:p-8 text-center mt-[15vh] sm:mt-[20vh]">
          <form >
            <FormTitle text="Choose Image to Upload" />
            <p className="text-xs text-slate-600 dark:text-slate-400">your profile picture will be visible to the public 🌏</p>

            {selectedImage && <Image src={URL.createObjectURL(selectedImage)} alt="Preview" width={48} height={48} />}
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {error && <ErrorMessage text={error} />}

            <FormBtn text="Upload" />

            <Link href="/"><p className="text-slate-600 dark:text-slate-400 underline text-left my-2">Skip</p></Link>

            <p className="text-sm text-slate-400 dark:text-slate-600 my-4">2/2</p>

          </form>
        </div >
      </div >
    </main >

  )
}

export default OnboardingAvatar;