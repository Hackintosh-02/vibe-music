import React from 'react';
import searchIcon from '../assets/icons/search.png'; 

const Header = () => (
    <div className="flex items-center justify-between p-6 bg-transparent">
        <div className="flex items-center space-x-8 ml-8"> 
            <ul className="flex space-x-8 text-white text-lg">
                <li className="hover:text-red-500 font-extrabold cursor-pointer">Music</li>
                <li className="hover:text-red-500 font-extrabold cursor-pointer">Podcast</li>
                <li className="hover:text-red-500 font-extrabold cursor-pointer">Live</li>
                <li className="hover:text-red-500 font-extrabold cursor-pointer">Radio</li>
            </ul>
        </div>
        <div className="relative w-96"> 
            <input
                type="text"
                placeholder="Michael Jackson"
                className="bg-black bg-opacity-50 text-white rounded-full px-4 py-3 pl-12 w-full focus:outline-none"  // Adjusted styles
            />
            <img
                src={searchIcon}
                alt="Search"
                className="absolute top-3 left-4 w-6 h-6 text-gray-400"
            />
        </div>
    </div>
);

export default Header;
