import type { Listing, Review } from '../types';

export const MOCK_LISTINGS: Listing[] = [
    {
        "id": 40160,
        "propertyTypeId": 1,
        "name": "Beautiful and cozy apartment close to city center",
        "externalListingName": "Beautiful and cozy apartment close to city center",
        "internalListingName": "Property #3",
        "description": "In a classic Bremerhaven house we rent out our apartment which has a living room, bed room and is close to all the restaurants and nightlife.",
        "houseRules": "Additional rules",
        "keyPickup": "Key pickup",
        "specialInstruction": "Any special instruction",
        "doorSecurityCode": "ddff8",
        "country": "Germany",
        "countryCode": "DE",
        "state": "Bremen",
        "city": "Bremerhaven",
        "street": "Schulstraße 7",
        "address": "Schulstraße 7, Bremerhaven, Bremen 27570, Germany",
        "publicAddress": "Bremerhaven, Bremen 27570, Germany",
        "zipcode": "27570",
        "price": 211.62,
        "starRating": 2.5,
        "averageReviewRating": 9.2,
        "personCapacity": 6,
        "bedroomsNumber": 1,
        "bathroomsNumber": 1,
        "currencyCode": "USD",
        "listingImages": [
            {
                "id": 877,
                "caption": "Kitchen",
                "url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
                "sortOrder": 1
            }
        ]
    },
    {
        "id": 155615,
        "propertyTypeId": 2,
        "name": "The Peckham Apartments",
        "externalListingName": "The Peckham Apartments",
        "internalListingName": "Peckham #1",
        "description": "Modern apartments in the heart of Peckham.",
        "houseRules": "No parties",
        "keyPickup": "Lockbox",
        "specialInstruction": "",
        "doorSecurityCode": "1234",
        "country": "UK",
        "countryCode": "GB",
        "state": "London",
        "city": "London",
        "street": "Peckham High St",
        "address": "Peckham High St, London",
        "publicAddress": "London",
        "zipcode": "SE15",
        "price": 150.00,
        "starRating": 4.5,
        "averageReviewRating": 4.8,
        "personCapacity": 4,
        "bedroomsNumber": 2,
        "bathroomsNumber": 1,
        "currencyCode": "GBP",
        "listingImages": [
            {
                "id": 878,
                "caption": "Living Room",
                "url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
                "sortOrder": 1
            }
        ]
    }
];

export const MOCK_REVIEWS: Review[] = [
    {
        "id": 41,
        "approved": false,
        "type": "host-to-guest",
        "listingMapId": 155615,
        "status": "published",
        "rating": 2,
        "publicReview": "Pauper auxilium asperiores urbs statim astrum deduco sortitus dapifer crudelis. Agnosco pauci comparo urbs.",
        "submittedAt": "2025-06-25T22:25:23.687Z",
        "guestName": "Michelle Ullrich",
        "listingName": "The Peckham Apartments"
    },
    {
        "id": 42,
        "approved": true,
        "type": "host-to-guest",
        "listingMapId": 40160,
        "status": "published",
        "rating": 5,
        "publicReview": "Amazing place! Loved the kitchen.",
        "submittedAt": "2025-06-20T10:00:00.000Z",
        "guestName": "John Doe",
        "listingName": "Property #3"
    },
    {
        "id": 43,
        "approved": false,
        "type": "host-to-guest",
        "listingMapId": 40160,
        "status": "published",
        "rating": 4,
        "publicReview": "Great location but a bit noisy.",
        "submittedAt": "2025-06-21T11:00:00.000Z",
        "guestName": "Jane Smith",
        "listingName": "Property #3"
    }
];
