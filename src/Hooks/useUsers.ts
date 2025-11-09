import api from "@/API/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useUser = () => {
  const getUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      if (response.data.success) {
        return response.data.users;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Network Error!");
      }
    }
  };

  const { data: users, isFetching: isGettingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    users,
    isGettingUsers,
  };
};

export default useUser;
