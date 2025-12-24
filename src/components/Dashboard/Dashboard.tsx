import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../../services/api';
import type { Listing, Review } from '../../types';
import { PropertyCard } from '../PropertyCard/PropertyCard';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { Header } from './Header';

export const Dashboard: React.FC = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [selectedListingId, setSelectedListingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [listingsData, reviewsData] = await Promise.all([
                    api.getListings(),
                    api.getReviews()
                ]);
                setListings(listingsData);
                setReviews(reviewsData);
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleApprove = async (reviewId: number) => {
        const success = await api.approveReview(reviewId);
        if (success) {
            setReviews(prev => prev.map(r =>
                r.id === reviewId ? { ...r, approved: true } : r
            ));
        }
    };

    const filteredReviews = useMemo(() => {
        if (!selectedListingId) return reviews;
        // Map listing.id to listingMapId in review
        return reviews.filter(r => r.listingMapId === selectedListingId);
    }, [reviews, selectedListingId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-2xl text-[#284E4C]">Loading dashboard...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
                <section className="h-[calc(100vh-100px)] overflow-y-auto pr-2">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Properties</h2>
                        <p className="text-sm text-gray-500">{listings.length} Listings managed</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div
                            className={`p-4 bg-white rounded-lg border-2 cursor-pointer shadow-sm hover:bg-gray-50 transition-colors ${selectedListingId === null
                                ? 'border-[#284E4C] bg-teal-50 text-[#284E4C]'
                                : 'border-transparent'
                                }`}
                            onClick={() => setSelectedListingId(null)}
                        >
                            <h3 className="font-semibold text-lg">All Reviews</h3>
                            <p className="text-sm text-gray-600">View reviews for all properties</p>
                        </div>
                        {listings.map(listing => (
                            <PropertyCard
                                key={listing.id}
                                listing={listing}
                                isSelected={selectedListingId === listing.id}
                                onClick={() => setSelectedListingId(listing.id)}
                            />
                        ))}
                    </div>
                </section>

                <section className="h-[calc(100vh-100px)] overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
                        <p className="text-sm text-gray-500">{filteredReviews.length} reviews found</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {filteredReviews.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200 text-gray-500">
                                No reviews found for this selection.
                            </div>
                        ) : (
                            filteredReviews.map(review => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    onApprove={handleApprove}
                                />
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};
