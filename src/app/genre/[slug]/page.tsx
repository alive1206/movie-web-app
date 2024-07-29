import { GenreComponent } from "@/containers";

export default function GenreScreen({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return <GenreComponent slug={slug} />;
}
