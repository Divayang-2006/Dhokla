import React from 'react'
// import { Combobox } from '@/components/ui/combobox'

const cities = [
  { label: 'Mumbai', value: 'mumbai' },
  { label: 'Delhi', value: 'delhi' },
  { label: 'Bangalore', value: 'bangalore' },
  { label: 'Ahmedabad', value: 'ahmedabad' },
  { label: 'Kolkata', value: 'kolkata' },
]

function Home() {
  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-amber-300 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="md:basis-1/2 p-8 flex items-center justify-center bg-amber-400 text-white text-2xl font-semibold">
          Explore Restaurants in Your City
        </div>

        {/* Right Side */}
        <div className="md:basis-1/2 p-8 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
