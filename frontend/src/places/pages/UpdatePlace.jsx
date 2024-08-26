import "./FormPlace.css";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useNavigate, useParams } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

export default function UpdatePlace() {
  const { sendRequest, clearError, error, isLoading } = useHttpClient();
  const [place, setPlace] = useState();
  const navigate = useNavigate();
  const placeId = useParams().placeId;
  const {userId, token} = useContext(AuthContext);

  const { formState, handleInput, setFormData } = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    async function fetchPlace() {
      try {
        const data = await sendRequest(
          `${import.meta.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setPlace(data.place);
        setFormData(
          {
            title: {
              value: data.place.title,
              isValid: true,
            },
            description: {
              value: data.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlace();
  }, [placeId, sendRequest, setFormData]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!place && error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  async function handleSubmitUpdate(ev) {
    ev.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { 
          "Content-Type": "Application/json",
          Authorization: 'Bearer ' + token
         }
      );
      navigate(`/${userId}/places`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && place && (
        <form className="place-form" onSubmit={handleSubmitUpdate}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={handleInput}
            initialValue={place.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={handleInput}
            initialValue={place.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}
