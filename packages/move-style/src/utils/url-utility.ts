import qs from "qs";

export function parseQuery() {
  const search = location.search;
  if (!search) {
    return {};
  }

  const query = qs.parse(search.substring(1));
  return query;
}
