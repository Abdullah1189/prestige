import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
import { db } from "../../firebase/firebase.config"; // Firebase import
import { collection, getDocs, query, where } from "firebase/firestore"; // Firebase query functions

const SmallHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [cartCount, setCartCount] = useState(0); // Store cart count from Firebase
    const [showCart, setShowCart] = useContext(Context); // Get showCart from Context
    const navigate = useNavigate();

    // Handle scroll event
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    // Fetch cart count from Firebase (or any cart data you have)
    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const userId = "userId"; // This would typically come from user authentication context or Firebase Auth
                const cartRef = collection(db, "carts");
                const q = query(cartRef, where("userId", "==", userId));
                const querySnapshot = await getDocs(q);
                const cartItems = querySnapshot.docs.map(doc => doc.data());
                setCartCount(cartItems.length); // Assuming one document per cart
            } catch (error) {
                console.error("Error fetching cart data: ", error);
            }
        };

        fetchCartCount();
    }, []); // Empty dependency array ensures this effect runs once on component mount

    return (
        <>
            <header
                className={`w-full px-5 md:px-10 z-50 border-b border-gray-800 bg-gray-900 text-white ${
                    scrolled ? "sticky top-0 animate-slide-down" : ""
                }`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center h-12 md:h-20">
                    {/* Left Navigation */}
                    <ul className="hidden md:flex gap-6 uppercase font-semibold text-sm">
                        <li
                            className="cursor-pointer hover:opacity-60"
                            onClick={() => navigate("/about")}
                        >
                            About
                        </li>
                        <li className="cursor-pointer hover:opacity-60">
                            Categories
                        </li>
                    </ul>

                    {/* Center Logo */}
                    {/* You can uncomment and adjust the logo part if necessary */}
                    {/* <div className="text-xl md:text-3xl font-bold cursor-pointer absolute md:relative left-1/2 md:transform-none transform -translate-x-1/2" onClick={() => navigate("/")}>JSDEVSTORE.</div> */}

                    {/* Right Icons */}
                    <div className="flex items-center gap-5 md:gap-6">
                        <TbSearch
                            className="text-lg md:text-xl cursor-pointer hover:opacity-60"
                            onClick={() => setSearchModal(true)}
                        />
                        <AiOutlineHeart className="text-lg md:text-xl cursor-pointer hover:opacity-60" />
                        <span
                            className="relative cursor-pointer"
                            onClick={() => setShowCart(true)}
                        >
                            <CgShoppingCart className="text-lg md:text-xl hover:opacity-60" />
                            {!!cartCount && (
                                <span className="absolute -top-2 -right-3 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </header>

            {searchModal && <Search setSearchModal={setSearchModal} />}
            {showCart && <Cart />}
        </>
    );
};

export default SmallHeader;
