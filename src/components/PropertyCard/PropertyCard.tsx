import React from 'react';
import { Link } from 'react-router-dom';
import type { Listing } from '../../types';

interface PropertyCardProps {
    listing: Listing;
    isSelected: boolean;
    onClick: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ listing, isSelected, onClick }) => {
    const imageUrl = listing.listingImages.length > 0 ? listing.listingImages[0].url : 'https://via.placeholder.com/300';

    return (
        <div
            className={`flex gap-4 p-4 bg-white rounded-lg border-2 cursor-pointer shadow-sm hover:bg-gray-50 transition-all ${isSelected ? 'border-[#284E4C] bg-teal-50' : 'border-transparent'
                }`}
            onClick={onClick}
        >
            <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                <img src={imageUrl} alt={listing.name} className="w-full h-full object-cover" />
                <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-0.5 shadow-sm">
                    <span className="text-yellow-500">★</span> {listing.averageReviewRating}
                </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900 truncate">{listing.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{listing.city}, {listing.country}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500 flex gap-2">
                        <span>{listing.bedroomsNumber} Beds</span>
                        <span>•</span>
                        <span>{listing.bathroomsNumber} Baths</span>
                    </div>
                </div>
                <Link
                    to={`/property/${listing.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block mt-2 px-3 py-1.5 bg-[#284E4C] hover:bg-[#1f3d3b] text-white text-xs font-medium rounded transition-colors self-start"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};
