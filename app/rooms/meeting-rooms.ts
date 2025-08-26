import type { MeetingRoom } from "@/lib/types";

export const meetingRooms: MeetingRoom[] = [
  {
    name: "Executive Boardroom",
    price: 1500, // per hour
    capacity: 12,
    wifi: true,
    projector: true,
    whiteboard: true,
    videoConference: true,
    catering: true,
    images: ["/modern-boardroom-with-conference-table.png"],
    shortDescription: "Premium boardroom for executive meetings.",
    description:
      "Our Executive Boardroom features a large conference table for up to 12 people, state-of-the-art AV equipment, high-speed Wi-Fi, and professional catering options. Perfect for board meetings and important presentations.",
    status: "available",
    averageRating: 4.8,
    equipment: [
      "4K Projector",
      "Video Conferencing",
      "Wireless Presentation",
      "Premium Audio System",
    ],
  },
  {
    name: "Creative Workshop Space",
    price: 1200, // per hour
    capacity: 20,
    wifi: true,
    projector: true,
    whiteboard: true,
    videoConference: false,
    catering: true,
    images: ["/creative-workshop-space-with-whiteboards.png"],
    shortDescription: "Flexible space for workshops and brainstorming.",
    description:
      "A dynamic workshop space designed for creativity and collaboration. Features moveable furniture, multiple whiteboards, projector, and flexible seating arrangements. Ideal for team building and creative sessions.",
    status: "available",
    averageRating: 4.7,
    equipment: [
      "Multiple Whiteboards",
      "Moveable Furniture",
      "Projector",
      "Flip Charts",
    ],
  },
  {
    name: "Small Meeting Room",
    price: 800, // per hour
    capacity: 6,
    wifi: true,
    projector: false,
    whiteboard: true,
    videoConference: true,
    catering: false,
    images: ["/small-meeting-room-with-round-table.png"],
    shortDescription: "Intimate space for small team meetings.",
    description:
      "Perfect for small team meetings and one-on-one discussions. Features a round table for up to 6 people, whiteboard, video conferencing capabilities, and high-speed Wi-Fi.",
    status: "available",
    averageRating: 4.5,
    equipment: ["Video Conferencing", "Whiteboard", "Round Table Setup"],
  },
  {
    name: "Training Room",
    price: 1000, // per hour
    capacity: 30,
    wifi: true,
    projector: true,
    whiteboard: true,
    videoConference: true,
    catering: true,
    images: ["/training-room-with-classroom-setup.png"],
    shortDescription: "Large training room with classroom setup.",
    description:
      "Spacious training room with classroom-style seating for up to 30 people. Equipped with projector, sound system, whiteboards, and video conferencing. Perfect for training sessions and seminars.",
    status: "available",
    averageRating: 4.6,
    equipment: [
      "Projector & Screen",
      "Sound System",
      "Classroom Seating",
      "Multiple Whiteboards",
    ],
  },
];
