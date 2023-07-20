import Image from 'next/image';
import Link from 'next/link';
import Logo from './logo';

const Content = (
  { onToggle, links, logout }:
    {
      onToggle: () => void,
      links: {
        dir: string,
        name: string
      }[],
      logout: () => void
    }
) => {

  return (
    <div className="absolute top-0 right-0 z-[1051] bg-[#f5ba13] min-h-screen w-full bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]">
      <header className=" flex justify-between items-center bg-[#f5ba13] py-4 px-8 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] ">
        <Logo color={"white"} />
        <Image
          onClick={() => onToggle()}
          className="dropdown-menu"
          src="/icon-close.svg"
          alt="close-menu-icon"
          width={20}
          height={20}
        />
      </header>
      <div className=" py-16 text-center">
        {links.map(({ dir, name }, index) => {
          return (
            <h1 key={index} className="text-white my-10 text-3xl">
              <Link onClick={() => onToggle()} href={dir}>{name}</Link>
            </h1>
          );
        })}
        <button onClick={() => logout()} className=' text-white bg-red-400 border border-red-400 py-2 px-4 mt-16 rounded-lg shadow-md hover:bg-white hover:text-red-400'>
          <svg className=" inline w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Content;