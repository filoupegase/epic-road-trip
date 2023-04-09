import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ActivitiesList from "../Activities/ActivitiesList";
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
  function ActivitiesList({ city }) {
    return (
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader title="Activities" />
          <CardContent>
            <List>
              {city.data &&
                city.data.map((activity) => (
                  <ListItem key={activity.name}>
                    <ListItemAvatar>
                      <Avatar src={activity.picture} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.name}
                      secondary={`Category: ${activity.category}`}
                      onClick={() => handleCardClick(activity.id)}
                    />
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }

  function ActivitiesListCard({ city }) {
    return (
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader title="Hotels" />
          <CardContent>
            <ActivitiesList
              city={city}
              onItemClick={(hotelId) => handleCardClick(hotelId)}
            />
          </CardContent>
        </Card>
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
          {showHotels && <ActivitiesListCard city={currentCity} />}
          {showActivities && <ActivitiesList city={currentCity} />}
        </div>
      )}
    </div>
  );
}
export default SearchBar;