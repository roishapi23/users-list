import { Registration } from "../models/Registration";
import { User } from "../models/User";
import useAxios from "./axios-instance";

const useApiService = () => {
  const api = useAxios();

  const getUsers = async (pageNumber: Number) => {    
    const response = await api.get(`/getUsers/${pageNumber}`);
    return response.data;
  };

  const getUser = async (userId: string) => {
    const response = await api.get(`/getUser/${userId}`);
    return response.data;
  };

  const createUser = async (user: User) => {
    const response = await api.post(`/createUser` , user);
    return response.data;
  };
  const updateUser = async (user: User) => {
    const response = await api.put(`/updateUser/${user.id}` , user);
    return response.data;
  };
  const deleteUser = async (userId: string) => {
    const response = await api.delete(`/deleteUser/${userId}`);
    return response.data;
  };

  const register = async (authData: Registration) => {
    const response = await api.post(`/registration`, authData);
    return response.data;
  };

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    register
  };
};

export default useApiService;


