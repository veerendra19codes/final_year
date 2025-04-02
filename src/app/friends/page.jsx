"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function FriendsPage() {
  const { data: session } = useSession()
  const [friends, setFriends] = useState([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (session?.user?.id) {
      setIsLoading(true)
      fetch(`/api/friends?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error)
            return
          }
          setFriends(data)
          setError(null)
        })
        .catch((error) => {
          console.error("Error fetching friends:", error)
          setError("Failed to load friends. Please try again later.")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [session])

  const filteredFriends = friends?.filter(
    (friend) =>
      friend.firstname.toLowerCase().includes(search.toLowerCase()) ||
      friend.lastname.toLowerCase().includes(search.toLowerCase()),
  )

  const getInitials = (firstname, lastname) => {
    return `${firstname?.charAt(0) || ""}${lastname?.charAt(0) || ""}`
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 border border-gray-200">
      {/* Society Name */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-700">Greenwood Society</h1>
        <p className="text-gray-600">A place to connect with your community</p>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Members</h2>
          <p className="text-gray-500">Connect with people in your society</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Gallery
          </button>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Loading & Error Handling */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="ml-2 text-lg text-gray-500">Loading members...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              Showing {filteredFriends.length} of {friends.length} members
            </p>
          </div>

          {/* Friends List */}
          {filteredFriends.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFriends.map((friend) => (
                <div
                  key={friend._id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-md rounded-lg border border-gray-200 bg-white"
                >
                  <div className="h-16 bg-gradient-to-r from-blue-100 to-blue-50"></div>
                  <div className="p-4 pt-0 -mt-8">
                    <div className="h-16 w-16 rounded-full border-4 border-white overflow-hidden relative">
                      {friend.profileImage ? (
                        <Image
                          src={friend.profileImage || "/placeholder.svg"}
                          alt={`${friend.firstname} ${friend.lastname}`}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 font-medium">
                          {getInitials(friend.firstname, friend.lastname)}
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {friend.firstname} {friend.lastname}
                      </h3>
                      <p className="text-sm text-gray-500">{friend.phoneNumber}</p>

                      <div className="flex justify-center mt-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Member
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800">No members found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
