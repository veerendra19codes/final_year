'use client'
import { useState, useEffect } from 'react'
import { Star, Phone, MapPin, X, Plus } from 'lucide-react'
import { useSession } from 'next-auth/react';


function getRandomColor() {
  const colors = ["blue", "yellow", "green", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function UtilityCard({ utility, openReview }) {
  const colorClasses = {
    blue: "bg-blue-100 border-blue-500",
    yellow: "bg-yellow-100 border-yellow-500",
    green: "bg-green-100 border-green-500",
    purple: "bg-purple-100 border-purple-500"
  };

  // Get a random color for this card
  const randomColor = getRandomColor();



  return (
    <div className={`rounded-lg overflow-hidden shadow-lg bg-blue-200 border-l-4`}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{utility.name}</div>
        <p className="text-gray-700 text-base mb-2">{utility.description}</p>
       {/* <div className="flex items-center mb-2">
          <Star className="h-5 w-5 text-yellow-500 mr-1" />
          <span className="text-gray-700">
            {utility?.rating ? parseFloat(utility.rating).toFixed(1) : 'N/A'}
          </span>
        </div>
        <button
          onClick={() => openReview(utility.reviews[0], utility.name)}
          className="text-blue-500 hover:underline mb-2"
        >
          {utility?.reviews?.length} Reviews
        </button> */}
        {/* <p className="text-gray-600 mb-2 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {utility.utilityType}
        </p> */}
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-gray-700">{utility.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}


export default function UtilityDashboard() {
  const session = useSession();

  const [utilitiesData, setUtilitiesData] = useState([])
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)
  const [selectedUtilityName, setSelectedUtilityName] = useState("")
  const [isAddUtilityOpen, setIsAddUtilityOpen] = useState(false)
  const [newUtility, setNewUtility] = useState({
    name: "",
    description: "",
    // utilityType: "",
    phoneNumber: "",
    society: "",
  })
  const [user, setUser] = useState({});

  //fetching all the data from backend
  useEffect(() => {
    const fetchUtlilities = async () => {
      try {
        const response = await fetch("/api/utility", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            societyId: user.societyId,
          }),
        });
        const data = await response.json();
        setUtilitiesData(data)

      } catch (error) {
        console.error('Failed to fetch utilities', error)
      }
    }
    fetchUtlilities();
  }, [user.societyId]);
  const openReview = (review, utilityName) => {
    setSelectedReview(review)
    setSelectedUtilityName(utilityName)
    setIsReviewOpen(true)
  }

  const closeReview = () => {
    setIsReviewOpen(false)
  }

  const openAddUtility = () => {
    setIsAddUtilityOpen(true)
  }

  const closeAddUtility = () => {
    setIsAddUtilityOpen(false)
    setNewUtility({
      name: "",
      description: "",
      // utilityType: "",
      phoneNumber: "",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUtility(prev => ({ ...prev, [name]: value }))
  }

  const handleAddUtility = async (e) => {
    e.preventDefault();

    // Prepare the utility data to be sent to the backend
    const utilityToAdd = {
      ...newUtility,
      rating: 0,
      reviews: [],
      society: user.society,
      societyId: user.societyId
    };

    try {
      // Send a POST request to add the new utility
      console.log("utilityToAdd:", utilityToAdd);
      const response = await fetch('/api/utility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(utilityToAdd) // Convert the object to a JSON string
      });

      if (!response.ok) {
        throw new Error('Failed to add utility');
      }

      // Get the updated utilities data from the response
      const addedUtility = await response.json();

      // Update the local state with the new utility
      setUtilitiesData(prev => [...prev, addedUtility]);

      // Close the add utility form
      closeAddUtility();
    } catch (error) {
      console.error('Error adding utility:', error);
    }
  };

  useEffect(() => {
    const fetchUserById = async () => {
      try {

        const res = await fetch("/api/getuserbyid", {
          method: "POST",
          body: JSON.stringify({ id: session.data.user.id }),
          headers: {
            "Content-type": "application/json"
          }
        })
        // console.log('res', res);
        const data = await res.json();
        // console.log("data: ", data);
        setUser(data.user);

      } catch (error) {
        console.log("error in fetching user by id: ", error);
      }
    }
    { session?.data?.user?.id && fetchUserById() }
  }, [session?.data?.user?.id]);




  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Utilities
          </h1>
          <button
            onClick={openAddUtility}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Utility
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {utilitiesData?.length > 0 ? 
          utilitiesData?.map((utility) => (
            <UtilityCard key={utility.id} utility={utility} openReview={openReview} />
          ))
          : 
          <p>No Utilties</p>
        }
        </div>
      </div>

      {isReviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Review for {selectedUtilityName}</h2>
                <button onClick={closeReview} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              {selectedReview && (
                <div>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-bold">{selectedReview.rating}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{selectedReview.content}</p>
                  <p className="text-gray-500">- {selectedReview.author}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isAddUtilityOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Utility</h2>
                <button onClick={closeAddUtility} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleAddUtility}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newUtility.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newUtility.description}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    
                    value={newUtility.phoneNumber}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add Utility
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}