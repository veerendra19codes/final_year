"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function ProfilePage() {
  const session = useSession()
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showCalendar, setShowCalendar] = useState(false)
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    address: "",
    dob: "",
    gender: "",
    profileImage: "",
  })

  useEffect(() => {
    if (session.status === "authenticated" && session.data) {
      setIsLoading(true)
      fetch(`/api/user/${session.data.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data)
          setFormData({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
            gender: data.gender || "",
            profileImage: data.profileImage || "",
          })
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching user:", error)
          setIsLoading(false)
        })
    } else if (session.status !== "loading") {
      setIsLoading(false)
    }
  }, [session])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      dob: e.target.value,
    })
  }

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!session.data?.user?.id) {
      alert("You must be logged in to update your profile")
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/user/${session.data.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setUser(result)
        setIsEditing(false)
      } else {
        alert("Failed to update profile: " + result.message)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("An error occurred while updating your profile")
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = () => {
    if (user?.firstname && user?.lastname) {
      return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
    } else if (user?.firstname) {
      return user.firstname[0].toUpperCase()
    } else if (session.data?.user?.name) {
      return session.data.user.name[0].toUpperCase()
    }
    return "U"
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not set"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (session.status === "loading") {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="w-full bg-white shadow-md rounded-lg">
          <div className="text-center border-b pb-6 px-6 pt-6">
            <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse mx-auto mb-4"></div>
            <div className="h-8 w-64 bg-gray-200 animate-pulse mx-auto"></div>
          </div>
          <div className="pt-6 space-y-4 px-6 pb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (session.status === "unauthenticated") {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="w-full bg-white shadow-md rounded-lg">
          <div className="text-center pb-6 px-6 pt-6">
            <h2 className="text-2xl font-bold text-blue-800">Not Signed In</h2>
            <p className="text-blue-500">Please sign in to view your profile</p>
          </div>
          <div className="pt-6 text-center px-6 pb-6">
            <button
              onClick={() => (window.location.href = "/api/auth/signin")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading && !user) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="w-full bg-white shadow-md rounded-lg">
          <div className="text-center border-b pb-6 px-6 pt-6">
            <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse mx-auto mb-4"></div>
            <div className="h-8 w-64 bg-gray-200 animate-pulse mx-auto"></div>
          </div>
          <div className="pt-6 space-y-4 px-6 pb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="w-full bg-white shadow-md rounded-lg">
        <div className="text-center border-b pb-6 px-6 pt-6">
          <div className="mx-auto mb-4">
            <div className="h-24 w-24 rounded-full border-4 border-blue-100 overflow-hidden mx-auto">
              {user?.profileImage ? (
                <Image
                  src={user.profileImage || "/placeholder.svg"}
                  alt={`${user.firstname} ${user.lastname}`}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="bg-blue-600 text-white text-xl flex items-center justify-center w-full h-full">
                  {getInitials()}
                </div>
              )}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-blue-800">
            {isLoading ? "Loading..." : `${user?.firstname || ""} ${user?.lastname || ""}`}
          </h2>
          <p className="text-blue-500">{session.data?.user?.email || "No email available"}</p>
        </div>

        <div className="pt-6 px-6">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                  <p className="text-lg font-medium text-blue-900">{user?.firstname || "Not set"}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                  <p className="text-lg font-medium text-blue-900">{user?.lastname || "Not set"}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="text-lg font-medium text-blue-900">{user?.phoneNumber || "Not set"}</p>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                  <p className="text-lg font-medium text-blue-900">
                    {user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "Not set"}
                  </p>
                </div>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="text-lg font-medium text-blue-900">{user?.address || "Not set"}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                <p className="text-lg font-medium text-blue-900">{formatDate(user?.dob)}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstname" className="block text-sm font-medium text-blue-800">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastname" className="block text-sm font-medium text-blue-800">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-blue-800">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="gender" className="block text-sm font-medium text-blue-800">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleGenderChange}
                    className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-blue-800">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="dob" className="block text-sm font-medium text-blue-800">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleDateChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </form>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t mt-6 px-6 pb-6">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="border border-blue-200 text-blue-700 hover:bg-blue-50 py-2 px-4 rounded-md transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

