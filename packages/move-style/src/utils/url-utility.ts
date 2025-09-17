import qs from "qs";

export function parseQuery(queryString?: string) {
  if (!queryString) {
    queryString = location.search;
  }

  if (!queryString) {
    return {};
  }
  if (queryString.startsWith("?")) {
    queryString = queryString.substring(1);
  }

  return qs.parse(queryString);
}

export function stringifyQuery(query: Record<string, any>) {
  return qs.stringify(query);
}
