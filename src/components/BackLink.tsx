import { Link, useLocation, useNavigate, type To } from "react-router";

interface BackLinkProps {
  fallback: To;
  children: string;
}

export function BackLink({ fallback, children }: BackLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const hasHistory = location.key !== "default";

  return (
    <Link
      to={fallback}
      onClick={(event) => {
        if (!hasHistory) return;
        event.preventDefault();
        navigate(-1);
      }}
      className="inline-block text-sm text-muted-foreground hover:text-foreground"
    >
      ← {children}
    </Link>
  );
}
