import { FormEvent, useState, ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import { Paper, InputBase, IconButton, Stack } from "@mui/material";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import CardActionsCategory from "@/_common/components/CardActionsCategory";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import HotelOffers from "./hotels";
import HotelsList from "../_common/components/Hotels/HotelsList";
import SearchBar from "../_common/components/Search/searchCities";

interface DataCategory {
  icon: JSX.Element;
  label: string;
}

const dataCardActionsCategory: DataCategory[] = [
  {
    icon: <KingBedOutlinedIcon />,
    label: "Hôtels",
  },
  {
    icon: <LocalActivityOutlinedIcon />,
    label: "Activités",
  },
  {
    icon: <RestaurantMenuOutlinedIcon />,
    label: "Restaurants",
  },
  {
    icon: <MoreHorizOutlinedIcon />,
    label: "Plus",
  },
];

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `https://api.amadeus.com/v1.2/points-of-interest/yapq-search-text?apikey=jNjlWg3yAJp6AQFABh77dP6wj7rAVjrq&city_name=PARIS&country_name=FRANCE&latitude=48.856614&longitude=2.3522219&radius=2&phrase=${value}`
    );
    const data = await res.json();
    if (res.status === 200) {
      // handle the data returned by the API
      console.log(data);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Stack sx={{ mt: 3, mb: 4 }} direction="row" spacing={2}>
        {dataCardActionsCategory.map((el: DataCategory, index) => {
          return (
            <CardActionsCategory label={el.label} icon={el.icon} key={index} />
          );
        })}
      </Stack>
      {/* <StyledPaper
        // @ts-ignore
        component="form"
        elevation={3}
      > */}
       {/*  <IconButton
          onClick={handleSubmit}
          sx={{ p: "10px", mr: 1 }}
          aria-label="menu"
        >
          <SearchIcon color="primary" />
        </IconButton> */}
        {/* */}
       {/*  <InputBase
          placeholder="Where to ?"
          inputProps={{ "aria-label": "search google maps" }}
          fullWidth
          id="search-bar"
          onChange={handleChange}
          value={value}
        /> */}
{/*       </StyledPaper>
 */}      <HotelOffers />
      {/* <HotelsList city="New York" /> */}
      <SearchBar></SearchBar> 
    </>
  );
}

const StyledPaper = styled(Paper)(() => ({
  borderRadius: 15,
  padding: "7px 11px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));
