import { useQuery } from "@tanstack/react-query";
import { useApi } from "./use-api";

type Props = {
  keyword: string;
};

export const useSearchFilm = ({ keyword }: Props) => {
  const { api } = useApi();

  const searchFilm = async () => {
    const res = await api.get(`/films/search?keyword=${keyword}`);
    return res.data;
  };

  return useQuery({
    queryKey: ["search-film", keyword],
    queryFn: searchFilm,
  });
};
