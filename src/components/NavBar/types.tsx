import { ShoppingCart } from "lucide-react";

export interface subItem {
  name: string;
  href: string;
}

export interface NavItem {
  name: string;
  href?: string;
  roles?: string[];
  subItems?: subItem[];
  icon?: React.ReactNode; // Roles allowed to see the link
}

export const navLinks: NavItem[] = [
  { name: "עגלת קניות", icon: <ShoppingCart />, href: "/cart" },
  { name: "דף בית", href: "/" },
  {
    name: "ביגוד",
    href: "/collections",
  },
  { name: "צור קשר", href: "/contact" },
];
