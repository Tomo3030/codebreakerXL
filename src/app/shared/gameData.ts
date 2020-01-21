import { user } from "./user";

export interface gameData {
  joiner?: user;
  creator?: user;
  emojiList?: string[];
  emojiList2?: string[];
  score?: number;
  round?: string;
  speaker?: boolean;
  organizer?: boolean;
}
