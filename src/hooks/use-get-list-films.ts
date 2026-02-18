import { useQuery } from "@tanstack/react-query";
import { useApi } from "./use-api";

type Props = {
  slug: string;
  page: number;
};

export const useGetListFilms = ({ slug, page }: Props) => {
  const { api } = useApi();

  const getListFilms = async () => {
    const res = await api.get(`/films/danh-sach/${slug}?page=${page}`);
    return res.data;
  };

  return useQuery({
    queryKey: ["list-films", slug, page],
    queryFn: getListFilms,
  });
};
