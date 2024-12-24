import { useState } from 'react';
import Tabs from '../../Components/Tabs';
import { Rating } from '../../Components/Rating';
import MultipleImageUpload from '../../Components/MultipleImageUpload';
import { useAddRoomToHotel, useGetHotels, useUploadHotelImages } from '../../../ApiHooks/useHotelHook';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { TrashIcon } from 'lucide-react';
import AmentiesData from '../../../Data/AmenitiesData';

const AddRooms = () => {
    const [roomType, setRoomType] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [rating, setRating] = useState(0);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [roomsName, setRoomsName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [selectedRooms, setSelectedRooms] = useState();
    console.log(selectedRooms)
    const [roomLeft, setRoomLeft] = useState(0);
    const [available, setAvailable] = useState(true);
    const [soldOut, setSoldOut] = useState(false);

    const [testimonials, setTestimonials] = useState([{ name: '', description: '', rating: 0 }]);
    const { mutate: uploadImages } = useUploadHotelImages();
    const { mutate: addRooms } = useAddRoomToHotel();

    const { data: hotels } = useGetHotels();
    console.log(hotels);

    const hotelOptions = hotels?.hotels?.map((hotel) => ({
        value: hotel._id,
        label: hotel.name,
    })) || [];

    const handleImageUploadSuccess = (images) => {
        setIsUploading(true);
        uploadImages(images, {
            onSuccess: (data) => {
                setImagesUrls((prevUrls) => [...prevUrls, ...data.imageUrls]);
                toast.success('Images uploaded successfully');
            },
            onError: (error) => toast.error('Error uploading images: ' + error.message),
            onSettled: () => setIsUploading(false),
        });
    };

    const handleSubmitClick = () => {
        if (!roomsName || !description || price <= 0 || discountedPrice <= 0 || roomLeft < 0 || !roomType) {
            toast.error('Please fill in all required fields.');
            return;
        }

        if (discountedPrice > price) {
            toast.error('Discounted price cannot exceed the original price.');
            return;
        }

        const roomsData = {
            roomType: roomType, // Ensure this matches the enum values
            roomNumber: roomsName, // Parse roomNumber to a number
            description: description.trim(), // Ensure no leading/trailing spaces
            roomLeft: Number(roomLeft), // Parse roomLeft to a number
            amenities: amenities.map((amenity) => amenity.value),
            rating: Math.min(5, Math.max(0, Number(rating))), // Ensure rating is between 0 and 5
            images: imagesUrls,
            available: available,
            soldOut: soldOut,
            price: Number(price), // Parse price to a number
            discountedPrice: Number(discountedPrice), // Parse discountedPrice to a number
            testimonials: testimonials.map((testimonial) => ({
                ...testimonial,
                rating: Math.min(5, Math.max(0, Number(testimonial.rating))), // Ensure testimonial rating is valid
            })),
        };


        const requestData = {
            hotelId: selectedRooms.value, // Pass hotelId as a separate field
            roomDetails: [roomsData],   // Pass the room data as an array
        };
        console.log('Submitting room Data:', requestData);

        addRooms(requestData, {
            onSuccess: () => {
                toast.success('Room added successfully');
                resetForm();
            },
            onError: (error) => toast.error('Error: ' + error.message),
        });
    };

    const resetForm = () => {
        setRoomsName('');
        setDescription('');
        setPrice(0);
        setDiscountedPrice(0);
        setAmenities([]);
        setRating(0);
        setImagesUrls([]);
        setSelectedRooms([]);
        setRoomLeft(0);
        setAvailable(true);
        setSoldOut(false);
        setRoomType('');
        setTestimonials([{ name: '', description: '', rating: 0 }]);
    };

    const handleAddTestimonial = () => {
        setTestimonials([...testimonials, { name: '', description: '', rating: 0 }]);
    };

    const handleTestimonialChange = (index, field, value) => {
        const updatedTestimonials = testimonials.map((testimonial, i) =>
            i === index ? { ...testimonial, [field]: value } : testimonial
        );
        setTestimonials(updatedTestimonials);
    };

    const handleDeleteTestimonial = (index) => {
        setTestimonials(testimonials.filter((_, i) => i !== index));
    };

    const tabNames = ['Add Room', 'Gallery', 'Customer Reviews'];
    const tabContent = {
        'Add Room': <div className="space-y-6 p-6 bg-white ">
            <div className='flex justify-between'>
                <label className="flex items-center space-x-3">
                    <span className="text-2xl font-semibold">Rating:</span>
                    <Rating seiInitialRating={setRating} />
                </label>
                Step1
            </div>
            <div className='flex gap-4'>

                <div className='flex flex-col w-full'>
                    <label className="block text-2xl font-semibold mb-2">Room Name</label>
                    <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter room name" value={roomsName} onChange={(e) => setRoomsName(e.target.value)} />

                </div>

                <div className="w-full">
                    <label className="block text-2xl font-semibold mb-2">Room Type</label>
                    <Select
                        options={[
                            { value: 'single', label: 'Single' },
                            { value: 'double', label: 'Double' },
                            { value: 'suite', label: 'Suite' },
                            { value: 'deluxe', label: 'Deluxe' },
                        ]}
                        value={{ value: roomType, label: roomType }}
                        onChange={(option) => setRoomType(option?.value || '')}
                        placeholder="Select Room Type"
                    />
                </div>
            </div>

            <label className="block text-2xl font-semibold mb-2">Description</label>
            <textarea className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <div className='flex justify-between gap-6'>
                <div className="w-full">
                    <h2 className="text-2xl font-semibold mb-4">Select Hotels</h2>
                    <Select
                        // isMulti
                        options={hotelOptions}
                        value={selectedRooms}
                        onChange={setSelectedRooms}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Hotels"
                    />
                </div>

                <label className="flex w-full flex-col gap-6">
                    <span className="text-2xl font-semibold">Ammenities</span>
                    <Select
                        isMulti
                        options={AmentiesData}
                        value={amenities}
                        onChange={setAmenities}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Amenities"
                    />
                </label>

            </div>

            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block text-2xl font-semibold mb-2">Price</label>
                    <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                </div>
                <div className="flex-1">
                    <label className="block text-2xl font-semibold mb-2">Discounted Price</label>
                    <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Enter discounted price" value={discountedPrice} onChange={(e) => setDiscountedPrice(parseFloat(e.target.value))} />
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block text-2xl font-semibold mb-2">Rooms Left</label>
                    <input className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Enter rooms left" value={roomLeft} onChange={(e) => setRoomLeft(parseInt(e.target.value))} />
                </div>
                <div className="flex-1">
                    <label className="block text-2xl font-semibold mb-2">Available</label>
                    <input
                        type="checkbox"
                        checked={available}
                        onChange={(e) => setAvailable(e.target.checked)}
                        className="w-6 h-6 mt-2 border rounded"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-2xl font-semibold mb-2">Sold Out</label>
                    <input
                        type="checkbox"
                        checked={soldOut}
                        onChange={(e) => setSoldOut(e.target.checked)}
                        className="w-6 h-6 mt-2 border rounded"
                    />
                </div>
            </div>

        </div>,

        Gallery: <div className="p-6 ">
            <div className='flex justify-between'>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 ">Upload Your Images</h2>
                Step2
            </div>

            <MultipleImageUpload onUploadSuccess={handleImageUploadSuccess} imagesUrls={imagesUrls} isUploading={isUploading} />
        </div>,

        'Customer Reviews': <div className="p-6 space-y-4">
            <div className='flex justify-between flex-wrap'>
                <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                <button className="bg-gradient-to-r w-[150px]  from-blue-500 to-indigo-600 text-white p-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all" onClick={handleSubmitClick}>Submit</button>
            </div>
            <div className="flex flex-wrap gap-6 w-full ">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="p-4 border flex flex-col rounded-lg space-y-2 w-full sm:w-96 md:w-[47%] "
                    >
                        <div className="flex gap-4 flex-wrap justify-between">
                            <div className='flex gap-4 flex-wrap'>
                                <input
                                    type="text"
                                    placeholder="Customer Name"
                                    value={testimonial.name}
                                    onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                                    className="w-full sm:w-40 p-2 border rounded-lg"
                                />

                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            onClick={() => handleTestimonialChange(index, 'rating', star)}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={star <= testimonial.rating ? "#F59E0B" : "#D1D5DB"}
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6 cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.999 1.49l2.93 5.93 6.54.953-4.735 4.62 1.117 6.516-5.852-3.076-5.852 3.076 1.117-6.516-4.735-4.62 6.54-.953 2.93-5.93z"
                                            />
                                        </svg>
                                    ))}
                                </div>

                            </div>

                            <button
                                onClick={() => handleDeleteTestimonial(index)}
                                className="text-red-500 py-1 px-3 rounded-lg"
                            >
                                <TrashIcon />
                            </button>
                        </div>

                        <textarea
                            placeholder="Review Description"
                            value={testimonial.description}
                            onChange={(e) => handleTestimonialChange(index, 'description', e.target.value)}
                            className="w-full p-2 h-36 border rounded-lg"
                        />

                    </div>
                ))}
            </div>
            <button
                onClick={handleAddTestimonial}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
                Add More
            </button>
        </div>
    };

    return (
        <div className="bg-gray-50 min-h-screen py-4 flex flex-col pb-5">
            <h1 className='text-[32px] font-bold pb-8 px-10'>Add Room</h1>
            <Tabs tabNames={tabNames} tabContent={tabContent} isUploading={isUploading} />
        </div>
    );
};

export default AddRooms;
