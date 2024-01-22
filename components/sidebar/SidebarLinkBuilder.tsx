import Link from "next/link";

type SidebarLinkProps = {
  href: string;
  icon: React.ReactNode;
  text: string;
};
const SidebarLinkBuilder: React.FC<SidebarLinkProps> = ({ href, icon, text }) => (
  <Link
    href={href}
    className="sidebar-link flex items-center gap-4 p-2 hover:bg-gray-700 rounded-md"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default SidebarLinkBuilder;



