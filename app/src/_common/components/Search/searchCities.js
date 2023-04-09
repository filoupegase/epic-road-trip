import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";
import {
  Stack,
  FormControl,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [currentCity, setCurrentCity] = useState(null);
  const [showHotels, setShowHotels] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const router = useRouter();

  const handleSearch = async (event) => {
    event.preventDefault();
    let searchUrl = `/api/amadeus/get-points-of-interest?city=${query}&category=`;
    if (showHotels) {
      searchUrl = `/api/amadeus/get-hotel-list-by-city?city=${query}`;
    }
    const response = await fetch(searchUrl);
    const searchData = await response.json();
    console.log(searchData);

    setCurrentCity({
      name: query,
      data: searchData,
    });
  };

  const handleCheckboxChange = (event) => {
    setShowHotels(event.target.name === "hotels" && event.target.checked);
    setShowActivities(
      event.target.name === "activities" && event.target.checked
    );
  };

  const handleCardClick = (id) => {
    if (showHotels) {
      router.push(`/details/hotel/${id}`);
    } else {
      router.push(`/details/activity/${id}`);
    }
  };

  function HotelsList({ city }) {
    return (
      <div>
        {Array.isArray(city.data) && city.data.length > 0 ? (
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            flexWrap="wrap"
            spacing={2}
          >
            {city.data.map((hotel) => (
              <Box
                key={hotel.hotelId}
                sx={{ maxWidth: 345, mb: 2, mr: 2 }}
                onClick={() => handleCardClick(hotel.hotelId)}
              >
                <Card sx={{ mb: 2 }}>
                  <CardHeader
                    title={hotel.name}
                    subheader={hotel.address && hotel.address.countryCode}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={
                      hotel.media && hotel.media[0].uri
                        ? hotel.media[0].uri
                        : "/fallback-image.jpeg"
                    }
                    alt={hotel.name}
                  />
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <KingBedOutlinedIcon />
                      <ListItemText
                        primary={
                          hotel.totalRooms
                            ? `${hotel.totalRooms} rooms`
                            : "Unknown number of rooms"
                        }
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography variant="h6">
            Sorry, we don't have any hotels for this city.
          </Typography>
        )}
      </div>
    );
  }

  function ActivitiesList({ city }) {
    return (
      <div>
        {Array.isArray(city.data) && city.data.length > 0 ? (
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            flexWrap="wrap"
            spacing={2}
          >
            {city.data.map((activity) => (
              <Card
                key={activity.name}
                sx={{ maxWidth: 345, mb: 2 }}
                onClick={() => handleCardClick(activity.id)}
              >
                <CardHeader
                  title={activity.name}
                  subheader={`Category: ${activity.category}`}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={
                    activity.media && activity.media[0].uri
                      ? activity.media[0].uri
                      : "/fallbackActivity-image.jpeg"
                  }
                  alt={activity.name}
                />
              </Card>
            ))}
          </Stack>
        ) : (
          <Typography variant="h6">
            Sorry, we don't have any activities for this city.
          </Typography>
        )}
      </div>
    );
  }

  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <FormControl component="fieldset">
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showHotels}
                  onChange={handleCheckboxChange}
                  name="hotels"
                />
              }
              label={<KingBedOutlinedIcon />}
            />
          </Box>
        </FormControl>
        <FormControl component="fieldset">
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showActivities}
                  onChange={handleCheckboxChange}
                  name="activities"
                />
              }
              label={<LocalActivityOutlinedIcon />}
            />
          </Box>
        </FormControl>
      </Stack>
      <form onSubmit={handleSearch}>
        <TextField
          label="Search for a city"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: 500, mr: 2 }}
        />
        <Button color="primary" variant="contained" type="submit">
          Search
        </Button>
      </form>
      {currentCity && (
        <div>
          {showHotels && <HotelsList city={currentCity} />}
          {showActivities && <ActivitiesList city={currentCity} />}
        </div>
      )}
    </div>
  );
}
export default SearchBar;
