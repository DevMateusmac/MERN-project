import Input from "../../shared/components/FormElements/Input.jsx";
import Button from "../../shared/components/FormElements/Button.jsx";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators.js";
import "./FormPlace.css";
import { useForm } from "../../shared/hooks/form-hook.js";
import { useHttpClient } from "../../shared/hooks/http-hook.jsx";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.jsx";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.jsx";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../shared/components/FormElements/ImageUpload.jsx";

export default function NewPlace() {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const { formState, handleInput } = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  async function handleSubmitPlace(ev) {
    ev.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(import.meta.env.REACT_APP_BACKEND_URL + '/places', "POST", formData, {Authorization: 'Bearer ' + token});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={handleSubmitPlace}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please, enter a valid title!"
          onInput={handleInput}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please, enter a valid description (at least 5 characters)."
          onInput={handleInput}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please, enter a valid address."
          onInput={handleInput}
        />
        <ImageUpload
          id="image"
          onInput={handleInput}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
}
