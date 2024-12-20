import Tabs from "../../Components/Tabs";
const EditHotels = () => {


    const tabNames = ['Overview', 'Pricing', 'Gallery', 'Reviews'];
    const tabContent = {
        Overview: <div><h2>Overview</h2><p>This is the overview content.</p></div>,
        Pricing: <div><h2>Pricing</h2><p>Details about pricing.</p></div>,
        Gallery: <div><h2>Gallery</h2><p>Image gallery goes here.</p></div>,
        Reviews: <div><h2>Reviews</h2><p>Read customer reviews here.</p></div>,
    };

    return <Tabs tabNames={tabNames} tabContent={tabContent} />;

}

export default EditHotels
