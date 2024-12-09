import React, { useMemo, useState } from "react";
import { NavItem, navLinks } from "./types";
import "../../index.css";
import { useGetCategories } from "../../hooks/useCategories";
import { useCart } from "../../hooks/useCart";
import { Badge } from "@mui/material";

interface MenuProps {
  isOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ isOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const { categories, isLoading, isError } = useGetCategories();
  const { cart } = useCart();

  // Map categories to `subItems` format
  const formattedCategories = categories?.map((category) => ({
    name: category.name,
    href: `/collections/${category.id}`, // Assuming `id` exists in the Category type
  }));

  const navItems: NavItem[] = useMemo(() => {
    return navLinks.map((link) => {
      if (link.name === "ביגוד" && !isLoading && !isError) {
        return { ...link, subItems: formattedCategories };
      }
      return link;
    });
  }, [categories, isLoading, isError]);

  const toggleDropdown = (index: any) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  return (
    <ul
      className={`absolute left-0 top-full w-full bg-gray-300 z-50 md:static md:flex md:w-auto md:space-x-6 md:items-center ${
        isOpen ? "block" : "hidden"
      }`}
      dir="rtl"
    >
      {navItems?.map((link, index) => (
        <li key={link.name} className="relative group">
          <a
            href={link.href}
            className="block px-4 py-2 hover:bg-gray-400 md:hover:bg-transparent"
            onClick={(e) => {
              if (link.subItems) {
                e.preventDefault(); // Prevent navigation if it has subitems
                toggleDropdown(index);
              }
            }}
          >
            {link.icon ? (
              <span className="text-xl">
                <Badge badgeContent={cart?.length} color="secondary">
                  {link.icon}
                </Badge>
              </span>
            ) : (
              <span>{link.name}</span>
            )}
          </a>

          {link.subItems && (
            <ul
              className={` md:absolute 
                 md:top-full bg-gray-200 md:w-48 md:rounded-lg md:shadow-md ${
                   openDropdown === index ? "block" : "hidden"
                 } md:group-hover:block`}
            >
              {link.subItems.map((subItem) => (
                <li key={subItem.name}>
                  <a
                    href={subItem.href}
                    className="block px-4 py-2 hover:bg-gray-300 "
                  >
                    {subItem.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
