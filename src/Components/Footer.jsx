import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube'; import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="bg-[#4DB8B6] text-white">
            <div className="content py-8 md:py-5 px-4 md:pt-[88px]">
                <div className="flex justify-between  flex-col md:flex-row gap-10 items-start flex-wrap">

                    <Link
                        to='/'
                        className={`text-2xl font-bold`}
                    >
                        <img src="/images/Logo/logo.svg" alt="Logo" className='w-[150px] md:w-full' />
                    </Link>

                    <div className="md:flex space-x-4 items-start hidden">
                        <div className="flex flex-col space-y-2">
                            <a className="cursor-pointer hover:underline">Contact</a>
                            <a className="cursor-pointer hover:underline">Careers</a>
                            <a className="cursor-pointer hover:underline">Blog & Buzz</a>
                            <a className="cursor-pointer hover:underline">Hotels</a>
                        </div>
                    </div>
                    <div className="md:flex items-start flex-col m-0 space-y-2 hidden">
                        <a className="cursor-pointer hover:underline">Why Sunstar</a>
                        <a className="cursor-pointer hover:underline">Loyalty Program</a>
                        <a className="cursor-pointer hover:underline">Developers & Owners</a>
                    </div>
                    <div className='md:hidden flex justify-between w-full'>

                        <div className="flex space-x-4 items-start">
                            <div className="flex flex-col space-y-2 gap-4">
                                <a className="cursor-pointer hover:underline">Contact</a>
                                <a className="cursor-pointer hover:underline">Careers</a>
                                <a className="cursor-pointer hover:underline">Blog & Buzz</a>
                                <a className="cursor-pointer hover:underline">Hotels</a>
                            </div>
                        </div>
                        <div className="flex items-start flex-col m-0 space-y-2 gap-4">
                            <a className="cursor-pointer hover:underline">Why Sunstar</a>
                            <a className="cursor-pointer hover:underline">Loyalty Program</a>
                            <a className="cursor-pointer hover:underline">Developers & Owners</a>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start flex-col space-y-2">
                        <a href="https://instagram.com" className="flex items-center space-x-2   hover:text-gray-300">
                            <InstagramIcon style={{ color: '#FFF' }} className='border-yellow-500 border rounded-lg p-1' />
                            <span>Instagram</span>
                        </a>
                        <a href="https://facebook.com" className="flex items-center space-x-2   hover:text-gray-300">
                            <FacebookIcon style={{ color: '#FFF' }} className='border-yellow-500 border rounded-lg p-1' />
                            <span>Facebook</span>
                        </a>
                        <a href="https://youtube.com" className="flex items-center space-x-2   hover:text-gray-300">
                            <YouTubeIcon style={{ color: '#FFF' }} className='border-yellow-500 border rounded-lg p-1' />
                            <span>YouTube</span>
                        </a>
                    </div>
                </div>
                <hr className="w-[100%] my-6 hidden md:block" />

                <div className="flex mt-8 items-start flex-col m-0 space-y-2 gap-4 md:hidden">
                    <a className="cursor-pointer hover:underline">Terms & Conditions</a>
                    <a className="cursor-pointer hover:underline">Cancellation Policy</a>
                    <a className="cursor-pointer hover:underline">  Privacy & Cookie Policy  </a>
                </div>
                <p className="md:block hidden text-center tracking-widest text-xs mt-4">
                    © 2024 Sunstar Hospitality | Terms & Conditions | Cancellation Policy | Privacy & Cookie Policy
                </p>
                <hr className="w-[100%] my-6 md:hidden" />
                <p className="md:text-center tracking-widest text-xs mt-4">
                    At Hotel Sunstar Group we understand that customers care about the use and storage of their personal information and data and we value your trust in allowing us to do this in a careful and sensible manner. Hotel Sunstar Group will always handle information in compliance with the Data Protection Act (1998).
                </p>
                <hr className="w-[100%] my-2 md:hidden" />
                <p className='text-center text-sm md:hidden'>©2024 Sunstar Hospitality</p>
            </div>
        </div>
    );
}

export default Footer;
