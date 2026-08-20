import Sidebar from "@/app/components/Sidebar";
import { mockUser } from "@/app/lib/mockData";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-layout">
      <Sidebar user={mockUser} />
      <div className="main-content">{children}</div>
    </div>
  );
}
