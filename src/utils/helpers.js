export const uncapitalize = (string) =>
  string[0].toLowerCase() + string.slice(1);

export const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

export const processFictionFilters = (filters) => {
  const genre = filters[0] && filters[0] !== "All" ? `genre=${filters[0]}` : "";
  const sort = filters[1] && filters[1] !== "none" ? `sort=${filters[1]}` : "";
  const parts = [genre, sort].filter(Boolean).join("&");
  return parts ? `?${parts}` : "";
};

export const processNonFictionFilters = (filters) => {
  const search = filters[0] ? `search=${filters[0]}` : "";
  const page = filters[1] ? `page=${filters[1]}` : "";
  const limit = filters[2] ? `limit=${filters[2]}` : "";
  const parts = [search, page, limit].filter(Boolean).join("&");
  return parts ? `?${parts}` : "";
};
