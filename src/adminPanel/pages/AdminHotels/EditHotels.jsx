import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tabs from "../../Components/Tabs";
import { Rating } from "../../Components/Rating";
import MultipleImageUpload from "../../Components/MultipleImageUpload";
import Select from "react-select";
import { TrashIcon } from "lucide-react";
import { useGetSingeHotelById, useGetAllRooms, useUploadHotelImages, useUpdateHotelById } from "../../../ApiHooks/useHotelHook";
import AmentiesData from "../../../Data/AmenitiesData";
import toast from "react-hot-toast";

const EditHotels = () => {
    const { hotelId } = useParams();
    const { data: hotelData, isLoading } = useGetSingeHotelById(hotelId);
    const { data: roomsData } = useGetAllRooms();
    const { mutate: uploadImages, isLoading: isUploading } = useUploadHotelImages();
    const { mutate: updateHotelData } = useUpdateHotelById();


    const [hotelName, setHotelName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [ammenities, setAmmenities] = useState([]);
    const [rating, setRating] = useState(0);
    const [imagesUrls, setImagesUrls] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [testimonials, setTestimonials] = useState([{ name: "", description: "", rating: 0 }]);

    const roomOptions = roomsData?.rooms?.map((room) => ({
        value: room._id,
        label: `${room.roomType} ${room.roomNumber}`,
    })) || [];

    useEffect(() => {
        if (hotelData?.hotel) {
            const {
                name,
                description,
                location,
                price,
                discountedPrice,
                amenities,
                rating,
                images,
                rooms,
                testimonials,
            } = hotelData.hotel;

            setHotelName(name);
            setDescription(description);
            setLocation(location);
            setPrice(price);
            setDiscountedPrice(discountedPrice);
            setAmmenities(amenities.map((amenity) => ({ value: amenity, label: amenity })));
            setRating(rating);
            setImagesUrls(images);
            setSelectedRooms(
                rooms.map((room) => ({
                    value: room._id,
                    label: `${room.roomType} ${room.roomNumber}`,
                }))
            );
            setTestimonials(
                testimonials.map(({ name, description, rating }) => ({
                    name,
                    description,
                    rating,
                }))
            );
        }
    }, [hotelData]);

    const handleSubmitClick = () => {
        if (!hotelName || !description || !location || price <= 0 || discountedPrice <= 0) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const updatedHotelData = {
            name: hotelName,
            description,
            location,
            price: Number(price),
            discountedPrice: Number(discountedPrice),
            amenities: ammenities.map((amenity) => amenity.value),
            rating: Number(rating),
            images: imagesUrls,
            rooms: selectedRooms.map((room) => room.value),
            testimonials: testimonials.map((testimonial) => ({
                ...testimonial,
                rating: Number(testimonial.rating),
            })),
        };

        console.log(hotelId, updatedHotelData);
        
        updateHotelData({ id: hotelId, data: updatedHotelData }, {
            onSuccess: () => {
                toast.success('Hotel updated successfully');
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

    const handleDeleteTestimonial = (index) => {
        setTestimonials(testimonials.filter((_, i) => i !== index));
    };

    const handleAddTestimonial = () => {
        setTestimonials([...testimonials, { name: "", description: "", rating: 0 }]);
    };

    const handleRemoveImageUrl = (url) => {
        setImagesUrls((prevUrls) => prevUrls.filter((image) => image !== url));
        toast.success("Image removed successfully!");
    };

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

    const tabNames = ["Add Hotel", "Gallery", "Customer Reviews"];
    const tabContent = {
        "Add Hotel": (
            <div className="space-y-6 p-6 bg-white">

                <div className="flex gap-2">
                    <label className="block text-2xl font-semibold mb-2">Rating:  </label>
                    <Rating seiInitialRating={setRating} initialRating={rating} />

                </div>


                <label className="block text-2xl font-semibold mb-2">Hotel Name</label>
                <input
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                />

                <label className="block text-2xl font-semibold mb-2">Description</label>
                <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label className="block text-2xl font-semibold mb-2">Location</label>
                <input
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />




                <div className="flex gap-4">
                    <div className="w-full">
                        <label className="block text-2xl font-semibold mb-2">Amenities</label>
                        <Select
                            isMulti
                            options={AmentiesData}
                            value={ammenities}
                            onChange={setAmmenities}
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-2xl font-semibold mb-2">Select Rooms</label>
                        <Select
                            isMulti
                            options={roomOptions}
                            value={selectedRooms}
                            onChange={setSelectedRooms}
                            classNamePrefix="select"
                        />
                    </div>
                </div>


                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-2xl font-semibold mb-2">Price</label>
                        <input
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-2xl font-semibold mb-2">Discounted Price</label>
                        <input
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            value={discountedPrice}
                            onChange={(e) => setDiscountedPrice(parseFloat(e.target.value))}
                        />
                    </div>
                </div>

            </div>
        ),

        Gallery: (
            <div className="p-6">
                <MultipleImageUpload
                    onUploadSuccess={handleImageUploadSuccess}
                    imagesUrls={imagesUrls}
                    isUploading={isUploading}
                    disabled={isUploading}
                    onRemoveImageUrl={handleRemoveImageUrl}

                />
            </div>
        ),

        "Customer Reviews": (
            <div className="p-6 space-y-4">
                <div className='flex justify-between flex-wrap'>
                    <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                </div>
                <div className="flex flex-wrap gap-6 w-full ">

                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-2">
                            <input
                                className="w-full p-2 border rounded-lg"
                                value={testimonial.name}
                                onChange={(e) => handleTestimonialChange(index, "name", e.target.value)}
                                placeholder="Customer Name"
                            />
                            <textarea
                                className="w-full p-2 border rounded-lg"
                                value={testimonial.description}
                                onChange={(e) => handleTestimonialChange(index, "description", e.target.value)}
                                placeholder="Review Description"
                            />
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        onClick={() => handleTestimonialChange(index, "rating", star)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={star <= testimonial.rating ? "#F59E0B" : "#D1D5DB"}
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 cursor-pointer"
                                    >
                                        <path d="M11.999 1.49l2.93 5.93 6.54.953-4.735 4.62 1.117 6.516-5.852-3.076-5.852 3.076 1.117-6.516-4.735-4.62 6.54-.953 2.93-5.93z" />
                                    </svg>
                                ))}
                            </div>
                            <button
                                onClick={() => handleDeleteTestimonial(index)}
                                className="text-red-500 py-1 px-3 rounded-lg"
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    ))}
                </div>
                <button onClick={handleAddTestimonial} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                    Add More
                </button>
            </div>
        ),
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-4 flex flex-col pb-5">
            <div className="flex justify-between">
                <h1 className="text-[32px] font-bold pb-8 px-10">Edit Hotel</h1>
                <button className="bg-gradient-to-r h-[60px] w-[150px]  from-blue-500 to-indigo-600 text-white px-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all" onClick={handleSubmitClick}>Update</button>

            </div>
            <Tabs tabNames={tabNames} tabContent={tabContent} />

        </div>
    );
};

export default EditHotels;
