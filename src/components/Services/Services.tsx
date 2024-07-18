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

    const handleSearch = async () => {
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
        } finally {
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

            <h2 style={{ textAlign: 'center' }}><Text field={fields.Heading} /></h2>
            <div className="container">
                <div className="row">
                    {(!results || results.length === 0) ? (
                        fields.items.map((item: any, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-12 p-2">
                                <div className="card">
                                    <div className="content">
                                        <h4><Text field={item.Title} /></h4>
                                        <p><Text field={item.Description} /></p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        results.map((item: any, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-12 p-2">
                                <div className="card">
                                    <div className="content">
                                        <h4><Text field={{ value: item.Title }} /></h4>
                                        <p><Text field={{ value: item.Description }} /></p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Services;