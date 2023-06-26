import axios from "axios";
import Router from "next/router";

const {
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  DISTANCE_MATRIX,
  GOOGLE_DISTANCE_MATRIX,
} = require("@/constant");

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  const response = await axios
    .post("http://127.0.0.1:8000/api/login/refresh", {
      refresh: refreshToken,
    })
    .catch((err) => {
      removeAuthToken();
      Router.push("/login");
    });

  const access_token = response.data.access;

  localStorage.setItem(ACCESS_TOKEN, response.data.access);
  localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

  return access_token;
};

export const removeAuthToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(DISTANCE_MATRIX);
  localStorage.removeItem(GOOGLE_DISTANCE_MATRIX);
};

export const capitalizeFirstChar = (sentence) => {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

export const googleDistance = (curr, next, matrix) => {
  const distance_text = matrix[curr].elements[next].distance.text;

  return distance_text;
};

export const extractDistance = (value) => {
  const distance = value.split(" ");
  const res = distance[1] === "m" ? parseFloat(distance[0]) / 1000 : distance;
  return parseFloat(res);
};

export const calculateSumDistance = (matrix, result) => {
  let tempSum = 0;
  for (let i = 0; i <= result?.length; i++) {
    if (i == 0 || i == result.length) {
      const idx_main = i == 0 ? 0 : parseInt(result[i - 1]) + 1;
      const idx_next = i == 0 ? parseInt(result[i]) + 1 : 0;
      const text = googleDistance(idx_main, idx_next, matrix);
      tempSum += extractDistance(text);
    } else {
      const idx_main = parseInt(result[i - 1]) + 1;
      const idx_next = parseInt(result[i]) + 1;
      const text = googleDistance(idx_main, idx_next, matrix);
      tempSum += extractDistance(text);
    }
  }
  return tempSum;
};

export const createPSOTitle = (daResult, psoResult) => {
  let title = [];
  psoResult.forEach((itm) => {
    let temp = daResult.findIndex((v) => {
      return v == itm;
    });
    title.push(temp);
  });

  return title;
};
