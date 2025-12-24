export interface ListingImage {
  id: number;
  caption: string;
  url: string;
  sortOrder: number;
}

export interface Listing {
  id: number;
  propertyTypeId: number;
  name: string;
  externalListingName: string;
  internalListingName: string;
  description: string;
  houseRules: string;
  keyPickup: string;
  specialInstruction: string;
  doorSecurityCode: string;
  country: string;
  countryCode: string;
  state: string;
  city: string;
  street: string;
  address: string;
  publicAddress: string;
  zipcode: string;
  price: number;
  starRating: number;
  averageReviewRating: number;
  personCapacity: number;
  bedroomsNumber: number;
  bathroomsNumber: number;
  currencyCode: string;
  listingImages: ListingImage[];
}

export interface Review {
  id: number;
  approved: boolean;
  type: string;
  listingMapId: number; // Corresponds to listing.id
  status: string;
  rating: number;
  publicReview: string;
  submittedAt: string;
  guestName: string;
  listingName: string;
}

export interface ReviewResponse {
  success: boolean;
  data: {
    reviews: Review[];
  };
}
