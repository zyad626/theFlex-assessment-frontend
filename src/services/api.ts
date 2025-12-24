import type { Listing, Review, ReviewResponse } from '../types';
import { MOCK_LISTINGS, MOCK_REVIEWS } from './mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
    getListings: async (): Promise<Listing[]> => {
        try {
            const response = await fetch(`${BASE_URL}/listings`);
            if (!response.ok) throw new Error('Failed to fetch listings');
            return await response.json();
        } catch (error) {
            console.warn('API Error (listings), using mock data:', error);
            return MOCK_LISTINGS;
        }
    },

    getReviews: async (): Promise<Review[]> => {
        try {
            const response = await fetch(`${BASE_URL}/reviews`);
            if (!response.ok) throw new Error('Failed to fetch reviews');
            const data: ReviewResponse = await response.json();
            return data.data.reviews;
        } catch (error) {
            console.warn('API Error (reviews), using mock data:', error);
            return MOCK_REVIEWS;
        }
    },

    approveReview: async (reviewId: number): Promise<boolean> => {
        try {
            const response = await fetch(`${BASE_URL}/reviews/${reviewId}/approve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approved: true }),
            });
            if (!response.ok) throw new Error('Failed to approve review');
            return true;
        } catch (error) {
            console.warn('API Error (approve), mocking success:', error);
            return true;
        }
    },

    getListingById: async (id: number): Promise<Listing | undefined> => {
        const listings = await api.getListings();
        return listings.find(l => l.id === id);
    },

    getReviewsByListingId: async (listingId: number): Promise<Review[]> => {
        const reviews = await api.getReviews();
        return reviews.filter(r => r.listingMapId === listingId);
    }
};
