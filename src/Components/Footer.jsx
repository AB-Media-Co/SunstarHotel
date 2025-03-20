import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className="bg-primary-green text-primary-white transition-all duration-300">
            <div className="content mx-auto pt-12 pb-6">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-8">
                    {/* Logo Section */}
                    <Link to='/' className="flex flex-col items-start space-y-2 transform hover:scale-105 transition-all duration-300">
                        <img src="/images/Logo/logo.svg" alt="Logo" className='w-[150px] md:w-[250px]' />
                    </Link>

                    {/* Navigation Links */}
                    <div className='flex justify-around w-full'>
                        <div className="flex flex-col space-y-3">
                            <Link to='/contact' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Contact</Link>
                            <Link to='/corporate-booking' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Coorporate Booking</Link>
                            <Link to='/sunstar-blogs' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Blog & Buzz</Link>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Link to='/why-sunstar' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Why Sunstar</Link>
                            <Link to='' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Loyalty Program</Link>
                            <Link to='' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Developers & Owners</Link>
                        </div>
                        <div className="hidden md:flex flex-col space-y-3">
                            <Link to='/coorporatevents' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Corporate Events</Link>
                            <Link to='/socialevents' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Social Events</Link>
                            <Link to='/weddingpreWedding' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Wedding & Pre-Wedding</Link>
                        </div>
                    </div>

                    <div className='flex  justify-around w-full md:w-auto'>
                        <div className="flex md:hidden flex-col space-y-3">
                            <Link to='/coorporatevents' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Corporate Events</Link>
                            <Link to='/socialevents' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Social Events</Link>
                            <Link to='/weddingpreWedding' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Wedding & Pre-Wedding</Link>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex flex-col space-y-3 lg:w-[300px]">
                            <a href="https://www.instagram.com/hotel_sunstar_group?igsh=MWxscGl6NHgxdTd2bw==" 
                               className="flex items-center gap-3 hover:text-primary-yellow transition-all duration-300 group">
                                <InstagramIcon className='border-2 border-yellow-500 rounded-lg p-1.5 group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300' />
                                <span className="text-lg">Instagram</span>
                            </a>
                            <a href="https://www.facebook.com/share/1DZTntasMP/" 
                               className="flex items-center gap-3 hover:text-primary-yellow transition-all duration-300 group">
                                <FacebookIcon className='border-2 border-yellow-500 rounded-lg p-1.5 group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300' />
                                <span className="text-lg">Facebook</span>
                            </a>
                            <a href="https://www.youtube.com/@sunstaradmin6584" 
                               className="flex items-center gap-3 hover:text-primary-yellow transition-all duration-300 group">
                                <YouTubeIcon className='border-2 border-yellow-500 rounded-lg p-1.5 group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300' />
                                <span className="text-lg">YouTube</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-6 md:block hidden">
                    <hr className="border-gray-300 opacity-30" />
                </div>

                {/* Bottom Section */}
                <div className="md:flex hidden md:flex-row gap-6 md:items-center justify-center text-sm">
                    <a href="#" className="hover:text-primary-yellow transition-all duration-300">©2024 Sunstar Hospitality</a>
                    <hr className='bg-primary-white h-[20px] w-[1px] opacity-30' />
                    <Link to="/terms-conditions&cancellation" className="hover:text-primary-yellow transition-all duration-300">T & C  and Cancellation Policy</Link>
                    <hr className='bg-primary-white h-[20px] w-[1px] opacity-30' />
                    <Link to="/privacy-policies" className="hover:text-primary-yellow transition-all duration-300">Privacy Policy</Link>
                </div>

                <div className="flex  md:hidden gap-4 mt-6 justify-around text-sm">
                    <a href="/terms-conditions&cancellation" className="hover:text-primary-yellow transition-all duration-300">T&C and Cancellation Policy</a>
                    <a href="/privacy-policies" className="hover:text-primary-yellow transition-all duration-300">Privacy Policy</a>
                </div>

                <div className="my-4 md:hidden">
                    <hr className="border-gray-300 opacity-30" />
                </div>

                {/* Disclaimer */}
                <div className="mt-6 text-xs flex justify-center items-center text-center text-gray-200 font-light">
                    <p className='md:w-[900px] leading-relaxed'>
                        At Hotel Sunstar Group we understand that customers care about the use and storage of their
                        personal information and data and we value your trust in allowing us to do this in a careful and
                        sensible manner. Hotel Sunstar Group will always handle information in compliance with the Data
                        Protection Act (1998).
                    </p>
                </div>

                <div className="mt-4 md:hidden">
                    <hr className="border-gray-300 opacity-30" />
                </div>

                <div className="hover:text-primary-yellow transition-all duration-300 text-xs md:hidden text-center mt-4">©2024 Sunstar Hospitality</div>
            </div>
        </footer>
    );
}

export default Footer;
