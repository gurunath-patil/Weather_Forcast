import React, { useState, useEffect } from 'react';
import { fetchLocationDetails } from '@/fetchDetails';
const SearchComponent = ({ setSelectedItem }) => {
    const [query, setQuery] = useState('');
    const [locationDetails, setLocationDetails] = useState([]);

    async function handleSearchQuery(query) {
        const searchDetails = await fetchLocationDetails((query).trim())
        if (searchDetails.length > 0) {
            setLocationDetails(searchDetails)
        }
    }
    const handleSelect = (item) => {
        setSelectedItem(item);
        $reset();
    };

    const $reset = () => {
        setLocationDetails([]);
        setQuery('');
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) {
                handleSearchQuery(query);
            } else {
                $reset();
            }
        }, 500); // debounce delay (ms)

        return () => clearTimeout(timer);
    }, [query])

    return (
        <div className=" mt-4" style={{ minWidth: '300px', maxWidth: '400px' }}>
            <div className="position-relative">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search location here..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Search Results Dropdown */}
                {locationDetails.length > 0 && (
                    <ul className="list-group position-absolute w-100 mt-1 shadow overflow-y-scroll" style={{ zIndex: 1000, maxHeight: '250px' }}>
                        {locationDetails.map((result, index) => (
                            <li
                                key={index}
                                className="list-group-item list-group-item-action"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSelect(result)}
                            >
                                {/* Title */}
                                <div className="fw-bold text-primary">{result.name}</div>

                                {/* Subtitle / Description */}
                                <small className="text-muted">
                                    {result.display_name}
                                </small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;