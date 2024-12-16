import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';import { Link } from 'react-router-dom';
 const Footer = () => {
    return (
        <div className="bg-[#4DB8B6] text-white">
            <div className="content py-5 px-4 pt-[88px]">
                <div className="flex justify-between items-start flex-wrap">

                    <Link
                        to='/'
                        className={`text-2xl font-bold`}

                    >
                        <img src="/images/Logo/logo.svg" alt="Logo" />
                    </Link>
                    <div className="flex space-x-4 items-start">
                        <div className="flex flex-col space-y-2">
                            <a className="cursor-pointer hover:underline">Contact</a>
                            <a className="cursor-pointer hover:underline">Careers</a>
                            <a className="cursor-pointer hover:underline">Blog & Buzz</a>
                            <a className="cursor-pointer hover:underline">Hotels</a>
                        </div>
                    </div>
                    <div className="flex items-start flex-col m-0 space-y-2">
                        <a className="cursor-pointer hover:underline">Why Sunstar</a>
                        <a className="cursor-pointer hover:underline">Loyalty Program</a>
                        <a className="cursor-pointer hover:underline">Developers & Owners</a>
                    </div>
                    <div className="flex items-start flex-col space-y-2">
                        <a href="https://instagram.com" className="flex items-center space-x-2 hover:text-gray-300">
                            <InstagramIcon style={{ color: '#FFF' }} />
                            <span>Instagram</span>
                        </a>
                        <a href="https://facebook.com" className="flex items-center space-x-2 hover:text-gray-300">
                            <FacebookIcon style={{ color: '#FFF' }} />
                            <span>Facebook</span>
                        </a>
                        <a href="https://youtube.com" className="flex items-center space-x-2 hover:text-gray-300">
                            <YouTubeIcon style={{ color: '#FFF' }} />
                            <span>YouTube</span>
                        </a>
                    </div>
                </div>
                <hr className="w-[100%] my-6" />
                <p className="text-center tracking-widest text-xs mt-4">
                    © 2024 Sunstar Hospitality | Terms & Conditions | Cancellation Policy | Privacy & Cookie Policy
                </p>
                <p className="text-center tracking-widest text-xs mt-4">
                    At Hotel Sunstar Group we understand that customers care about the use and storage of their personal information and data and we value your trust in allowing us to do this in a careful and sensible manner. Hotel Sunstar Group will always handle information in compliance with the Data Protection Act (1998).
                </p>
            </div>
        </div>
    );
}

export default Footer;
