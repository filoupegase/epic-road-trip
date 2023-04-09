import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Activity() {
  const router = useRouter();
  const { id } = router.query;
  const [activityDetails, setActivityDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const response = await fetch(
          `/api/details/get-activity-details?id=${id}`
        );
        const data = await response.json();
        console.log(data);
        setActivityDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };
    if (id) {
      fetchActivityDetails();
    }
  }, [id]);

  if (!id) {
    return <div>No activity ID provided.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activityDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{activityDetails.name}</h1>
      <p>Activity ID: {activityDetails.id}</p>
      <p>Category: {activityDetails.category}</p>
      <p>Description: {activityDetails.description}</p>
      <p>Duration: {activityDetails.duration}</p>
      <p>Price: {activityDetails.price}</p>
      <p>Starting Point: {activityDetails.startingPoint}</p>
      <p>Rating: {activityDetails.rating}</p>
      <p>Reviews: {activityDetails.reviews}</p>
      <p>Photos: {activityDetails.photos}</p>
    </div>
  );
}

export default Activity;
