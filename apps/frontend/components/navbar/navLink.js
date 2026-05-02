import {
  LayoutDashboard,
  Briefcase,
  Target,
  Megaphone,
  CheckSquare,
} from "lucide-react";

export const navLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    protected: true,
  },
  {
    name: "Workspaces",
    path: "/workspace",
    icon: Briefcase,
  },
  {
    name: "Goals",
    path: "/goals",
    icon: Target,
  },
  {
    name: "Announcements",
    path: "/announcements",
    icon: Megaphone,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
];