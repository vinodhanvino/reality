import { Link, useMatches, type UIMatch } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

type CrumbHandle = { crumb?: string };

const linkClass = "transition-colors hover:text-foreground";

export function BreadcrumbNav() {
  const matches = useMatches() as UIMatch<unknown, CrumbHandle>[];
  const crumbs = matches.filter((m) => m.handle?.crumb);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, i) => {
          const label = crumb.handle?.crumb ?? "";
          const last = i === crumbs.length - 1;
          return (
            <span key={crumb.pathname} className="contents">
              <BreadcrumbItem>
                {last ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <Link
                    to={crumb.pathname}
                    className={cn("text-sm text-muted-foreground", linkClass)}
                  >
                    {label}
                  </Link>
                )}
              </BreadcrumbItem>
              {!last ? <BreadcrumbSeparator /> : null}
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
