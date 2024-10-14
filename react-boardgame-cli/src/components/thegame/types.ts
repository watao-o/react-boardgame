export interface Room {
  ownerSoketid: string;
  id: string;
  players: { id: string; name: string }[];
}