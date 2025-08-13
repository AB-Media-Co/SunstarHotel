import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className="bg-primary-green text-primary-white transition-all duration-300">
            <div className="content mx-auto  md:pt-12 pt-6 pb-6">
                {/* Top Section */}
                <div className="flex flex-col  md:flex-row justify-between items-start gap-4 md:gap-12 md:mb-4">
                    <div className='flex flex-col gap-4'>

                        <Link to='/' className="md:flex hidden  items-start space-y-2 transform hover:scale-105 transition-all duration-300">
                            <img src="/images/Logo/logo.svg" alt="Logo" className='w-[180px] md:w-[200px]' />
                        </Link>

                        <div className="md:flex hidden  gap-6 lg:w-[200px]">
                            <a href="https://www.instagram.com/hotel_sunstar_group?igsh=MWxscGl6NHgxdTd2bw=="
                                className="flex items-center gap-3 hover:text-primary-yellow transition-all duration-300 group">
                                <InstagramIcon className=' border-yellow-500 rounded-lg group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300' />
                            </a>
                            <a href="https://www.facebook.com/HotelSunstarGroup/"
                                className="flex items-center gap-3 hover:text-primary-yellow transition-all duration-300 group">
                                <FacebookIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300' />
                            </a>
                            <a href="https://www.youtube.com/@HotelSunstargroup"
                                className="flex items-center gap-3 hover:text-primary-yellow transition-all duration-300 group">
                                <YouTubeIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300' />
                            </a>
                            <a href="https://www.linkedin.com/company/hotelsunstargroup/"
                                className="flex items-center gap-3 hover:text-primary-yellow transition-all duration-300 group">
                                <LinkedInIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300' />
                            </a>

                            <a href="https://in.pinterest.com/hotel_sunstar_group/"
                                className="flex items-center gap-3 hover:text-primary-yellow transition-all duration-300 group">
                                <PinterestIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300' />
                            </a>
                        </div>
                    </div>


                    {/* Logo Section */}
                    <div className='flex flex-col gap-4 md:hidden border-b border-[#67D0CF] pb-4 w-full justify-between items-start'>

                        <Link to='/' className="flex flex-col items-start space-y-2 transform hover:scale-105 transition-all duration-300">
                            <img src="/images/Logo/logo.svg" alt="Logo" className='w-[160px]' />
                        </Link>

                        <div className="md:hidden gap-6 flex">
                            <a href="https://www.instagram.com/hotel_sunstar_group?igsh=MWxscGl6NHgxdTd2bw==">
                                <InstagramIcon className=' border-yellow-500 rounded-lg group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300 ' style={{ fontSize: "30px" }} /> {/* w-10 sets width to 2.5rem (40px) */}                            </a>
                            <a href="https://www.facebook.com/HotelSunstarGroup/">
                                <FacebookIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300  ' style={{ fontSize: "30px" }} />
                            </a>
                            <a href="https://www.youtube.com/@sunstaradmin6584">
                                <YouTubeIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300 ' style={{ fontSize: "30px" }} />
                            </a>
                            <a href="https://www.linkedin.com/company/hotelsunstargroup/">
                                <LinkedInIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300 ' style={{ fontSize: "30px" }} />
                            </a>

                            <a href="https://in.pinterest.com/hotel_sunstar_group/"
                                className="flex items-center gap-3 hover:text-primary-yellow transition-all duration-300 group">
                                <PinterestIcon className=' border-yellow-500 rounded-lg  group-hover:bg-primary-yellow group-hover:text-primary-green transition-all duration-300' />
                            </a>
                        </div>
                    </div>


                    <div className='flex md:hidden w-full gap-[20px] flex-col justify-between'>
                        <Link to='/why-sunstar' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Why Sunstar</Link>
                        <Link to='/loyalty-program' state={{ tab: 'loyalty' }} className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Loyalty Program</Link>
                        <Link to='/dayuseroom' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Day Use Rooms</Link>

                        <Link to='/developers&owners' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Dev & Owners</Link>
                        <Link to='/eventandconference' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Events & Conference</Link>


                        <Link to='/tour&travel' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Tour & Travel</Link>
                        <Link to='/travel-agent' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Travel Agents</Link>
                        <Link to='/in-the-media' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">In the Media</Link>


                        {/* <div className='bg-[#66D7D6] h-[6rem] w-[1px]'></div> */}
                    </div>
                    <div className="flex md:hidden border-t border-b py-2 border-[#67D0CF] w-full justify-between">
                        <Link to='/contact' className="cursor-pointer hover:text-primary-yellow transition-all duration-300 ">Contact</Link>
                        <hr className='bg-[#66D7D6] h-[1.5rem] w-[1.5px]' />
                        <Link to='/corporate-booking' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Coorporate Booking</Link>
                        <hr className='bg-[#66D7D6] h-[1.5rem] w-[1.5px]' />
                        <Link to='/sunstar-blogs' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Blog & Buzz</Link>
                    </div>

                    {/* <div className='bg-[#66D7D6] md:hidden w-[100%] h-[1px]' /> */}





                    {/* Navigation Links */}
                    <div className='md:flex hidden justify-around w-full'>
                        <div className="flex flex-col space-y-3">
                            <Link to='/why-sunstar' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Why Sunstar</Link>
                            <Link to='/loyalty-program'  className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Loyalty Program</Link>
                            <Link to='/contact' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Contact</Link>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Link to='/corporate-booking' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Coorporate Booking</Link>
                            <Link to='/dayuseroom' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Day Use Rooms</Link>
                            <Link to='/developers&owners' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Developers & Owners</Link>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Link to='/eventandconference' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Events & Conference</Link>
                            <Link to='/sunstar-blogs' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Blog & Buzz</Link>
                            <Link to='/career' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Career</Link>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <Link to='/tour&travel' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Tour & Travel</Link>
                            <Link to='/travel-agent' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">Travel Agents</Link>
                            <Link to='/in-the-media' className="cursor-pointer hover:text-primary-yellow transition-all duration-300">In the Media</Link>
                        </div>
                    </div>


                </div>

                {/* Divider */}
                <div className="my-6 md:block hidden">
                    <hr className="border-gray-300 opacity-30" />
                </div>

                {/* Bottom Section */}
                <div className="md:flex hidden px-4 md:flex-row gap-6 md:items-center justify-center text-sm">
                    <span className="hover:text-primary-yellow transition-all duration-300">
                        © {new Date().getFullYear()} Sunstar Hospitality. All rights reserved.
                    </span>
                    <hr className='bg-primary-white h-[20px] w-[1px] opacity-30' />
                    <Link to="/terms-conditions&cancellation" className="hover:text-primary-yellow transition-all duration-300">T & C and Cancellation Policy</Link>
                    <hr className='bg-primary-white h-[20px] w-[1px] opacity-30' />
                    <Link to="/privacy-policies" className="hover:text-primary-yellow transition-all duration-300">Privacy Policy</Link>
                </div>



                {/* <div className="mt-4 md:hidden">
                    <hr className="border-gray-300 opacity-30" />
                </div> */}


                <div className="flex  md:hidden mt-2 gap-4 items-center border-b  border-[#67D0CF] py-2 justify-around w-full text-sm">
                    <a href="/terms-conditions&cancellation" className="hover:text-primary-yellow transition-all duration-300">Terms & Conditions</a>
                    <hr className='bg-[#66D7D6] h-[1.5rem] w-[1.5px]' />
                    <a href="/privacy-policies" className="hover:text-primary-yellow transition-all duration-300">Privacy & Cookie Policy</a>
                </div>
                <div className="hover:text-primary-yellow mx-4 pt-2 transition-all duration-300 text-center text-sm md:hidden">
                    © {new Date().getFullYear()} Sunstar Hospitality. All rights reserved.
                </div>

            </div>
        </footer>
    );
}

export default Footer;
