import { touristAttractions } from "../tourist-attractions";
import AttractionClientPage from "./attraction-client-page";

export async function generateStaticParams() {
  return touristAttractions.map((attraction) => ({
    id: attraction.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const attraction = touristAttractions.find((a) => a.id === id);

  return <AttractionClientPage attraction={attraction} />;
}
