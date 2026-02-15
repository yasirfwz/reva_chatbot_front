// types/chat.ts
export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};
