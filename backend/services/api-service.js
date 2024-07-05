const axios = require("axios");

let ErrorType = require("../helpers/error-types"); 

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const api = "https://reqres.in/api";

const fetchData = async (path) => {
  try {
    const res = await axios.get(`${api}${path}`, config);
    delete res["data"]["support"];
    return res.data;
  } catch (error) {
    throw new Error(ErrorType.EXTERNAL_API_ERROR);
  }
};

module.exports = {
  fetchData,
};
