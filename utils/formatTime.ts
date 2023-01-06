import { Timestamp } from "firebase/firestore";

export const formatTime = (createdAt: Timestamp) => {
  const [hour, minute] = createdAt.toDate().toLocaleTimeString().split(":");
  if (Number(hour) < 10) {
    return `0${hour}:${minute}`;
  } else {
    return `${hour}:${minute}`;
  }
};
