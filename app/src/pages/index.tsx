import { useState, FormEvent, ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import SearchBar from "../_common/components/Search/searchCities";
import DialogSearchFiltered from "@/_common/components/Dialog/DialogSearchFiltered/DialogSearchFiltered";

interface DataCategory {
  icon: JSX.Element;
  label: string;
}

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [showHotels, setShowHotels] = useState(false);
  const [currentCity, setCurrentCity] = useState<any>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 201) {
      await router.push(`/post/${data}`);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleHotelsClick = () => {
    setShowHotels(true);
    handleClickOpen();
  };

  const handleActivitiesClick = () => {
    setShowHotels(false);
    handleClickOpen();
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    let searchUrl = `/api/amadeus/get-points-of-interest?city=${value}&category=`;
    if (showHotels) {
      searchUrl = `/api/amadeus/get-hotel-list-by-city?city=${value}`;
    }
    const response = await fetch(searchUrl);
    const searchData = await response.json();

    setCurrentCity({
      name: value,
      data: searchData,
    });
  };

  return (
    <>
      <SearchBar
        handleSearch={handleSearch}
        showHotels={showHotels}
        currentCity={currentCity}
        handleCardClick={(id) =>
          router.push(`/details/${showHotels ? "hotel" : "activity"}/${id}`)
        }
      />
      {open && <DialogSearchFiltered open={open} onClose={handleClose} />}
    </>
  );
}
