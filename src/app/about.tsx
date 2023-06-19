/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";


export default function Home() {
    return (
        <main className="mb-10">
            <header className="flex items-center flex-col mt-[10%]">
                <Image
                    priority
                    src="/images/pfp.jpg"
                    className="rounded-full shadow-md outline-none"
                    height={144}
                    width={144}
                    alt="dox_dev_img"
                />
                <h1 className="text-4xl my-10">hak_raj</h1>
            </header>
            <section className="text-xl text-center mx-auto w-4/5 lg:w-1/2">
                <p>Hello, I'm hak_raj. i'm softare developer and web3 enthusiast. You can contact me on <a className="text-blue-400" href='https://twitter.com/hak_raj_codes'>🐦</a>. This is a simple intro, let's connect across all newtork. Actively sharing what i learn. Big on community 🚀, Big on dev 💻.</p>
            </section>
        </main>
    );
}