import type React from "react"

interface ErrorProp{
    message:string
}

const Error: React.FC<ErrorProp> = ({message}) => {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
      {message}
    </div>
  )
}

export default Error
