import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function ActivitiesList({ city, activityQuery }) {
  const [filteredActivities, setFilteredActivities] = useState(city.activities);

  const handleActivityFilter = () => {
    const filtered = city.activities.filter((activity) =>
      activity.name.toLowerCase().includes(activityQuery.toLowerCase())
    );
    setFilteredActivities(filtered);
  };

  return (
    <div>
      <h2>Activities in {city.name}</h2>
      <List>
        {filteredActivities?.map((activity) => (
          <ListItem key={activity.name}>
            <ListItemAvatar>
              <Avatar src={activity.pois?.[0]?.thumbnail} />
            </ListItemAvatar>
            <ListItemText
              primary={activity.name}
              secondary={`Category: ${activity.category}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ActivitiesList;
