import React from 'react';
import './displayStyle.css';
import PropTypes from 'prop-types'

const DisplayBar = (props) => {
    return (
        <>
            <div className="dropdown">
                <button className="dropdown-btn"> Display </button>
                <div className="dropdown-menu">
                    <ul >
                        <li>
                            <label>Group By:</label>
                            <select value={props.groupBy} onChange={props.handleGroupByChange}>
                                <option value="">None</option>
                                <option value="Status">Status</option>
                                <option value="User">User</option>
                                <option value="Priority">Priority</option>
                            </select>
                        </li>
                        <li>
                            <label>Order By:</label>
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


export default DisplayBar
