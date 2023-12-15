import SubNavbar from "@/components/SubNavbar";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SubNavbar />
      <div className="h-full">{children}</div>
    </div>
  );
}
