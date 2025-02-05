import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useGetRoomById, useUploadHotelImages, useGetHotels, useUpdateRoomById } from "../../../ApiHooks/useHotelHook";
import Tabs from "../../Components/Tabs";
import Select from "react-select";
import { Rating } from "../../Components/Rating";
import MultipleImageUpload from "../../Components/MultipleImageUpload";
import toast from "react-hot-toast";
import AmentiesData from "../../../Data/AmenitiesData";
import { TrashIcon } from 'lucide-react';

const EditRooms = () => {
    const { roomId } = useParams(); // Extract roomId from URL params
    console.log(roomId)
    const { data, isLoading, isError, error } = useGetRoomById(roomId);
    const { data: hotels } = useGetHotels(); // Fetch all hotels for dropdown
    const { mutate: uploadImages, isLoading: isUploading } = useUploadHotelImages();
    const { mutate: updateRoomData } = useUpdateRoomById();

    const [hotel, setHotel] = useState(null); // Selected hotel
    const [roomType, setRoomType] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [description, setDescription] = useState('');
    const [roomLeft, setRoomLeft] = useState(0);
    const [amenities, setAmenities] = useState([]);
    const [rating, setRating] = useState(0);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [available, setAvailable] = useState(true);
    const [soldOut, setSoldOut] = useState(false);
    const [price, setPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [testimonials, setTestimonials] = useState([]);

    // Populate hotel options
    const hotelOptions = hotels?.hotels?.map((hotel) => ({
        value: hotel._id,
        label: hotel.name,
    })) || [];

    // Pre-fill form data when API response is available
    useEffect(() => {
        if (data?.room) {
            const room = data.room;
            setHotel({ value: room.hotel?._id, label: room.hotel?.name });
            setRoomType(room.roomType);
            setRoomNumber(room.roomNumber);
            setDescription(room.description);
            setRoomLeft(room.roomLeft);
            setAmenities(room.amenities.map((amenity) => ({ value: amenity, label: amenity })));
            setRating(room.rating);
            setImagesUrls(room.images);
            setAvailable(room.available);
            setSoldOut(room.soldOut);
            setPrice(room.hotel?.price || 0);
            setDiscountedPrice(room.hotel?.discountedPrice || 0);
            setTestimonials(room.testimonials);
        }
    }, [data]);


    useEffect(() => {
        if (data?.room) {
            const room = data.room;
            setImagesUrls(room.images || []);
        }
    }, [data]);

    const handleImageUploadSuccess = (images) => {
        const formData = new FormData();
        images.forEach((image) => formData.append("images", image));

        // Show loading toast while uploading
        const loadingToast = toast.loading('Uploading images...');

        uploadImages(formData, {
            onSuccess: (response) => {
                setImagesUrls((prevUrls) => [...prevUrls, ...response.imageUrls]);
                toast.success("Images uploaded successfully!", { id: loadingToast });
            },
            onError: (err) => {
                toast.error(`Error uploading images: ${err.message}`, { id: loadingToast });
            },
        });
    };

    const handleRemoveImageUrl = (url) => {
        setImagesUrls((prevUrls) => prevUrls.filter((image) => image !== url));
        toast.success("Image removed successfully!");
    };
    const handleUpdateClick = () => {
        if (!hotel || !roomNumber || !description.trim() || roomLeft < 0 || !roomType || price <= 0 || discountedPrice <= 0) {
            toast.error('Please fill in all required fields.');
            return;
        }

        if (discountedPrice > price) {
            toast.error('Discounted price cannot exceed the original price.');
            return;
        }

        // Ensure roomType is lowercase (to match enum in the schema)
        const formattedRoomType = roomType.toLowerCase();

        if (!['single', 'double', 'suite', 'deluxe'].includes(formattedRoomType)) {
            toast.error('Invalid room type selected.');
            return;
        }

        const updatedData = {
            hotelId: hotel.value,
            roomType: formattedRoomType,
            roomNumber: roomNumber.trim(),
            description: description.trim(),
            roomLeft: Number(roomLeft),
            amenities: amenities.map((amenity) => amenity.value),
            rating: Math.min(5, Math.max(0, Number(rating))),
            images: imagesUrls,
            available,
            soldOut,
            price: Number(price),
            discountedPrice: Number(discountedPrice),
            testimonials: testimonials.map((testimonial) => ({
                name: testimonial.name.trim(),
                description: testimonial.description.trim(),
                rating: Math.min(5, Math.max(0, Number(testimonial.rating))),
            })),
        };

        updateRoomData({ id: roomId, data: updatedData }, {
            onSuccess: () => {
                toast.success('Room updated successfully');
            },
            onError: (error) => {
                console.error('Update Error:', error);
                toast.error('Error: ' + (error?.message || 'Failed to update room.'));
            },
        });
    };


    const handleTestimonialChange = (index, field, value) => {
        const updatedTestimonials = testimonials.map((testimonial, i) =>
            i === index ? { ...testimonial, [field]: value } : testimonial
        );
        setTestimonials(updatedTestimonials);
    };

    const handleAddTestimonial = () => {
        setTestimonials([...testimonials, { name: '', description: '', rating: 0 }]);
    };

    const handleDeleteTestimonial = (index) => {
        setTestimonials(testimonials.filter((_, i) => i !== index));
    };

    const tabNames = ['Edit Room', 'Gallery', 'Customer Reviews'];
    const tabContent = {
        'Edit Room': (
            <div className="space-y-6 p-6 bg-white">

                <label className="block text-2xl font-semibold mb-2">Rating</label>
                <Rating initialRating={rating} setRating={setRating} />

                <div className='flex gap-4'>
                    <div className='w-full'>
                        <label className="block text-2xl font-semibold mb-2">Room Number</label>
                        <input
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                        />
                    </div>
                    <div className='w-full'>
                        <label className="block text-2xl font-semibold mb-2">Room Type</label>
                        <Select
                            options={[
                                { value: 'single', label: 'Single' },
                                { value: 'double', label: 'Double' },
                                { value: 'suite', label: 'Suite' },
                                { value: 'deluxe', label: 'Deluxe' },
                            ]}
                            value={{ value: roomType, label: roomType }}
                            onChange={(option) => setRoomType(option.value)}
                        />
                    </div>
                </div>

                <label className="block text-2xl font-semibold mb-2">Description</label>
                <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className='flex gap-4'>
                    <div className='flex w-full flex-col'>
                        <label className="block text-2xl font-semibold mb-2">Select Hotel</label>
                        <Select
                            options={hotelOptions}
                            value={hotel}
                            onChange={setHotel}
                        />
                    </div>

                    <div className='flex w-full flex-col'>
                        <label className="block text-2xl font-semibold mb-2">Amenities</label>
                        <Select
                            isMulti
                            options={AmentiesData}
                            value={amenities}
                            onChange={setAmenities}
                        />
                    </div>
                </div>


                <div className="flex space-x-4">
                    <div className="w-full">
                        <label className="block text-2xl font-semibold mb-2">Price</label>
                        <input
                            type="number"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-2xl font-semibold mb-2">Discounted Price</label>
                        <input
                            type="number"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={discountedPrice}
                            onChange={(e) => setDiscountedPrice(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="flex space-x-4 justify-between">

                    <div className='flex-1'>

                        <label className="block text-2xl font-semibold mb-2">Rooms Left</label>
                        <input
                            type="number"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={roomLeft}
                            onChange={(e) => setRoomLeft(Number(e.target.value))}
                        />
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
            </div>
        ),
        Gallery: (
            <div className="p-6 space-y-4">
                {isUploading && (
                    <div className="w-full text-center py-4">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                        <p className="mt-2 text-gray-600">Uploading images...</p>
                    </div>
                )}
                <MultipleImageUpload
                    onUploadSuccess={handleImageUploadSuccess}
                    isUploading={isUploading}
                    imagesUrls={imagesUrls}
                    onRemoveImageUrl={handleRemoveImageUrl}
                    disabled={isUploading}
                />

            </div>
        ),
        'Customer Reviews': (
            <div className="p-6 space-y-4">
                <div className='flex justify-between flex-wrap'>
                    <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                </div>
                <div className="flex flex-wrap gap-6 w-full ">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-4 border flex flex-col rounded-lg space-y-2">
                            <div className="flex gap-4 justify-between">
                                <input
                                    type="text"
                                    placeholder="Customer Name"
                                    value={testimonial.name}
                                    onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                                    className="w-full p-2 border rounded-lg"
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

                            <textarea
                                placeholder="Review Description"
                                value={testimonial.description}
                                onChange={(e) => handleTestimonialChange(index, 'description', e.target.value)}
                                className="w-full p-2 h-36 border rounded-lg"
                            />

                            <button
                                onClick={() => handleDeleteTestimonial(index)}
                                className="text-red-500 py-1 px-3 rounded-lg"
                            >
                                <TrashIcon/>
                            </button>
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

        ),
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-4 flex flex-col pb-5">
            <div className='flex px-10 justify-between'>
                <h1 className="text-[32px] font-bold pb-8 ">Edit Room</h1>
                <button className="bg-gradient-to-r h-[60px] w-[150px]  from-blue-500 to-indigo-600 text-white px-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all" onClick={handleUpdateClick}>Update</button>

            </div>

            <Tabs tabNames={tabNames} tabContent={tabContent} />

        </div>
    );
};

export default EditRooms;
