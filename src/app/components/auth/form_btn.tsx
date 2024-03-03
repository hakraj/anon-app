

const FormBtn = ({ text, loading }: { text: string, loading: boolean }) => {
  return (
    <button className={`mt-4 hover:bg-white text-xl w-full p-2 hover:text-[#f5ba13] border-[#f5ba13] border rounded-lg text-white ${!loading && "bg-[#f5ba13]"}`}>
      {loading ?
        <div className="w-5 h-5 rounded-full animate-spin border-2 border-solid border-[#f5ba13] border-t-transparent shadow-md mx-auto my-1"></div>
        :
        text
      }
    </button>

  )
}

export default FormBtn;