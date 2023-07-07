import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://test-f32d2-default-rtdb.firebaseio.com/data.json",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = {
  submitForm: (data) => {
    apiInstance
      .post("/", data)
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
};

export default api;
