import { useNavigate } from "react-router-dom";
import { usePackageById, useTopSellingPackages } from "../../../../ApiHooks/useTravelPackagesHook";

const TopSellingPackages = () => {
    const { data: packages = [] } = useTopSellingPackages();
    const navigate = useNavigate();

    return (
        <section className="py-14  bg-white">
            <div className="content mx-auto text-center">
                <h2 className="text-mobile/h3 md:text-desktop/h3 text-primary-green mb-2">
                    Top Selling Tour Packages of India
                </h2>
                <p className="text-gray-600 mb-10 text-sm">
                    Stay updated with our latest news and happenings through Informee.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <div
                            key={pkg._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                        >
                            <div className="relative overflow-hidden rounded-2xl group">
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="h-64 w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-4 py-8 text-center">
                                <h3 className="text-md truncate font-semibold text-primary-green uppercase mb-3">
                                    {pkg.title}
                                </h3>
                                <div
                                    // to={`/packages/${pkg._id}`}
                                    onClick={() => navigate(`/package-detail/${encodeURIComponent(pkg.title)}`, {
                                        state: { pkg }
                                      })}
                                    className="inline-block cursor-pointer w-full rounded-full  bg-[#47c5b4] text-white font-medium px-5 py-2  text-sm hover:bg-[#3bb0a1] transition"
                                >
                                    VIEW DETAILS
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopSellingPackages;
