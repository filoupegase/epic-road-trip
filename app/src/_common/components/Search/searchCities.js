import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function SearchBar() {
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState("");
  const [currentCity, setCurrentCity] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `/api/amadeus/get-hotel-list-by-city?city=${query}`
    );
    const data = await response.json();
    setCities(data);
  };

  const handleClick = async (cityName) => {
    const response = await fetch(
      `/api/amadeus/get-hotel-list-by-city?city=${cityName}`
    );
    const data = await response.json();
    setCurrentCity({
      name: cityName,
      hotels: data,
    });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <TextField
          label="Search for a city"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>
      {cities.length > 0 && (
        <List>
          {cities.map((city) => (
            <ListItem
              key={city.name}
              alignItems="flex-start"
              onClick={() => handleClick(city.name)}
              button
            >
              <ListItemAvatar>
                <Avatar alt={city.name} src={city.image_url} />
              </ListItemAvatar>
              <ListItemText
                primary={city.name}
                secondary={`${city.subdivision} ${city.country}`}
              />
            </ListItem>
          ))}
        </List>
      )}
      {currentCity && <HotelsList city={currentCity} />}
    </div>
  );
}

export default SearchBar;
