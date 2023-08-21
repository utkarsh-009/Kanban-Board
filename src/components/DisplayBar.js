import React from 'react';
import './displayStyle.css';
import { useState } from 'react';
// import PropTypes from 'prop-types'

const DisplayBar = (props) => {

    document.addEventListener('DOMContentLoaded', () => {
        const toggleButton = document.getElementById('toggleButton');
        const targetElement = document.getElementById('targetElement');

        if (toggleButton && targetElement) {
            toggleButton.addEventListener('click', () => {
                targetElement.classList.toggle('dropdown-menu');
            });
        }
    });


    return (
        <>
            <div className="dropdown">
                {/* <button className="dropdown-btn" id="toggleButton"> Display </button> */}
                <div className="dropdown-menu" id="targetElement">
                    <ul >
                        <li className='lst'>
                            <label className="menu-label">Grouping:</label>
                            <select value={props.groupBy} onChange={props.handleGroupByChange}>
                                <option value="">None</option>
                                <option value="Status">Status</option>
                                <option value="User">User</option>
                                <option value="Priority">Priority</option>
                            </select>
                        </li>
                        <li className='lst'>
                            <label className="menu-label">Ordering:</label>
                            <select value={props.orderBy} onChange={props.handleOrderByChange}>
                                <option value="">None</option>
                                <option value="Priority">Priority</option>
                                <option value="Title">Title</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default DisplayBar;
