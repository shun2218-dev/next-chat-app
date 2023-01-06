export type NavigationState = {
  title: string;
  status: "error" | "success" | "info";
  text: string;
  strong?: string;
  email?: string;
};
