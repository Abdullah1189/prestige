import { useEffect, useState, createContext } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase/firebase.config"; // Firebase config

export const Context = createContext();

const AppContext = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);  // Scroll to top when the route changes
    }, [location]);

    // Update cart count and subtotal whenever cart items change
    useEffect(() => {
        let count = 0;
        cartItems.forEach((item) => (count += item.quantity)); // Assuming `quantity` exists in your product object
        setCartCount(count);

        let subTotal = 0;
        cartItems.forEach((item) => {
            subTotal += item.price * item.quantity; // Assuming `price` and `quantity` exist
        });
        setCartSubTotal(subTotal);
    }, [cartItems]);

    // Fetch Categories and Products from Firestore
    const fetchCategoriesAndProducts = async () => {
        try {
            const categorySnapshot = await getDocs(collection(db, "categories"));
            const categoryData = categorySnapshot.docs.map((doc) => ({
                id: doc.id, // Don't forget to add the `id`
                ...doc.data(),
            }));
            setCategories(categoryData);

            const productSnapshot = await getDocs(collection(db, "products"));
            const productData = productSnapshot.docs.map((doc) => ({
                id: doc.id, // Don't forget to add the `id`
                ...doc.data(),
            }));
            setProducts(productData);
        } catch (error) {
            console.error("Error fetching data from Firebase", error);
        }
    };

    useEffect(() => {
        fetchCategoriesAndProducts();
    }, []); // Run once when the component mounts

    const handleAddToCart = (product, quantity) => {
        let items = [...cartItems];
        let index = items.findIndex((p) => p.id === product.id); // Compare by `id`
        if (index !== -1) {
            items[index].quantity += quantity; // Add quantity if product already in cart
        } else {
            product.quantity = quantity; // Add the `quantity` attribute to new product
            items = [...items, product]; // Add new product to cart
        }
        setCartItems(items);
    };

    const handleRemoveFromCart = (product) => {
        let items = cartItems.filter((p) => p.id !== product.id); // Remove product by `id`
        setCartItems(items);
    };

    const handleCartProductQuantity = (type, product) => {
        let items = [...cartItems];
        let index = items.findIndex((p) => p.id === product.id);
        if (index !== -1) {
            if (type === "inc") {
                items[index].quantity += 1;
            } else if (type === "dec" && items[index].quantity > 1) {
                items[index].quantity -= 1;
            }
        }
        setCartItems(items);
    };

    return (
        <Context.Provider
            value={{
                products,
                setProducts,
                categories,
                setCategories,
                cartItems,
                setCartItems,
                handleAddToCart,
                cartCount,
                handleRemoveFromCart,
                showCart,
                setShowCart,
                handleCartProductQuantity,
                cartSubTotal,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AppContext;






export const getShopLocations = async () => {
  const shopCollectionRef = collection(db, "Shops");
  const shopSnapshot = await getDocs(shopCollectionRef);

  return shopSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) {
      console.error("Invalid coordinates for distance calculation:", {
        lat1,
        lng1,
        lat2,
        lng2,
      });
      return NaN;
    }
  
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };
  
  

  export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log("User location fetched:", userLocation);
            resolve(userLocation);
          },
          (error) => {
            console.error("Error fetching user location:", error);
            reject(error);
          },
          { enableHighAccuracy: true }
        );
      }
    });
  };
    