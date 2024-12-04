import React from "react";

export default function IndexPage() {

  return (
    <>
      <div className="flex flex-col">
        {/* Hero Image */}
        <div>
          <img
            src="../src/assets/hero.jpg"
            alt="Event Management"
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="bg-gray-100 px-6 py-10">
          {/* Welcome Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to Evento EMS</h1>
            <p className="text-lg text-gray-700">
              Organize and manage events effortlessly with our comprehensive tools.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-6 py-10">
          <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-500 text-white rounded-full mx-auto mb-4">
                🎉
              </div>
              <h3 className="text-xl font-bold mb-2">Event Planning</h3>
              <p className="text-gray-600">
                Streamline your event planning process with our easy-to-use tools.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full mx-auto mb-4">
                📅
              </div>
              <h3 className="text-xl font-bold mb-2">Event Scheduling</h3>
              <p className="text-gray-600">
                Create detailed schedules to keep your event on track.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-full mx-auto mb-4">
                📝
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Registration</h3>
              <p className="text-gray-600">
                Simplify attendee registration with user-friendly forms and quick sign-ups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
