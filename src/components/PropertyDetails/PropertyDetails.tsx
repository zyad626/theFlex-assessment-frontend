
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { Listing, Review } from '../../types';
import { Users, Bed, Bath, ArrowLeft, Star, Heart, Share, Wifi, Car, Utensils, Tv, CheckCircle2 } from 'lucide-react';

export const PropertyDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [listing, setListing] = useState<Listing | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const listingId = parseInt(id);
                const [listingData, reviewsData] = await Promise.all([
                    api.getListingById(listingId),
                    api.getReviewsByListingId(listingId)
                ]);
                setListing(listingData || null);
                setReviews(reviewsData.filter(r => r.approved));
            } catch (err) {
                console.error("Failed to fetch property details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!listing) return <div className="p-8 text-center">Property not found</div>;

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            {/* Navbar (Mock) */}
            <nav className="border-b sticky top-0 bg-white z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-[#284E4C]">Manager Dashboard</span>
                    </Link>
                    <div className="flex gap-6 text-sm font-medium text-gray-600">
                        <span className="hidden md:inline">Landlords</span>
                        <span className="hidden md:inline">About Us</span>
                        <span className="hidden md:inline">Careers</span>
                        <span className="hidden md:inline">Contact</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Image Gallery */}
                <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-xl overflow-hidden mb-8">
                    <div className="col-span-2 row-span-2 relative">
                        <img
                            src={listing.listingImages[0]?.url || 'https://via.placeholder.com/800'}
                            alt={listing.listingImages[0]?.caption}
                            className="w-full h-full object-cover hover:opacity-95 transition-opacity"
                        />
                    </div>
                    {listing.listingImages.slice(1, 5).map((img) => (
                        <div key={img.id} className="relative">
                            <img
                                src={img.url}
                                alt={img.caption}
                                className="w-full h-full object-cover hover:opacity-95 transition-opacity"
                            />
                        </div>
                    ))}
                    {listing.listingImages.length < 5 && Array.from({ length: 5 - listing.listingImages.length }).map((_, idx) => (
                        <div key={`placeholder-${idx}`} className="bg-gray-100 flex items-center justify-center text-gray-300">
                            Image Placeholder
                        </div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="mb-8 border-b pb-8">
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-3xl font-bold text-[#333333]">{listing.name}</h1>
                                <div className="flex gap-3">
                                    <button className="p-2 hover:bg-gray-100 rounded-full"><Share className="w-5 h-5" /></button>
                                    <button className="p-2 hover:bg-gray-100 rounded-full"><Heart className="w-5 h-5" /></button>
                                </div>
                            </div>

                            <div className="flex gap-6 text-gray-600 text-sm mb-6">
                                <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {listing.personCapacity} guests</div>
                                <div className="flex items-center gap-2"><Bed className="w-4 h-4" /> {listing.bedroomsNumber} bedrooms</div>
                                <div className="flex items-center gap-2"><Bath className="w-4 h-4" /> {listing.bathroomsNumber} bathrooms</div>
                            </div>

                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">Superhost</span>
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" /> {listing.averageReviewRating}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-10 text-gray-600 leading-relaxed">
                            <h2 className="text-xl font-semibold text-[#333333] mb-4">About this property</h2>
                            <p>{listing.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className="mb-10 border-t pt-10">
                            <h2 className="text-xl font-semibold text-[#333333] mb-6">What this place offers</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 text-gray-600"><Wifi className="w-5 h-5" /> Fast Wifi</div>
                                <div className="flex items-center gap-3 text-gray-600"><Car className="w-5 h-5" /> Free parking</div>
                                <div className="flex items-center gap-3 text-gray-600"><Utensils className="w-5 h-5" /> Kitchen</div>
                                <div className="flex items-center gap-3 text-gray-600"><Tv className="w-5 h-5" /> TV</div>
                            </div>
                            <button className="mt-6 border border-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
                                Show all amenities
                            </button>
                        </div>

                        {/* Reviews Section - NEW */}
                        <div className="mb-10 border-t pt-10">
                            <h2 className="text-2xl font-semibold text-[#333333] mb-2 flex items-center gap-2">
                                <Star className="w-6 h-6 fill-[#284E4C] text-[#284E4C]" />
                                {listing.averageReviewRating} · {reviews.length} Reviews
                            </h2>
                            <p className="text-gray-500 mb-8 text-sm">Only showing approved guest reviews</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {reviews.length > 0 ? reviews.map(review => (
                                    <div key={review.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
                                                {review.guestName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{review.guestName}</div>
                                                <div className="text-sm text-gray-500">{new Date(review.submittedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 mb-3">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? 'fill-[#284E4C] text-[#284E4C]' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {review.publicReview}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-[#284E4C] text-xs font-medium">
                                            <CheckCircle2 className="w-4 h-4" /> Verified Stay
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-2 text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                                        No approved reviews to display yet.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Policies (Visual only) */}
                        <div className="mb-10 border-t pt-10">
                            <h2 className="text-xl font-semibold text-[#333333] mb-6">Stay Policies</h2>
                            <div className="bg-[#F5F5F5] p-6 rounded-lg space-y-4">
                                <div>
                                    <div className="font-semibold mb-1">Check-in</div>
                                    <div className="text-sm text-gray-600">{listing.keyPickup}</div>
                                </div>
                                <div className="border-t border-gray-200 my-2"></div>
                                <div>
                                    <div className="font-semibold mb-1">House Rules</div>
                                    <div className="text-sm text-gray-600">{listing.houseRules}</div>
                                </div>
                            </div>
                        </div>

                        {/* Location (Visual only - Mock) */}
                        <div className="mb-10 border-t pt-10">
                            <h2 className="text-xl font-semibold text-[#333333] mb-6">Where you'll be</h2>
                            <p className="mb-4 text-gray-600">{listing.address}</p>
                            <div className="bg-gray-200 w-full h-80 rounded-xl flex items-center justify-center text-gray-500">
                                Map Component Placeholder
                            </div>
                        </div>
                    </div>

                    {/* Right Column / Sidebar */}
                    <div className="lg:w-[380px]">
                        <div className="sticky top-24 border rounded-xl p-6 shadow-xl bg-white">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <span className="text-2xl font-bold">${listing.price}</span>
                                    <span className="text-gray-600"> / night</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <Star className="w-4 h-4 fill-current" /> {listing.averageReviewRating}
                                </div>
                            </div>

                            <div className="border rounded-lg mb-4 overflow-hidden">
                                <div className="grid grid-cols-2 border-b">
                                    <div className="p-3 border-r">
                                        <div className="text-[10px] font-bold uppercase text-gray-800">Check-in</div>
                                        <div className="text-sm text-gray-600">Add date</div>
                                    </div>
                                    <div className="p-3">
                                        <div className="text-[10px] font-bold uppercase text-gray-800">Check-out</div>
                                        <div className="text-sm text-gray-600">Add date</div>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="text-[10px] font-bold uppercase text-gray-800">Guests</div>
                                    <div className="text-sm text-gray-600">{listing.personCapacity} guests</div>
                                </div>
                            </div>

                            <button className="w-full bg-[#284E4C] text-white py-3 rounded-lg font-semibold hover:bg-[#1f3d3b] transition-colors mb-4">
                                Book now
                            </button>

                            <div className="text-center text-sm text-gray-500 mb-4">
                                You won't be charged yet
                            </div>

                            <div className="space-y-3 text-gray-600">
                                <div className="flex justify-between">
                                    <span className="underline">${listing.price} x 5 nights</span>
                                    <span>${listing.price * 5}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline">Cleaning fee</span>
                                    <span>$60</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline">Service fee</span>
                                    <span>$85</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${(listing.price * 5) + 60 + 85}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Mock */}
            <footer className="bg-[#284E4C] text-white py-12 px-6 mt-12">
                <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold mb-4">Support</h3>
                        <div className="space-y-2 text-sm opacity-80">
                            <div>Help Center</div>
                            <div>Safety information</div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Company</h3>
                        <div className="space-y-2 text-sm opacity-80">
                            <div>About us</div>
                            <div>Careers</div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
