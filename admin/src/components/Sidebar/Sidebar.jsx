import React from 'react'
import './Sidebar.css'
import { PlusCircle, ListChecks, ShoppingBag } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        {/* Add Item Option */}
        <NavLink to='/add' className="sidebar-option">
            <PlusCircle size={24} />
            <p>Add Items</p>
        </NavLink>

        {/* List Items Option */}
        <NavLink to='/list' className="sidebar-option">
            <ListChecks size={24} />
            <p>List Items</p>
        </NavLink>

        {/* Orders Option */}
        <NavLink to='/orders' className="sidebar-option">
            <ShoppingBag size={24} />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar