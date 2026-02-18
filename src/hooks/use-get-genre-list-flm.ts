import { useQuery } from "@tanstack/react-query";
import { useApi } from "./use-api";

type Props = {
  genre: string;
  slug: string;
  page: number;
};

export const useGetGenreListFilms = ({ genre, slug, page }: Props) => {
  const { api } = useApi();

  const getGenreListFilms = async () => {
    const res = await api.get(`/films/${slug}/${genre}?page=${page}`);
    return res.data;
  };

  return useQuery({
    queryKey: ["genre-list-films", slug, genre, page],
    queryFn: getGenreListFilms,
  });
};
