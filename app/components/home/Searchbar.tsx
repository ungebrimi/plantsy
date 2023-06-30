import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="homepage-hero_mobileSearchBar__bKxfo m_dn">
      <form action="#" className="search-bar-form_root__YfLxl flex br2 search-bar-form_rootLarge__sI37C" id="uniqueId3">
        <div className="flex flex-1 bl bt bb br-0 border-gray-300 rounded-l overflow-hidden">
          <button type="button" className="faux-search-input_root__sqerK w-full border-none py-0 px-0 bg-white" data-test="search-input">
            <span className="block text-left border-none pl-3 pr-2 rounded-l text-black-300 flex">
              <span className="truncate">
                What’s on your to-do list?
              </span>
            </span>
          </button>
        </div>
        <button className="submit-button_submitButton__6shaG relative rounded-r py-2 border-b border-gray-300" data-test="search-button" aria-label="Search" type="button">
          <span className="flex relative">
            <span className="flex flex-col w-full">
              <svg height="18" width="18" fill="currentColor" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 2C10.532 2 13 4.467 13 7.5c0 1.156-.36 2.229-.972 3.114l3.679 3.679a.999.999 0 11-1.414 1.414l-3.68-3.679A5.46 5.46 0 017.5 13 5.506 5.506 0 012 7.5C2 4.467 4.468 2 7.5 2zm0 2C5.57 4 4 5.57 4 7.5S5.57 11 7.5 11 11 9.43 11 7.5 9.43 4 7.5 4z"></path>
              </svg>
            </span>
          </span>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
``
