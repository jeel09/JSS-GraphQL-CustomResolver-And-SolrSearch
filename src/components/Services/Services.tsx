import { Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useState } from 'react';
import axios from 'axios';

type ServiceFields = {
    fields: {
        Heading: TextField;
        items: {
            Title: TextField;
            Description: TextField;
        }[];
    };
};

const Services = (props: ServiceFields) => {
    const { fields } = props;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    const handleSearch = async () => {
        setIsSearchClicked(true);
        try {
            const response = await axios.post(
                'https://headlessdevsc.dev.local/api/sitecore/Search/SearchResult',
                { query: query },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setResults(response.data || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setResults([]);
        }
    };

    return (
        <section>
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <button className='ml-2 rounded p-1' onClick={handleSearch}>Search</button>
            </div>

            {(!isSearchClicked || (isSearchClicked && results.length > 0)) && (
                <h2 style={{ textAlign: 'center' }}><Text field={fields.Heading} /></h2>
            )}

            <div className="container">
                <div className="row">
                    {(!isSearchClicked || (isSearchClicked && results.length < 0) ? fields.items : results).map((item: any, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-12 p-2">
                            <div className="card">
                                <div className="content">
                                    <h4><Text field={isSearchClicked ? { value: item.Title } : item.Title} /></h4>
                                    <p><Text field={isSearchClicked ? { value: item.Description } : item.Description} /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isSearchClicked && results.length === 0 && <h3 style={{ textAlign: 'center', color: 'red' }}>No Search Results Found</h3>}
                </div>
            </div>
        </section>
    );
};

export default Services;