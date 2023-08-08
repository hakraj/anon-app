

const ErrorMessage = ({ text }: { text: string }) => {
  return (
    <p className="text-xs text-red-500 my-1">{text}</p>
  )
}

export default ErrorMessage;