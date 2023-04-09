import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Hotel() {
  const router = useRouter();
  const { id } = router.query;
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/amadeus/get-hotel-details?hotelId=${id}`
        );
        const data = await response.text();
        const parsedData = JSON.parse(data);
        setLoading(false);
        setHotelDetails(parsedData);
      } catch (error) {
        setLoading(false);
        setError("Error: Invalid response from server");
      }
    };
    if (id) {
      fetchHotelDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!hotelDetails) {
    return <div>No hotel details available.</div>;
  }

  return (
    <div>
      <h1>{hotelDetails.name}</h1>
      <p>Hotel ID: {hotelDetails.hotelId}</p>
      <p>Chain Code: {hotelDetails.chainCode}</p>
      <p>IATA Code: {hotelDetails.iataCode}</p>
      <p>Country Code: {hotelDetails.countryCode}</p>
      <p>Last Updated: {hotelDetails.lastUpdate}</p>
      <p>Address: {hotelDetails.address}</p>
      <p>
        Geo Location: Latitude {hotelDetails.geoCode.latitude} / Longitude{" "}
        {hotelDetails.geoCode.longitude}
      </p>
      <p>
        Distance from center: {hotelDetails.distance.value}{" "}
        {hotelDetails.distance.unit}
      </p>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={hotelDetails.name}
          subheader={hotelDetails.address}
        />
        <CardMedia
          component="img"
          height="194"
          image={
            hotelDetails.media && hotelDetails.media[0].uri
              ? hotelDetails.media[0].uri
              : "/fallback-image.jpeg"
          }
          alt={hotelDetails.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {hotelDetails.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Hotel;
