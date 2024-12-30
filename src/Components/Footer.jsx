import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#4DB8B6] to-[#3A8B8A] text-white">
            <div className="container mx-auto px-6 md:px-16 py-12">
                {/* Logo and Links */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Logo Section */}
                    <Link to='/' className="flex flex-col items-start space-y-4">
                        <img src="/images/Logo/logo.svg" alt="Logo" className='w-[150px] md:w-[180px]' />
                        <p className="text-sm md:text-base">Your trusted hospitality partner</p>
                    </Link>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 gap-8 md:flex md:gap-16">
                        <div className="flex flex-col space-y-2">
                            <a href="#" className="cursor-pointer hover:underline">Contact</a>
                            <a href="#" className="cursor-pointer hover:underline">Careers</a>
                            <a href="#" className="cursor-pointer hover:underline">Blog & Buzz</a>
                            <a href="#" className="cursor-pointer hover:underline">Hotels</a>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <a href="#" className="cursor-pointer hover:underline">Why Sunstar</a>
                            <a href="#" className="cursor-pointer hover:underline">Loyalty Program</a>
                            <a href="#" className="cursor-pointer hover:underline">Developers & Owners</a>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex flex-col space-y-4">
                        <a href="https://instagram.com" className="flex items-center gap-3 hover:text-gray-200">
                            <InstagramIcon className='border border-yellow-500 rounded-lg p-1' />
                            <span>Instagram</span>
                        </a>
                        <a href="https://facebook.com" className="flex items-center gap-3 hover:text-gray-200">
                            <FacebookIcon className='border border-yellow-500 rounded-lg p-1' />
                            <span>Facebook</span>
                        </a>
                        <a href="https://youtube.com" className="flex items-center gap-3 hover:text-gray-200">
                            <YouTubeIcon className='border border-yellow-500 rounded-lg p-1' />
                            <span>YouTube</span>
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8">
                    <hr className="border-gray-300" />
                </div>

                {/* Footer Bottom Links */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <a href="#" className="hover:underline">Terms & Conditions</a>
                        <a href="#" className="hover:underline">Cancellation Policy</a>
                        <a href="#" className="hover:underline">Privacy & Cookie Policy</a>
                    </div>
                    <p className="text-center md:text-right text-xs md:text-sm">
                        © 2024 Sunstar Hospitality. All Rights Reserved.
                    </p>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 text-xs text-center text-gray-200">
                    <p>
                        At Hotel Sunstar Group, we value your trust in handling your personal information. We comply with the Data Protection Act (1998).
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
