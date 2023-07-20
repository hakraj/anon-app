import Logo from "../logo"


const FormTitle = ({ text }: { text: string }) => {
  return (
    <>
      <Logo color={"[#f5ba13]"} />
      <h1 className="my-4 text-xl">{text}</h1>
    </>
  )
}

export default FormTitle;