export interface LandListing {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  acres: number;
  price: number;
  pricePerAcre: number;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
}

// Sample land listings database
export const landListings: LandListing[] = [
  {
    id: "1",
    address: "5247 Mountain View Rd",
    city: "Asheville",
    state: "NC",
    zipCode: "28805",
    acres: 45.5,
    price: 285000,
    pricePerAcre: 6263,
    description: "Beautiful mountain property with forest cover and creek access",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-7049fae79e74?w=400",
    lat: 35.5951,
    lng: -82.5515,
  },
  {
    id: "2",
    address: "1823 Prairie Road",
    city: "Austin",
    state: "TX",
    zipCode: "78741",
    acres: 25.0,
    price: 450000,
    pricePerAcre: 18000,
    description: "Hill country land with stunning views and development potential",
    imageUrl: "https://images.unsplash.com/photo-1500595046891-fdf4eb47e2a1?w=400",
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    id: "3",
    address: "2156 Valley Lane",
    city: "Sedona",
    state: "AZ",
    zipCode: "86336",
    acres: 35.0,
    price: 520000,
    pricePerAcre: 14857,
    description: "Red rock terrain with incredible sunset views",
    imageUrl: "https://images.unsplash.com/photo-1500481768246-8e2c8ef64b81?w=400",
    lat: 34.8697,
    lng: -111.7597,
  },
  {
    id: "4",
    address: "4521 Orchard Path",
    city: "Ithaca",
    state: "NY",
    zipCode: "14850",
    acres: 52.3,
    price: 195000,
    pricePerAcre: 3729,
    description: "Fertile agricultural land with barn and equipment shed",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-7049fae79e74?w=400",
    lat: 42.4534,
    lng: -76.4735,
  },
  {
    id: "5",
    address: "7834 Woodland Drive",
    city: "Asheville",
    state: "NC",
    zipCode: "28806",
    acres: 20.0,
    price: 125000,
    pricePerAcre: 6250,
    description: "Wooded land perfect for cabin or retreat",
    imageUrl: "https://images.unsplash.com/photo-1500481768246-8e2c8ef64b81?w=400",
    lat: 35.5951,
    lng: -82.5515,
  },
  {
    id: "6",
    address: "3412 Ranch Road",
    city: "Nashville",
    state: "TN",
    zipCode: "37201",
    acres: 65.0,
    price: 325000,
    pricePerAcre: 5000,
    description: "Prime ranch land with excellent fencing and water access",
    imageUrl: "https://images.unsplash.com/photo-1500595046891-fdf4eb47e2a1?w=400",
    lat: 36.1627,
    lng: -86.7816,
  },
  {
    id: "7",
    address: "9087 Spring Valley Way",
    city: "Boulder",
    state: "CO",
    zipCode: "80301",
    acres: 40.0,
    price: 680000,
    pricePerAcre: 17000,
    description: "Mountain property with views of the Flatirons",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-7049fae79e74?w=400",
    lat: 40.0150,
    lng: -105.2705,
  },
  {
    id: "8",
    address: "2345 Lake Shore Drive",
    city: "Portland",
    state: "OR",
    zipCode: "97202",
    acres: 18.5,
    price: 385000,
    pricePerAcre: 20811,
    description: "Waterfront property with lake access and mature trees",
    imageUrl: "https://images.unsplash.com/photo-1500481768246-8e2c8ef64b81?w=400",
    lat: 45.5017,
    lng: -122.6750,
  },
  {
    id: "9",
    address: "5678 Meadow Creek Rd",
    city: "Boone",
    state: "NC",
    zipCode: "28607",
    acres: 30.0,
    price: 145000,
    pricePerAcre: 4833,
    description: "High elevation property with creek and privacy",
    imageUrl: "https://images.unsplash.com/photo-1500595046891-fdf4eb47e2a1?w=400",
    lat: 36.2174,
    lng: -81.6744,
  },
  {
    id: "10",
    address: "1234 Desert Sky Lane",
    city: "Tucson",
    state: "AZ",
    zipCode: "85704",
    acres: 55.0,
    price: 220000,
    pricePerAcre: 4000,
    description: "Desert land with mountain views and well on property",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-7049fae79e74?w=400",
    lat: 32.1716,
    lng: -110.9265,
  },
];

export function searchLand(filters: {
  city?: string;
  state?: string;
  zipCode?: string;
  minAcres?: number;
  maxPrice?: number;
  minPrice?: number;
}): LandListing[] {
  return landListings.filter((land) => {
    if (filters.city && !land.city.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }
    if (filters.state && land.state !== filters.state.toUpperCase()) {
      return false;
    }
    if (filters.zipCode && !land.zipCode.includes(filters.zipCode)) {
      return false;
    }
    if (filters.minAcres && land.acres < filters.minAcres) {
      return false;
    }
    if (filters.minPrice && land.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && land.price > filters.maxPrice) {
      return false;
    }
    return true;
  });
}
