/* eslint-disable react/prop-types */
import "./ImageUpload.css";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

export default function ImageUpload({ id, center, onInput, errorText }) {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsvalid] = useState(false);


  useEffect(() => {
    if(!file){
      return
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file);
  }, [file])


  function handlePick(ev) {

    let pickedFile;
    let fileIsValid = isValid;

    if (ev.target.files && ev.target.files.length === 1) {
      pickedFile = ev.target.files[0];
      setFile(pickedFile);
      setIsvalid(true);
      fileIsValid = true;
    } else {
      setIsvalid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, isValid, fileIsValid);
  }

  function handleImagePick() {
    filePickerRef.current.click();
  }

  return (
    <div className="form-control">
      <input
        type="file"
        id={id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={handlePick}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={handleImagePick}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
}
