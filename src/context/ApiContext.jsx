import { createContext, useState, useContext, useEffect } from "react";
import {
  addUser,
  getUsers,
  deleteUser,
  getOneUser,
  updateOneUser,
} from "../api/api";
import Spinner from "../components/spinner/Spinner";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [Users, setUsers] = useState([]);
  const [User, setUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsersData = async () => {
    setIsLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while fetching Users."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const catchUser = async (User) => {
    setIsLoading(true);
    try {
      await addUser(User);
      await fetchUsersData();
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while adding the User."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUserData = async (User) => {
    setIsLoading(true);
    try {
      await deleteUser(User);
      await fetchUsersData();
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while deleting the User."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async (id) => {
    setIsLoading(true);
    try {
      const data = await getOneUser(id);
      setUsers(data);
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while fetching the User."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (User) => {
    setIsLoading(true);
    try {
      await updateOneUser(User);
      await fetchUsersData();
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while updating the User."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const withdraw = async (withdraw, User) => {
    try {
      User.deposit = User.deposit - withdraw;
      await updateOneUser(User);
      await fetchUsersData();
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while updating the User."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ApiContext.Provider
      value={{
        User,
        Users,
        catchUser,
        deleteUserData,
        getUser,
        updateUser,
        errorMessage,
        isLoading,
      }}
    >
      {isLoading ? <Spinner /> : children} {/* Show spinner if loading */}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};
