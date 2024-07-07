import React from 'react';
import './filter-item.css';

/* eslint-disable react/prop-types */

const FilterItem = ({ label, onFilterChange }) => {
    return (
        <button onClick={() => onFilterChange(label)}>
            {label}
        </button>
    );
}

export default FilterItem;
