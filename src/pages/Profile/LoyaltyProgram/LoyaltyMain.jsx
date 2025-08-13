import { Star } from 'lucide-react';
import LoyaltyProgramCard from './LoyaltyProgramCard';

const LoyaltyMain = ({ onViewAll }) => {
    return (
        <>
            <div className="space-y-6 max-w-6xl">
                <h2 className="text-xl md:text-4xl font-bold text-gray-800 mb-6">Loyalty Program</h2>
                <div className="bg-gradient-to-r from-primary-green to-primary-green rounded-lg p-4 md:p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">Gold Member</h3>
                            <p className="text-yellow-100 text-sm md:text-base">You've earned 1,250 points</p>
                        </div>
                        <Star className="w-8 h-8 md:w-12 md:h-12 text-yellow-200" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 text-sm md:text-base">Points Balance</h4>
                        <p className="text-xl md:text-2xl font-bold text-teal-500">1,250</p>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 text-sm md:text-base">Tier Status</h4>
                        <p className="text-base md:text-lg font-semibold text-primary-green">Gold</p>
                    </div>
                    <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 text-sm md:text-base">Next Tier</h4>
                        <p className="text-base md:text-lg font-semibold text-gray-600">Platinum (750 pts)</p>
                    </div>
                </div>

            </div>
            <LoyaltyProgramCard onViewAll={onViewAll} />



        </>
    )
}

export default LoyaltyMain
