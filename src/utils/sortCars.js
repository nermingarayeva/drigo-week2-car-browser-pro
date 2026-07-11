export const SORT_OPTIONS = {
    PRICE_ASC: "price-asc",
    PRICE_DESC: "price-desc",
    NAME_ASC: "name-asc",
    NAME_DESC: "name-desc",
  };
  
  const SORTERS = {
    [SORT_OPTIONS.PRICE_ASC]: (a, b) => a.pricePerDay - b.pricePerDay,
    [SORT_OPTIONS.PRICE_DESC]: (a, b) => b.pricePerDay - a.pricePerDay,
    [SORT_OPTIONS.NAME_ASC]: (a, b) => a.name.localeCompare(b.name),
    [SORT_OPTIONS.NAME_DESC]: (a, b) => b.name.localeCompare(a.name),
  };
  

  export function sortCars(cars, sortKey) {
    const sorter = SORTERS[sortKey];
    if (!sorter) {
      return [...cars];
    }
    return [...cars].sort(sorter);
  }
  