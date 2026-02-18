import { useQuery } from "@tanstack/react-query";
import { useApi } from "./use-api";

type Props = {
  slug: string;
};

export const useGetDetailFilm = ({ slug }: Props) => {
  const { api } = useApi();

  const getDetailFilm = async () => {
    const res = await api.get(`/film/${slug}`);
    return res.data;
  };

  return useQuery({
    queryKey: ["detail-film", slug],
    queryFn: getDetailFilm,
  });
};
