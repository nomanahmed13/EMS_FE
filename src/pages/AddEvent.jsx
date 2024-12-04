import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5001/events/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Correctly formatted token
          },
        }
      );

      alert("Event created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating event:", error);
      alert(
        error.response?.data?.error || "An unexpected error occurred while creating the event."
      );
    }
  };

  return (
    <div
      className="relative bg-[url('./assets/back-eve.jpg')] bg-cover bg-center min-h-screen"
      style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* This overlay darkens the background */}

      <div className='relative z-10 flex flex-col ml-20 mt-10'>
        <div><h1 className='font-bold text-[36px] mb-5 text-white'>Post an Event</h1></div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5 max-h-screen overflow-auto '>
          <div className='flex flex-wrap gap-5'>
            <div className='flex flex-col w-full sm:w-1/3 md:w-1/4 ml-1'>
              <label className='flex flex-col text-white'>
                Title:
                <input
                  type="text"
                  name="title"
                  className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none text-black'
                  value={formData.title}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='flex flex-col w-full sm:w-1/2 md:w-1/3 '>
              <label className='flex flex-col text-white'>
                Optional:
                <input
                  type="text"
                  name="optional"
                  className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none text-black'
                  value={formData.optional}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='flex flex-col w-full sm:w-1/2 md:w-1/3'>
              <label className='flex flex-col text-white'>
                Description:
                <textarea
                  name="description"
                  className='rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-8 border-none text-black'
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className='flex flex-wrap gap-5'>
            <div className='flex flex-col w-full sm:w-1/3 md:w-1/4 ml-1'>
              <label className='flex flex-col text-white'>
                Organized By:
                <input
                  type="text"
                  className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none text-black'
                  name="organizedBy"
                  value={formData.organizedBy}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='flex flex-col w-full sm:w-1/2 md:w-1/3'>
              <label className='flex flex-col text-white'>
                Event Date:
                <input
                  type="date"
                  className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none text-black'
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='flex flex-col w-full sm:w-1/2 md:w-1/3'>
              <label className='flex flex-col text-white'>
                Event Time:
                <input
                  type="time"
                  name="eventTime"
                  className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none text-black'
                  value={formData.eventTime}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='flex flex-col w-full sm:w-1/4 md:w-1/4 ml-1'>
              <label className='flex flex-col text-white'>
                Location:
                <input
                  type="text"
                  name="location"
                  className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none text-black'
                  value={formData.location}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='flex flex-col w-full sm:w-1/2 md:w-1/3'>
              <label className='flex flex-col text-white'>
                Ticket Price:
                <input
                  type="number"
                  name="ticketPrice"
                  className='rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none text-black'
                  value={formData.ticketPrice}
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* <div className='flex flex-col '>
              <label className='flex flex-col w-full text-white'>
                Image:
                <div className='relative mt-2'>
                  <input
                    type="file"
                    name="image"
                    className='absolute inset-0 opacity-0 cursor-pointer'
                    onChange={handleImageUpload}
                  />
                  <div className='flex justify-center items-center p-3 border-2 border-white rounded-lg w-full mx-auto'>
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Selected"
                        className="object-contain w-full max-h-32"
                      />
                    ) : (
                      <span className='text-white text-center'>Choose an image</span>
                    )}
                  </div>
                </div>
              </label>
            </div> */}
          </div>
          {/* Submit Button */}
          <div className='flex justify-center mt-5'>
            <button className='primary' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
