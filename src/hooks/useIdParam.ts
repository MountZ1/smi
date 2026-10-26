import { useParams } from "react-router";

export function useIdParam(name = "id"): number | null {
  const raw = useParams()[name];
  const id = Number(raw);

  return raw !== undefined && Number.isInteger(id) && id > 0 ? id : null;
}
