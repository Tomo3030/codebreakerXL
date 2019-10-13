import { user } from "./user";

export interface gameData {
  joiner?: user;
  creator?: user;
  emojiList?: string[];
  emojiList2?: string[];
  score?: number;
  round?: string;
  p1?: boolean;
  p2?: boolean;
}
