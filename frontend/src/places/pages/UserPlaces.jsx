import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

export default function UserPlaces() {
  const { isLoading, clearError, error, sendRequest } = useHttpClient();
  const { userId } = useParams();
  const [places, setPlaces] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const data = await sendRequest(
          `${import.meta.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setPlaces(data.places);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlaces();
  }, [sendRequest, userId]);

  function placeDeletedHandler(deletedPlace){
    setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlace))
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && <PlaceList places={places} onDeletePlace={placeDeletedHandler}/>}
    </>
  );
}
