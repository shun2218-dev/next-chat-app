import { Caveat, Yuji_Mai } from "@next/font/google";

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
  preload: true,
  variable: "--font-caveat",
});

export const yujiMai = Yuji_Mai({
  subsets: ["latin"],
  weight: "400",
  display: "optional",
  preload: true,
  variable: "--font-yujiMai",
});
