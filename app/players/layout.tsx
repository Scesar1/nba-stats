import SubNavbarPlayer from "@/components/SubNavbarPlayer";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SubNavbarPlayer />
      <div className="h-full">{children}</div>
    </div>
  );
}
