import {
  Briefcase,
  Cloud,
  Code2,
  Fingerprint,
  Plug,
  Shield,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  cloud: Cloud,
  workflow: Workflow,
  fingerprint: Fingerprint,
  shield: Shield,
  briefcase: Briefcase,
  users: Users,
  plug: Plug,
};

export function ServiceIcon({
  name,
  className = "size-6",
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Code2;
  return <Icon className={className} aria-hidden />;
}
