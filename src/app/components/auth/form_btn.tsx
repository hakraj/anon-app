

const FormBtn = ({ text, error }: { text: string, error?: boolean }) => {
  return (
    <button className=" mt-4 hover:bg-white text-xl w-full p-2 hover:text-[#f5ba13] border-[#f5ba13] border rounded-lg text-white bg-[#f5ba13]">
      {text}
    </button>

  )
}

export default FormBtn;