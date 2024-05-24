import Link from "next/link";

export default function SidebarMenuItem({ link, text, Icon, active }) {
  return (
    <div className="hoverEffect mb-2 flex items-center text-gray-700 justify-start text-sm space-x-3 hover:bg-gray-200 rounded-full">
      <Link href={`/allProducts/${link}`}>
        <Icon className="h-7 mr-3" />
        <span className={`${active && "font-bold"} inline`}>{text}</span>
      </Link>
    </div>
  );
}
