import { ReleaseComponent } from "@/containers";

export default function GenreScreen({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return <ReleaseComponent slug={slug} />;
}
