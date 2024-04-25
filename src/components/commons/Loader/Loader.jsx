import React from 'react';
import ReactLoading from 'react-loading';
import './Loader.css';  // Import a CSS file for styling

export const Loader = () => (
    <div className="loader-container">
        <ReactLoading type="spokes" color="blue" height={100} width={100} />
    </div>
);
