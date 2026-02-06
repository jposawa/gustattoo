import { atom } from "jotai";
import { VisualTheme } from "@/types";

export const themeAtom = atom<VisualTheme>(VisualTheme.Light);
