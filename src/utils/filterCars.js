export function filterCars(cars, filters, favoriteIds = []) {
    const {
      search = "",
      transmission = "all",
      types = [],
      availableOnly = false,
      minPrice = null,
      maxPrice = null,
      seats = "all",
      favoritesOnly = false,
    } = filters;
  
    const normalizedSearch = search.trim().toLowerCase();
  
    return cars.filter((car) => {
      if (normalizedSearch && !car.name.toLowerCase().includes(normalizedSearch)) {
        return false;
      }
  
      if (transmission !== "all" && car.transmission !== transmission) {
        return false;
      }
  
      if (types.length > 0 && !types.includes(car.type)) {
        return false;
      }
  
      if (availableOnly && !car.available) {
        return false;
      }
  
      if (minPrice !== null && !Number.isNaN(minPrice) && car.pricePerDay < minPrice) {
        return false;
      }
      if (maxPrice !== null && !Number.isNaN(maxPrice) && car.pricePerDay > maxPrice) {
        return false;
      }
  
      if (seats !== "all" && Number(seats) !== car.seats) {
        return false;
      }
  
      if (favoritesOnly && !favoriteIds.includes(car.id)) {
        return false;
      }
  
      return true;
    });
  }
  