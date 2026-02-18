import { YearComponent } from "@/containers";
import axios from "axios";

export const dynamic = "force-dynamic";

export default async function YearScreen({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const fetchData = async (slug: string, page: number = 1) => {
    try {
      const res = await axios.get(
        `https://phim.nguonc.com/api/films/nam-phat-hanh/${slug}?page=${page}`,
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const page = resolvedSearchParams?.page
    ? parseInt(resolvedSearchParams.page)
    : 1;
  const movies = await fetchData(slug, page);

  return <YearComponent slug={slug} data={movies} />;
}
