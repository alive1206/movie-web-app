import { SearchComponent } from "@/containers";
import axios from "axios";

export const dynamic = "force-dynamic";

export default async function SearchScreen({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const getMovies = async (keyword: string, page: number = 1) => {
    try {
      const movies = await axios.get(
        `https://phim.nguonc.com/api/films/search?keyword=${keyword}&page=${page}`
      );
      return movies.data;
    } catch (error) {
      return [];
    }
  };

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const movies = await getMovies(searchParams?.keyword || "", page);

  return <SearchComponent movies={movies} />;
}
