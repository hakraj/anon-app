'use client'

import FormBtn from "@/app/components/auth/form_btn";
import FormTitle from "@/app/components/auth/form_title";
import Link from "next/link";
import Image from "next/image";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import ErrorMessage from "@/app/components/auth/error_message";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { onboardUser } from "../../../../../utils/user";


const OnboardingAvatar = () => {
  const router = useRouter();
  const { data: session, status } = useSession()

  const userEmail = session?.user?.email as string;

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState("")

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target?.files?.[0];

    if (file && isImageFile(file)) {
      setError("")
      setSelectedImage(file);

    } else {
      // Handle invalid image selection (e.g., show an error message)
      // setError("invalid image selection")
    }
  };

  const isImageFile = (file: File): boolean => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/jpg',
      'image/webp',
      'image/bmp',
      'image/tiff',
      'image/svg+xml',
      'image/x-icon',
      'image/vnd.microsoft.icon',
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      // Invalid file type
      setError("Invalid file type")
      return false;
    }

    if (file.size > maxSize) {
      // File size exceeds limit
      setError("File size exceeds limit, 5MB")
      return false;
    }

    return true;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    // if (!error) {
    //   const res = await onboardUser({ email: userEmail, image: username });

    //   if (res.sucesss) {
    //     router.push('/')
    //   } else {
    //     setError("error")
    //     throw new Error("error")
    //   }
    // }

  }


  return (
    <main>
      <div className="container flex justify-center items-center">
        <div className="bg-white dark:bg-slate-800 rounded-lg w-5/6 sm:w-[25rem] p-6 sm:p-8 text-center mt-[15vh] sm:mt-[20vh]">
          <form onSubmit={handleSubmit}>
            <FormTitle text="Choose Image to Upload" />
            <p className="text-xs text-slate-600 dark:text-slate-400">your profile picture will be visible to the public 🌏</p>

            <div className="form-floating relative text-left my-1 p-1 overflow-auto ">

              {selectedImage && <Image src={URL.createObjectURL(selectedImage)} alt="Preview" width={48} height={48} />}
              <input type="file" accept="image/*" onChange={handleImageChange} />

            </div>

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