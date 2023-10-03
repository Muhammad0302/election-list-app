import axios from 'axios';

const url = 'https://new-api.spottroop.com';

export const getAllSensors = async () => {
  let res;
  try {
    res = await axios.get(`${url}/sensor/getAllSensors`);
  } catch (err) {
    res = err;
  }

  return res || '';
};
