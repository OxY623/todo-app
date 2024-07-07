import React, {useState} from 'react';
import './filter-item.css';

/* eslint-disable react/prop-types */

const FilterItem = ({ label, onFilterChange }) => {

    const [selected, setSelected] = useState(false);
    let classNames = '';

    if (selected) {
        classNames ='selected';
    }

    return (
        <button className={classNames} onClick={() => {
            setSelected(!selected);
            onFilterChange(label);
        }}>
            {label}
        </button>
    );
}

export default FilterItem;
