import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCustomQuery = (url: string) => {
  const getQuery = useQuery({
    queryKey: ["get"],
    queryFn: async () => {
      const result = await axios.get(url);
      return result;
    },
    enabled: false,
  });

  const postQuery = useMutation({
    mutationFn: (postBody) => {
      return axios.post(url, postBody);
    },
  });

  const patchQuery = useMutation({
    mutationFn: (postBody) => {
        return axios.put(url, postBody);
    }
  })

  const deleteQuery = useMutation({
    mutationFn: async () => {
       const result = await axios.delete(url)
       return result
    }
  })

  return [getQuery, postQuery, patchQuery, deleteQuery];
};
