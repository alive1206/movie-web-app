import { useQuery } from "@tanstack/react-query";
import { useApi } from "./use-api";

type Props = {
  page: number;
};

export const useGetLatestListFilms = ({ page }: Props) => {
  const { api } = useApi();

  const getLatestListFilms = async () => {
    const res = await api.get(`/films/phim-moi-cap-nhat?page=${page}`);
    return res.data;
  };

  return useQuery({
    queryKey: ["latest-films", page],
    queryFn: getLatestListFilms,
  });
};
