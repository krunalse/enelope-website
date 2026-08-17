import {
  Bot,
  MessageSquare,
  Cloud,
  Compass,
  Server,
  Database,
  ShieldCheck,
  Sparkles,
  Workflow,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Bot,
  MessageSquare,
  Cloud,
  Compass,
  Server,
  Database,
  ShieldCheck,
  Sparkles,
  Workflow,
  Rocket,
};

export const SERVICE_ICON_OPTIONS = Object.keys(SERVICE_ICONS);

export function getServiceIcon(name: string): LucideIcon {
  return SERVICE_ICONS[name] ?? Bot;
}
