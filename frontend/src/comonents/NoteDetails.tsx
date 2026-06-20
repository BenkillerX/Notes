import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const NoteDetails = () => {
        const {id} = useParams<{id:string}>()
      const [title, setTitle] = useState<string>("")
      const [content, setContent] = useState<string>("")
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log({ title, content })
  }
  console.log(id);
  return (
    <div>
        <Link to="/">
        <button
            className="mb-4 inline-flex items-center rounded-md bg-gray-200 px-4 py-2 text-gray-700 font-medium hover:bg-gray-300 transition-colors duration-200"
        >
            ← Back
        </button>
        </Link>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit New Note
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default NoteDetails
