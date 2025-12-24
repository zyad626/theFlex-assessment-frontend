import React from 'react';
import type { Review } from '../../types';

interface ReviewCardProps {
    review: Review;
    onApprove: (id: number) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onApprove }) => {
    const isApproved = review.approved;

    return (
        <div className={`p-5 rounded-xl border transition-all ${isApproved
                ? 'bg-white border-green-100 shadow-sm'
                : 'bg-yellow-50/50 border-yellow-200 shadow-sm'
            }`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                        {review.guestName.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">{review.guestName}</h4>
                        <span className="text-xs text-gray-500">{new Date(review.submittedAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-sm ${i < review.rating ? 'text-[#284E4C]' : 'text-gray-300'}`}>★</span>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <p className="text-gray-700 leading-relaxed text-sm mb-2">{review.publicReview}</p>
                <div className="text-xs text-gray-500">
                    Stayed at: <span className="font-medium text-gray-900">{review.listingName}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100/50">
                <div className="text-xs font-medium">
                    Status: <span className={isApproved ? 'text-green-600' : 'text-yellow-600'}>
                        {isApproved ? 'Approved' : 'Pending Approval'}
                    </span>
                </div>
                {!isApproved && (
                    <button
                        className="px-3 py-1.5 bg-[#284E4C] hover:bg-[#1f3d3b] text-white text-xs font-medium rounded transition-colors"
                        onClick={() => onApprove(review.id)}
                    >
                        Approve Review
                    </button>
                )}
            </div>
        </div>
    );
};
