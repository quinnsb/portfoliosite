import { Inter, Averia_Serif_Libre } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-inter",
  display: "swap",
});

export const interBold = Inter({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-inter-bold",
  display: "swap",
});

export const averiaSerifLibre = Averia_Serif_Libre({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal", "italic"],
  variable: "--font-averia",
  display: "swap",
});
