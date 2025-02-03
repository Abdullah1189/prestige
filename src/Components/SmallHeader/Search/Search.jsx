import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

// Utility for debouncing
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const Search = ({ setSearchModal }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    
    // Debounce the query to prevent too many API calls
    const debouncedQuery = useDebounce(query, 500);

    // Fetch data when query changes, but only if it's not empty
    const { data, error, loading } = useFetch(
        debouncedQuery
            ? `/api/products?populate=*&filters[title][$contains]=${debouncedQuery}`
            : null
    );

    const onChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="fixed inset-0 bg-white z-[999] animate-slide-down">
            {/* Search Input Field */}
            <div className="w-full flex justify-center items-center px-12 py-4 border-b border-gray-200 relative">
                <input
                    autoFocus
                    type="text"
                    placeholder="Search for products"
                    value={query}
                    onChange={onChange}
                    className="w-full max-w-5xl h-12 md:h-20 text-center text-lg md:text-3xl font-semibold uppercase text-gray-800 placeholder-gray-600 outline-none border-none"
                />
                <MdClose
                    className="absolute right-5 md:right-10 text-2xl md:text-4xl cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={() => setSearchModal(false)}
                />
            </div>

            {/* Search Results */}
            <div className="w-full max-w-[calc(100%-20px)] mx-auto mt-4 md:mt-6 overflow-hidden">
                {!query.length && (
                    <div className="text-center mt-5 text-gray-500">
                        Start typing to see products you are looking for.
                    </div>
                )}
                <div className="overflow-auto max-h-[calc(100vh-110px)] md:max-h-[calc(100vh-160px)] mt-4">
                    {loading && (
                        <div className="text-center text-gray-500">
                            Loading results...
                        </div>
                    )}

                    {error && (
                        <div className="text-center text-red-500">
                            Error loading results. Please try again later.
                        </div>
                    )}

                    {!loading && !error && data?.data?.length === 0 && (
                        <div className="text-center text-gray-500">
                            No products found.
                        </div>
                    )}

                    {data?.data?.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                                navigate("/product/" + item.id);
                                setSearchModal(false);
                            }}
                        >
                            {/* Product Image */}
                            <div className="bg-gray-100 w-16 h-16 flex-shrink-0">
                                <img
                                    src={
                                        process.env
                                            .REACT_APP_STRIPE_APP_DEV_URL +
                                        item.attributes.image.data[0].attributes
                                            .url
                                    }
                                    alt={item.attributes.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Product Details */}
                            <div className="overflow-hidden">
                                <span className="block text-sm md:text-base font-semibold text-gray-800 truncate">
                                    {item.attributes.title}
                                </span>
                                <span className="block text-xs md:text-sm text-gray-500 truncate">
                                    {item.attributes.description}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
