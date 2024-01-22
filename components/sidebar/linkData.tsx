import { ElementType, ReactElement } from "react";
import { Home, User, Dog, Calendar, DollarSign, Image, Link } from "lucide-react";

// Define the type for individual link data
export type LinkData = {
  href: string;
  icon: ReactElement;
  text: string;
};

// Example configuration for links, adjust as necessary
export const clientLinks: LinkData[] = [
  {
    href: "/",
    icon: <User className="mr-4 w-6 h-6" />,
    text: "Dashboard",
  },
  {
    href: "/pets",
    icon: <Dog className="mr-4 w-6 h-6" />,
    text: "Pets",
  },
  {
    href: "/bookings",
    icon: <Calendar className="mr-4 w-6 h-6" />,
    text: "Calender",
  },
  {
    href: "/payments",
    icon: <DollarSign className="mr-4 w-6 h-6" />,
    text: "Payments",
  },
  {
    href: "/gallary",
    icon: <Image className="mr-4 w-6 h-6" />,
    text: "Gallery",
  },
  {
    href: "/settings",
    icon: <Dog className="mr-4 w-6 h-6" />,
    text: "Pets",
  },
];

export const staffLinks: LinkData[] = [
  {
    href: "/",
    icon: <Home className="mr-4 w-6 h-6" />,
    text: "Dashboard",
  },
  {
    href: "/bookings",
    icon: <Home className="mr-4 w-6 h-6" />,
    text: "Bookings",
  },
  {
    href: "/pets",
    icon: <Dog className="mr-4 w-6 h-6" />,
    text: "Pets",
  },
  // ...other staff links
];

export const tenantLinks: LinkData[] = [
  {
    href: "/",
    icon: <Home className="mr-4 w-6 h-6" />,
    text: "Dashboard",
  },
  {
    href: "/bookings",
    icon: <Calendar className="mr-4 w-6 h-6" />,
    text: "Bookings",
  },
  {
    href: "/pets",
    icon: <Dog className="mr-4 w-6 h-6" />,
    text: "Pets",
  },
  // ...other tenant links
];




