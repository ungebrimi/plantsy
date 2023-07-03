import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <form action="#" className="w-full mt-4">
      <div className="flex items-center justify-between w-full rounded-full border-0 max-w-md px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ">
        <input
          type="text"
          name="name"
          id="name"
          className="border-0 ring-0"
          placeholder="What’s on your to-do list?"
        />
        <button className="" aria-label="Search" type="button">
          <svg height="20" width="20" fill="currentColor" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 2C10.532 2 13 4.467 13 7.5c0 1.156-.36 2.229-.972 3.114l3.679 3.679a.999.999 0 11-1.414 1.414l-3.68-3.679A5.46 5.46 0 017.5 13 5.506 5.506 0 012 7.5C2 4.467 4.468 2 7.5 2zm0 2C5.57 4 4 5.57 4 7.5S5.57 11 7.5 11 11 9.43 11 7.5 9.43 4 7.5 4z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
