import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Autocomplete,
  Typography,
  IconButton,
  Button,
  MenuItem,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import UploadIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { Toaster } from "sonner";
import { error_toast, success_toast } from "../utils/activateToast";
import { useNavigate } from "react-router-dom";
import { axiosInstanceFormData } from "../middleware/axiosInstance";
import GoogleMap from "../components/GoogleMap";
import AuthMiddleware from "../middleware/AuthMiddleware";

const amenitiesOptions = [
  "Air Conditioning",
  "Heating",
  "WiFi",
  "Television",
  "Washing Machine",
];

const facilitiesOptions = [
  "Swimming Pool",
  "Gym",
  "Parking",
  "Elevator",
  "Playground",
];

const safetyOptions = [
  "CCTV",
  "Security Guard",
  "Fire Extinguisher",
  "Smoke Detector",
  "First Aid Kit",
];

const livingTypeOptions = ["Shared", "Private"];

const RentForm = () => {
  const [rentDetails, setRentDetails] = useState({
    title: "",
    moveInDate: "",
    duration: "",
    roomType: "",
    livingType: "",
    roommates: "",
    rentPrice: "",
    deposit: "",
    aboutRoom: "",
    aboutNeighbourhood: "",
    amenities: [],
    facilities: [],
    safety: [],
  });
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [geolocate, setGeolocate] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       setGeolocate((prev) => ({ latitude, longitude }));
  //     });
  //   }
  // }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRentDetails({
      ...rentDetails,
      [name]: value,
    });
  };

  const handleAutoCompleteChange = (value, fieldName) => {
    setRentDetails({
      ...rentDetails,
      [fieldName]: value,
    });
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/heic",
      "image/heif",
    ];

    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      setError("Please upload the correct format");
      return;
    }

    const totalFiles = files.length + photos.length;
    if (totalFiles !== 5) {
      setError("You need to upload exactly 5 photos.");
    } else {
      setError("");
      setPhotos([...photos, ...files.map((file) => URL.createObjectURL(file))]);
    }
  };

  const handleDeletePhoto = (imageUrl) => {
    setPhotos(photos.filter((photo) => photo !== imageUrl));
    setError("You need to upload exactly 5 photos.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (photos.length !== 5) {
      setError("You need to upload exactly 5 photos.");
      return;
    }
    setLoading(true);
    try {
      const files = document.getElementById("upload-photo-input").files;
      const formData = new FormData();
      Object.keys(files).forEach((key) => {
        formData.append("files", files.item(key));
      });

      Object.keys(rentDetails).forEach((key) => {
        formData.append(key, rentDetails[key]);
      });

      formData.append("geolocation", `${geolocate["lat"]},${geolocate["lng"]}`);

      const response = await axiosInstanceFormData.post(
        "/post/upload",
        formData
      );

      if (response.status === 200) {
        setTimeout(() => {
          success_toast(response.data.message);
        }, 3000);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 6000);
      }
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 500) {
        setTimeout(() => {
          error_toast(error.response.data);
          setLoading(false);
        }, 3000);
      } else {
        error_toast(error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "5% 7% 5% 7%",
          margin: "0 0 -1rem 8rem",
          maxWidth: "70%",
          fontFamily: "Lato",
        }}
      >
        <div>
          <Typography
            sx={{
              fontSize: "4rem",
              fontFamily: "Sora",
              fontWeight: "bold",
              color: "#48466D",
              display: "inline-block",
              marginRight: "0.7rem",
            }}
          >
            List your{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: "4rem",
              fontFamily: "Sora",
              fontWeight: "bold",
              color: "#46CDCF",
              display: "inline-block",
            }}
          >
            room
          </Typography>
          <Typography
            sx={{
              fontSize: "4rem",
              fontFamily: "Sora",
              fontWeight: "bold",
              color: "#48466D",
              display: "inline-block",
            }}
          >
            !
          </Typography>
        </div>

        <Typography
          sx={{ fontSize: "1.2rem", fontFamily: "Lato", fontWeight: "light" }}
        >
          Fill in your room information. It will only take a couple of minutes.
        </Typography>
      </Box>
      <Box
        sx={{
          border: "2.5px solid #E2E4E5",
          borderRadius: "1rem",
          padding: "4% 7% 4% 7%",
          margin: "0 15% 5% 15%",
          maxWidth: "70%",
          fontFamily: "Lato",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontFamily: "Sora",
            fontWeight: "bold",
            color: "#48466D",
          }}
        >
          Room Details
        </Typography>
        <Typography
          sx={{ fontSize: "1rem", fontFamily: "Lato", fontWeight: "light" }}
        >
          Fill out all the required fields. Please be accurate and exact.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            "& .MuiAutocomplete-root": { m: 1, width: "100%" },
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="title"
            label="Title"
            variant="standard"
            fullWidth
            value={rentDetails.title}
            onChange={handleInputChange}
          />
          <TextField
            name="moveInDate"
            label="Move-in Date"
            variant="standard"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={rentDetails.moveInDate}
            onChange={handleInputChange}
          />
          <TextField
            name="duration"
            label="Duration"
            variant="standard"
            fullWidth
            value={rentDetails.duration}
            onChange={handleInputChange}
          />
          <TextField
            name="roomType"
            label="Type of Room"
            variant="standard"
            fullWidth
            value={rentDetails.roomType}
            onChange={handleInputChange}
          />
          <TextField
            select
            name="livingType"
            label="Living Type"
            variant="standard"
            fullWidth
            value={rentDetails.livingType}
            onChange={handleInputChange}
          >
            {livingTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="roommates"
            label="Current no. of Roommates"
            variant="standard"
            fullWidth
            value={rentDetails.roommates}
            onChange={handleInputChange}
          />

          <NumericFormat
            customInput={TextField}
            name="rentPrice"
            label="Rent Price"
            variant="standard"
            thousandSeparator
            prefix="฿"
            fullWidth
            value={rentDetails.rentPrice}
            onValueChange={({ floatValue }) =>
              handleInputChange({
                target: {
                  name: "rentPrice",
                  value: floatValue,
                },
              })
            }
          />
          <NumericFormat
            customInput={TextField}
            name="deposit"
            label="Deposit"
            variant="standard"
            thousandSeparator
            prefix="฿"
            fullWidth
            value={rentDetails.deposit}
            onValueChange={({ floatValue }) =>
              handleInputChange({
                target: {
                  name: "deposit",
                  value: floatValue,
                },
              })
            }
          />

          <TextField
            name="aboutRoom"
            label="About the Room"
            multiline
            rows={2}
            variant="standard"
            fullWidth
            value={rentDetails.aboutRoom}
            onChange={handleInputChange}
          />
          <TextField
            name="aboutNeighbourhood"
            label="About the Neighbourhood"
            multiline
            rows={2}
            variant="standard"
            fullWidth
            value={rentDetails.aboutNeighbourhood}
            onChange={handleInputChange}
          />

          <Autocomplete
            multiple
            options={amenitiesOptions}
            value={rentDetails.amenities}
            onChange={(event, value) =>
              handleAutoCompleteChange(value, "amenities")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Amenities in the Room"
                fullWidth
              />
            )}
          />
          <Autocomplete
            multiple
            options={facilitiesOptions}
            value={rentDetails.facilities}
            onChange={(event, value) =>
              handleAutoCompleteChange(value, "facilities")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Facilities on the Property"
                fullWidth
              />
            )}
          />
          <Autocomplete
            multiple
            options={safetyOptions}
            value={rentDetails.safety}
            onChange={(event, value) =>
              handleAutoCompleteChange(value, "safety")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Safety"
                fullWidth
              />
            )}
          />

          <span
            style={{
              marginLeft: "1rem",
              marginTop: "1.5rem",
              fontFamily: "Lato",
              color: "#48466D",
              fontSize: "17px",
            }}
          >
            {" "}
            Upload exactly 5 photos{" "}
          </span>
          {photos.length === 0 ? (
            <div
              id="upload"
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: "8px",
                borderColor: "#E2E4E5",
                border: "20px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                marginTop: "16px",
                marginLeft: "0.7rem",
                marginBottom: "1.5rem",
                height: "120px",
              }}
              onClick={() =>
                document.getElementById("upload-photo-input").click()
              }
            >
              <IconButton component="span" sx={{ fontSize: "36px" }}>
                <UploadIcon />
              </IconButton>
              <Typography sx={{ marginBottom: "0.8rem" }}>
                Select images
              </Typography>
            </div>
          ) : (
            <>
              <div
                id="new-div"
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "8px",
                  borderColor: "#E2E4E5",
                  border: "20px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between", // evenly distribute the boxes
                  flexWrap: "wrap",
                  cursor: "pointer",
                  marginTop: "16px",
                  marginLeft: "0.7rem",
                  marginBottom: "0.5rem",
                  minHeight: "120px",
                }}
              >
                {/* Render 5 boxes with specific size */}
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "70px", // fixed width
                      height: "70px", // fixed height
                      position: "relative",
                      marginTop: "0.5rem",
                    }}
                  >
                    {/* Uploaded images */}
                    {index < photos.length && (
                      <div style={{ width: "100%", height: "100%" }}>
                        <img
                          src={photos[index]}
                          alt="Uploaded Photo Preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", // ensures the image covers the box without distortion
                            display: "block",
                            margin: "auto",
                          }}
                        />
                        <IconButton
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            backgroundColor: "rgba(255, 255, 255, 0.7)",
                          }}
                          onClick={() => handleDeletePhoto(photos[index])}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {photos.length > 0 && photos.length < 5 && (
                <Button
                  variant="contained"
                  onClick={() =>
                    document.getElementById("upload-photo-input").click()
                  }
                  style={{
                    marginLeft: "35%",
                    marginRight: "35%",
                    marginBottom: "2rem",
                    backgroundColor: "#46CDCF",
                    maxWidth: "20rem",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    alignItems: "center",
                    fontFamily: "Lato",
                  }}
                >
                  Add More Images
                </Button>
              )}
            </>
          )}
          <input
            id="upload-photo-input"
            type="file"
            hidden
            multiple
            onChange={handlePhotoUpload}
            accept="image/jpeg, image/png, image/jpg, image/heic, image/heif"
          />
          {error && <Typography color="error">{error}</Typography>}

          <span
            style={{
              margin: "1.5rem 0 0.5rem 1.1rem",
              fontFamily: "Lato",
              color: "#48466D",
              fontSize: "17px",
            }}
          >
            {" "}
            Where is your room?{" "}
          </span>
          <div
            style={{
              height: "25rem",
              margin: "0.7rem 0 3rem 0.8rem ",
            }}
          >
            <GoogleMap geolocate={geolocate} setGeolocate={setGeolocate} />
          </div>

          <Button
            type="submit"
            variant="contained"
            style={{
              marginLeft: "0.6rem",
              backgroundColor: "#46CDCF",
              fontWeight: "bold",
              fontSize: "1rem",
              fontFamily: "Lato",
              padding: "10px",
            }}
            disabled={loading}
          >
            Submit
          </Button>
        </Box>
        <Toaster richColors />
      </Box>
    </>
  );
};

const AuthRentForm = AuthMiddleware(RentForm);
export default AuthRentForm;
