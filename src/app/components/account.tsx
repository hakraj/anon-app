import Image from "next/image";

const Account = () => {
    return (
        <div className="flex justify-start items-center w-11/12 my-8 mx-auto lg:w-1/2 ">
            <div className="ml-[5%] mr-auto">
                <Image
                    className="rounded-full shadow-md outline-none"
                    src="/images/anon-avatar.png"
                    alt="avatar-img"
                    width={102}
                    height={102}
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

export default Account;