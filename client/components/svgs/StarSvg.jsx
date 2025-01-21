import React from 'react';

const StarSvg = ({ fill, width }) => {
    return (
        <svg className='svg_mode' xmlns="http://www.w3.org/2000/svg" width={width} fill={fill} viewBox="0 0 15 15" data-animate-icon="star">
            <path d="M7.5 0C7.75463 4.03197 10.968 7.24539 15 7.5C10.968 7.75463 7.75463 10.968 7.5 15C7.24539 10.968 4.03197 7.75463 0 7.5C4.03197 7.24539 7.24539 4.03197 7.5 0Z"></path>
        </svg>
    );
};

export default StarSvg;
