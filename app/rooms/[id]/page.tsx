import { rooms } from "../rooms";
import RoomDetailClient from "./room-detail-client";

export async function generateStaticParams() {
  return rooms.map((room, index) => ({
    id: index.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = rooms[parseInt(id)];

  return <RoomDetailClient room={room} />;
}
