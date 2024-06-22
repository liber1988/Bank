import axios from "axios";

const userUrl = "https://6672b2cd6ca902ae11b1636f.mockapi.io/bankusers";

export const getUsers = async () => {
  try {
    const response = await axios(userUrl);
    return response.data;
  } catch (error) {
    throw new Error("cannot fetch users data");
  }
};

export const addUser = async (user) => {
  try {
    const response = await axios.post(userUrl, user);
  } catch (error) {
    throw new Error("Unable to add user to db");
  }
};

export const deleteUser = async (user) => {
  try {
    const response = await axios.delete(userUrl + "/" + user.id);
  } catch (error) {
    throw new Error("Unable to delete user.");
  }
};

export const updateOneUser = async (user) => {
  try {
    const response = await axios.put(userUrl + "/" + user.id, user);
  } catch (error) {
    throw new Error("Unable to delete user.");
  }
};
export const getOneUser = async (id) => {
  try {
    const response = await axios(userUrl + "/" + id);
    return response.data;
  } catch (error) {
    throw new Error("cannot fetch users data");
  }
};
