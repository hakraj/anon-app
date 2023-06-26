import Image from "next/image";

export default function Account() {
    return (
        <div className="flex justify-start items-center w-11/12 my-8 mx-auto ">
            <div>
                <Image
                    className="rounded-full shadow-md outline-none mr-[20%] ml-[5%] sm:mr-[30%] lg:mr-[45%]"
                    src="/images/pfp.jpg"
                    alt="avatar-img"
                    fill
                />
            </div>

            <div className="text-center px-[5%] " >
                <h1 className="text-4xl sm:text-6xl">10</h1>
                <p className="text-xs sm:text-base">notes</p>
            </div>
            <div className="text-center px-[5%] ">
                <h1 className="text-4xl sm:text-6xl">125</h1>
                <p className="text-xs sm:text-base">interactions</p>
            </div>

        </div>
    )
}
