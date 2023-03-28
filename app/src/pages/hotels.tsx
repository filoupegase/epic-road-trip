import { useEffect, useState } from "react";

type Hotel = {
  hotel: {
    name: string;
  };
};

export default function AmadeusHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    fetch("/api/amadeus")
      .then((res) => res.json())
      .then((data) => {
        const hotelData = data.map((offer: any) => {
          const hotel: Hotel = { hotel: { name: offer.hotel.name } };
          return hotel;
        });
        setHotels(hotelData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {hotels.map((hotel, index) => (
        <div key={index}>
          <h2>{hotel.hotel.name}</h2>
        </div>
      ))}
    </div>
  );
}
