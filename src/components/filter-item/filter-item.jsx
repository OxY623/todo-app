import React, {useState} from 'react';
import './filter-item.css';
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */

const FilterItem = ({label, onFilterChange, selected}) => {

    // const [selected, setSelected] = useState(false);
    // let classNames = '';
    //
    // if (selected) {
    //     classNames ='selected';
    // }

    let classNames = selected ? 'selected' : '';

    return (
            <button className={classNames} onClick={() => {
                // setSelected(!selected);
                onFilterChange(label);
            }}>
                {label}
            </button>

    );
}


FilterItem.defaultProps = {
    label: 'All',
    onFilterChange: () => {}
};

FilterItem.propTypes = {
    label: PropTypes.string.isRequired, // label должен быть строкой и обязательным
    onFilterChange: PropTypes.func.isRequired // onFilterChange должен быть функцией и обязательным
};

export default FilterItem;
