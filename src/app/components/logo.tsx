import { monofett } from "../fonts";


const Logo = ({ color }: { color: string }) => {
  return (
    <h1 className={`text-${color} text-4xl ${monofett.className} cursor-pointer`} > notify </h1>
  )
};

export default Logo;