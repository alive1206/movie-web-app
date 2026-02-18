import { SearchComponent } from "@/containers";
import axios from "axios";

export const dynamic = "force-dynamic";

export default async function SearchScreen({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const getMovies = async (keyword: string, page: number = 1) => {
    try {
      const movies = await axios.get(
        `https://phim.nguonc.com/api/films/search?keyword=${keyword}&page=${page}`,
      );
      return movies.data;
    } catch (error) {
      return [];
    }
  };

  const page = resolvedSearchParams?.page
    ? parseInt(resolvedSearchParams.page)
    : 1;
  const movies = await getMovies(resolvedSearchParams?.keyword || "", page);

  return <SearchComponent movies={movies} />;
}
