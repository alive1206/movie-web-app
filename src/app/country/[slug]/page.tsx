import { CountryComponent } from "@/containers";

export default function GenreScreen({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return <CountryComponent slug={slug} />;
}
