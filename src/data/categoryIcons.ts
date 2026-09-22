import type { ComponentType } from "react";
import {
  FiAlertTriangle,
  FiGrid,
  FiLayers,
  FiMonitor,
  FiSettings,
  FiShield,
  FiShoppingBag,
  FiTool,
  FiZap,
} from "react-icons/fi";
import { IconFlask, IconPaint } from "@tabler/icons-react";
import type { MainCategory } from "./products";

export type CategoryIcon = ComponentType<{ className?: string }>;

export const categoryIcons: Record<MainCategory, CategoryIcon> = {
  "Construction Materials": FiLayers,
  "Food Products": FiShoppingBag,
  "Mechanical Tools": FiTool,
  "Construction and Safety": FiShield,
  "Paints and Finishes": IconPaint,
  "Water / Fire Proofing": FiAlertTriangle,
  Electronics: FiZap,
  "Auto Spare Parts": FiSettings,
  "IT Accessories": FiMonitor,
  Chemicals: IconFlask,
};

export function getCategoryIcon(id: string): CategoryIcon {
  if (id === "All" || id.startsWith("All ")) return FiGrid;
  return categoryIcons[id as MainCategory] ?? FiGrid;
}
