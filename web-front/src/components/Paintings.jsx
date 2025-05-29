import React, { useState } from 'react';
import { paint } from "./Apis2";
import "./sketches.css";
import { Link } from 'react-router-dom';

const Paintings = ({ searchTerm, signinbtn }) => {
    const [pricee, setPrice] = useState("");

    const filteredPaintings = paint.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paintprice = () => {
        switch (pricee) {
            case "lowest to highest":
                return filteredPaintings.slice().sort((a, b) => a.price - b.price);
            case "highest to lowest":
                return filteredPaintings.slice().sort((a, b) => b.price - a.price);
            default:
                return filteredPaintings;
        }
    };

    const handleBuyNow = (item) => {
        if (signinbtn === "sign-in") {
            alert("You need to sign in to buy this item.");
        } else {
            localStorage.setItem('selectedItem', JSON.stringify(item));
        }
    };

 

    const handleAddToCart = (item) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!cart.some(cartItem => cartItem.name === item.name)) {
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`"${item.name}" has been added to your cart.`);
        } else {
            alert(`"${item.name}" is already in your cart.`);
        }
    };

    return (
        <div id='sketching'>
            <h3 style={{ color: "white" }}>Filter by Price:</h3>
            <select id="opt" onChange={(e) => setPrice(e.target.value)}>
                <option value="">Select Price Range</option>
                <option value="lowest to highest">Lowest to Highest</option>
                <option value="highest to lowest">Highest to Lowest</option>
            </select>
            <div id='under'>
                {paintprice().map((item, index) => (
                    <div key={index} id='frame'>
                        <img src={item.image} alt={item.name} />
                        <h1>{item.name}</h1>
                        <h3>Price: {item.price} Rs</h3>
                        <Link to={signinbtn==="sign-in" ? "#":"/buy"}>
                            <button
                                id="b"
                                onClick={() => signinbtn !== "sign-in" && handleBuyNow(item)}
                                disabled={signinbtn === "sign-in"}
                style={{
                  cursor: signinbtn === "sign-in" ? "not-allowed" : "pointer",
                  backgroundColor: signinbtn === "sign-in" ? "#ccc" : "#blue",
                  color: signinbtn === "sign-in" ? "#666" : "white"
                }}
                                
                            >
                                Buy Now
                            </button>
                        </Link>
                        <button id='a' onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <h1 style={{marginLeft:"10%"}} id='flip'> sign-in to buy something . without signin you cannot able to buy</h1>
        </div>
    );
};

export default Paintings;
