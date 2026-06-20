import axios, { AxiosError } from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const CreateNote = () => {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        setLoading(true)
        await axios.post(`http://localhost:5000/api/notes/add`, {title, content}, {timeout:5000});
        toast.success("Note created successfully")
        setTitle("")
        setContent("")
        navigate("/")
    } catch (err) {
        const error = err as AxiosError<{ message: string }>
      if (error.code === "ECONNABORTED") {
      // timeout error
      toast.error("Request timed out. Please check your connection.")
      setError("Request timed out. Please check your connection.")
    } else if (!error.response) {
      // no response from server (network issue)
      toast.error("Network error. Please check your internet connection.")
      setError("Network error. Please check your internet connection.")
    } else {
      // server responded with an error status
      toast.error(`Error: ${error.response.data?.message || "Failed to add note"}`)
    }
        console.log(error, "Errir Adding Note");
    }finally{
        setLoading(false)
    }
    console.log({ title, content })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a New Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={5}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>
          {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2 text-sm font-medium">
                {error}
            </p>
            )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Adding...": "Add Note"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateNote
