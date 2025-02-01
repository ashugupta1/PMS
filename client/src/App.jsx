import React, { useState } from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Staybluo.com</div>
      <ul className="flex space-x-4">
        <li><a href="#home" className="hover:text-blue-400">Home</a></li>
        <li><a href="#about" className="hover:text-blue-400">About</a></li>
        <li><a href="#services" className="hover:text-blue-400">Services</a></li>
        <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
      </ul>
    </nav>
  );
};

const Header = () => {
  return (
    <header className="text-center py-12 bg-blue-500 text-white">
      <h1 className="text-4xl font-bold">Find Your Perfect Stay</h1>
      <p className="text-lg mt-2">Discover the best serviced apartments in Delhi & Gurgaon</p>
    </header>
  );
};

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState('');

  const handleSearch = () => {
    onSearch(city, roomType);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm">CITY</label>
          <select className="w-full p-2 border rounded" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Gurgaon">Gurgaon</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">CHECK-IN</label>
          <input type="date" className="w-full p-2 border rounded" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">CHECK-OUT</label>
          <input type="date" className="w-full p-2 border rounded" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">ROOM TYPE</label>
          <select className="w-full p-2 border rounded" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option value="">Select Room Type</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleSearch}>Search</button>
    </div>
  );
};

const HotelCard = ({ image, name, location, price, type, onClick }) => {
  return (
    <div 
      className="border rounded-lg shadow-md overflow-hidden w-72 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-blue-500 font-semibold">{price}</p>
        <span className={`text-xs py-1 px-2 rounded mt-2 inline-block ${type === 'Premium' ? 'bg-yellow-500 text-white' : 'bg-gray-300'}`}>{type}</span>
      </div>
    </div>
  );
};

const InquiryModal = ({ isOpen, onClose, hotel, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Inquiry Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm">Name</label>
            <input type="text" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Email</label>
            <input type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Phone Number</label>
            <input type="tel" className="w-full p-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="flex justify-end">
            <button type="button" className="mr-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [filterCity, setFilterCity] = useState('');
  const [filterRoomType, setFilterRoomType] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hotels = [
    { image: "https://api.oliveservicedapartments.com/property_assets/city_images/1595/1590412234-Delhi.ecbc6ca7.jpg", name: 'Premier Room- Room Only ', location: 'Delhi', price: 'Rs 4,371.00', type: 'Premium' },
    { image: "https://api.oliveservicedapartments.com/property_assets/city_images/443/1590412182-Gurugram.4ef16f08.jpg", name: 'Standard Room - Room Only ', location: 'Delhi', price: 'Rs 4,600.00', type: 'Standard' },
    { image: "https://api.oliveservicedapartments.com/property_assets/city_images/1595/1590412234-Delhi.ecbc6ca7.jpg", name: 'Standard Room - Room Only ', location: 'Delhi', price: 'Rs 3,889.00', type: 'Standard' },
    { image: "https://api.oliveservicedapartments.com/property_assets/city_images/1429/1590412376-Noida.84df911a.jpg", name: 'Premier Room- Room Only', location: 'Gurgaon', price: 'Rs 2,354.00', type: 'Premium' },
    { image: "https://api.oliveservicedapartments.com/property_assets/city_images/3698/1660673650-HYD Home.jpg", name: 'Premier Room- Room Only', location: 'Gurgaon', price: 'Rs 1,37.00', type: 'Premium' },
    { image: "https://api.oliveservicedapartments.com/property_assets/city_images/1595/1590412234-Delhi.ecbc6ca7.jpg", name: 'Standard Room - Room Only ', location: 'Delhi', price: 'Rs 4,578.00', type: 'Standard' },
    { image: "https://api.oliveservicedapartments.com/property_assets/city_images/1429/1590412376-Noida.84df911a.jpg", name: 'Premier Room- Room Only', location: 'Gurgaon', price: 'Rs 4,371.00', type: 'Premium' },
    { image: "https://api.oliveservicedapartments.com/property_assets/city_images/3698/1660673650-HYD Home.jpg", name: 'Premier Room- Room Only View', location: 'Delhi', price: 'Rs 3,351.00', type: 'Premium' },
    { image: "https://api.oliveservicedapartments.com/property_assets/city_images/443/1590412182-Gurugram.4ef16f08.jpg", name: 'Standard Room - Room Only ', location: 'Delhi', price: 'Rs 3,451.00', type: 'Standard' },
  ];

  const handleSearch = (city, roomType) => {
    setFilterCity(city);
    setFilterRoomType(roomType);
  };

  const handleCardClick = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  
  const handleFormSubmit = async (formData) => {
    const inquiryData = {
      hotel: selectedHotel,
      userDetails: formData,
    };
  
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryData),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Inquiry submitted successfully!");
        setIsModalOpen(false);
      } else {
        alert("Failed to submit inquiry.");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("An error occurred while submitting the inquiry.");
    }
  };
  const filteredHotels = hotels.filter(hotel => {
    return (
      (filterCity ? hotel.location === filterCity : true) &&
      (filterRoomType ? hotel.type === filterRoomType : true)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Header />
      <SearchBar onSearch={handleSearch} />
      <main className="flex flex-wrap justify-center gap-6 p-6">
        {filteredHotels.map((hotel, index) => (
          <HotelCard key={index} {...hotel} onClick={() => handleCardClick(hotel)} />
        ))}
      </main>
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        hotel={selectedHotel} 
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default App;