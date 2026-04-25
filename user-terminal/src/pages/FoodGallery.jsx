import React, { useContext } from 'react'; // 1. useState yahan se hata diya
import './FoodGallery.css';
import CategoryMenu from '../elements/CategoryMenu';
import { StoreContext } from '../context/StoreContext';
import { assets as uiIcons } from '../assets/assets';

// 2. Props ke roop mein category aur setCategory ko liya
const FoodGallery = ({ category, setCategory }) => {
  
  const { cartItems, addToCart, removeFromCart, food_list, url } = useContext(StoreContext);

  return (
    <div className="menu-wrapper">
      {/* Category Selection Slider */}
      <CategoryMenu category={category} setCategory={setCategory} /> 
      
      <div className="gallery-header">
        <h2>{category === "All" ? "Taste the Excellence" : `${category} Selection`}</h2>
        <div className="underline"></div>
      </div>

      <div className="product-layout">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <div key={item._id} className="item-card">
                <div className="img-box">
                  <img className='food-item-image' src={url + "/images/" + item.image} alt="" />
                  {/* Rating Badge */}
                  <div className="rating-badge">
                     <img src={uiIcons.rating_starts} alt="" />
                  </div>
                </div>
                
                <div className="item-body">
                  <div className="item-title">
                    <h3>{item.name}</h3>
                    <span className="cat-label">{item.category}</span>
                  </div>
                  <p className="item-desc">{item.description}</p>
                  
                  <div className="price-action">
                    <span className="item-price">₹{item.price}</span>
                    
                    {!cartItems[item._id] ? (
                      <button className="add-to-plate" onClick={() => addToCart(item._id)}>
                        Add <img src={uiIcons.add_icon_white} alt="" className="plus-icon" />
                      </button>
                    ) : (
                      <div className="item-counter">
                        <img onClick={() => removeFromCart(item._id)} src={uiIcons.remove_icon_red} alt="Remove" />
                        <p>{cartItems[item._id]}</p>
                        <img onClick={() => addToCart(item._id)} src={uiIcons.add_icon_green} alt="Add" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodGallery;