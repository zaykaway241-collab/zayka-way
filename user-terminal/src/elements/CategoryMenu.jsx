import React from 'react';
import './CategoryMenu.css';
import { menu_list } from '../assets/assets';

const CategoryMenu = ({ category, setCategory }) => {
  return (
    <div className="category-section">
      <h3>What's on your mind?</h3>
      <div className="category-list">
        {menu_list.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            className="category-item"
          >
            <div className={`img-wrapper ${category === item.menu_name ? "active-cat" : ""}`}>
              <img src={item.menu_image} alt={item.menu_name} />
            </div>
            <p className={category === item.menu_name ? "active-text" : ""}>
                {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default CategoryMenu;