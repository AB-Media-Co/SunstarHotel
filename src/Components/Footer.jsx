import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className="bg-gradient-to-r from-[#4DB8B6] to-[#3A8B8A] text-primary-white">
            <div className="content mx-auto pt-10  py-4">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Logo Section */}
                    <Link to='/' className="flex flex-col items-start space-y-2">
                        <img src="/images/Logo/logo.svg" alt="Logo" className='w-[150px] md:w-[250px]' />
                    </Link>

                    {/* Navigation Links */}
                    <div className='flex justify-between md:justify-around w-full'>
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
                    <div className="flex flex-col space-y-4 lg:w-[300px]">
                        <a href="https://www.instagram.com/hotel_sunstar_group?igsh=MWxscGl6NHgxdTd2bw==" className="flex items-center gap-3 hover:text-gray-200">
                            <InstagramIcon className='border border-yellow-500 rounded-lg p-1' />
                            <span>Instagram</span>
                        </a>
                        <a href="https://www.facebook.com/share/1DZTntasMP/" className="flex items-center gap-3 hover:text-gray-200">
                            <FacebookIcon className='border border-yellow-500 rounded-lg p-1' />
                            <span>Facebook</span>
                        </a>
                        <a href="https://youtube.com/@travelwithpriya-mk1ko?si=xz0moIn6eGxVRvaI" className="flex items-center gap-3 hover:text-gray-200">
                            <YouTubeIcon className='border border-yellow-500 rounded-lg p-1' />
                            <span>YouTube</span>
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-4 md:block hidden">
                    <hr className="border-gray-300" />
                </div>

                {/* Bottom Section */}
                <div className="md:flex hidden md:flex-row gap-4 md:items-center justify-center">
                    <a href="#" className="hover:underline">©2024 Sunstar Hospitality  </a>
                    <hr className='bg-primary-white h-[20px] w-[1px]'/>
                    <a href="#" className="hover:underline">Terms & Conditions </a>
                    <hr className='bg-primary-white h-[20px] w-[1px]'/>
                    <a href="#" className="hover:underline">Cancellation Policy </a>
                    <hr className='bg-primary-white h-[20px] w-[1px]'/>
                    <a href="#" className="hover:underline">Privacy & Cookie Policy</a>
                </div>
                <div className="flex flex-col md:hidden  gap-4  mt-6 justify-center">
                    <a href="#" className="hover:underline">Terms & Conditions </a>
                    <a href="#" className="hover:underline">Cancellation Policy </a>
                    <a href="#" className="hover:underline">Privacy & Cookie Policy</a>
                </div>

                <div className="my-4  md:hidden">
                    <hr className="border-gray-300" />
                </div>

                {/* Disclaimer */}
                <div className="mt-2 text-xs flex justify-center items-center text-center text-gray-200 font-light">
                    <p className='md:w-[900px]'>
                        At Hotel Sunstar Group we understand that customers care about the use and storage of their
                        personal information and data and we value your trust in allowing us to do this in a careful and
                        sensible manner. Hotel Sunstar Group will always handle information in compliance with the Data
                        Protection Act (1998).

                    </p>
                </div>

                <div className="my-4 md:hidden">
                    <hr className="border-gray-300" />
                </div>

                <div className="hover:underline text-xs md:hidden text-center">©2024 Sunstar Hospitality  </div>

            </div>
        </footer>
    );
}

export default Footer;
