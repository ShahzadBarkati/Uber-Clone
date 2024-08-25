const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 4001;

// axios.defaults.baseURL = process.env.MAP_API_URL;

const config = {
  headers: {
    contentType: "application/json",
  },
};

app.use(cors());
app.use(bodyParser.json());

app.get("/api/address/:address", async (req, res) => {
  try {
    if (
      req.params.address == null ||
      req.params.address == "" ||
      req.params.address == "null"
    ) {
      return "";
    }

    let url =
      "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=" +
      req.params.address;
    let response = await axios.get(url, config);

    res.status(200).send(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/distance/:pickup/:destination", async (req, res) => {
  try {
    let url =
      "https://router.project-osrm.org/route/v1/driving/" +
      req.params.pickup +
      ";" +
      req.params.destination +
      "?overview=full";
    let response = await axios.get(url, config);

    res.status(200).send(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
