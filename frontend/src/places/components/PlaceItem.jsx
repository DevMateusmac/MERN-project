/* eslint-disable react/prop-types */
import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card.jsx";
import Button from "../../shared/components/FormElements/Button.jsx";
import Modal from "../../shared/components/UIElements/Modal.jsx";
import Map from "../../shared/components/UIElements/Map.jsx";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useContext } from "react";

import { useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook.jsx";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.jsx";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.jsx";

export default function PlaceItem({
  id,
  image,
  title,
  address,
  description,
  coordinates,
  onDelete,
}) {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { userId, token } = useContext(AuthContext);
  const { sendRequest, clearError, error, isLoading } = useHttpClient();

  function handleOpenMap() {
    setShowMap((prevMap) => !prevMap);
  }

  function handleCloseMap() {
    setShowMap((prevMap) => !prevMap);
  }

  function handleOpenDeleteWarning() {
    setShowDeleteModal((prevDelete) => !prevDelete);
  }

  function handleCloseDeleteWarning() {
    setShowDeleteModal((prevDelete) => !prevDelete);
  }

  async function handleConfirmDelete() {
    setShowDeleteModal((prevDelete) => !prevDelete);
    try {
      await sendRequest(`${import.meta.env.REACT_APP_BACKEND_URL}/places/${id}`, "DELETE", null, {Authorization: 'Bearer ' + token});
      onDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={handleCloseMap}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={handleCloseMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        onCancel={handleCloseDeleteWarning}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={handleCloseDeleteWarning}>
              CANCEL
            </Button>
            <Button danger onClick={handleConfirmDelete}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can&apos;t be undone thereafter
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay/> }
          <div className="place-item__image">
            <img src={`${import.meta.env.REACT_ASSET_URL}/${image}`} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={handleOpenMap}>
              VIEW ON MAP
            </Button>
            {userId === id && (
              <>
                <Button to={`/places/${id}`}>EDIT</Button>
                <Button danger onClick={handleOpenDeleteWarning}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}
