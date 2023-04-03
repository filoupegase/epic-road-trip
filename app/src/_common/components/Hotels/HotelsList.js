import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

function HotelListPage({ city }) {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchHotels() {
      const res = await fetch(
        `/api/amadeus/get-hotel-list-by-city/?city=${encodeURIComponent(city)}`
      );
      const data = await res.json();
      setHotels(data);
    }
    fetchHotels();
  }, [city]);

  return (
    <>
      {hotels.length > 0 ? (
        <Grid container spacing={2}>
          {hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.hotelId}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {hotel.name}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body1" color="textSecondary">
                      {hotel.address &&
                        hotel.address.lines &&
                        hotel.address.lines.join(", ")}
                    </Typography>
                    <Typography variant="body1">
                      {hotel.totalPrice?.amount} {hotel.totalPrice?.currency}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center">
          No hotels found.
        </Typography>
      )}
    </>
  );
}

export default HotelListPage;
