import { Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type ServiceFields = {
    fields: {
        Heading: TextField;
        items: {
            Title: TextField;
            Description: TextField;
            Price: TextField;
            ProductCategory: TextField;
            Brand: TextField;
        }[];
    };
};

// interface Data {
//     data: {
//         Categories: {
//             Name: string;
//             Values: {
//                 Name: string;
//             }[];
//         }[];
//     }
// }

interface Value {
    Name: string;
}

interface Category {
    Name: string;
    Values: Value[];
}

interface APIResponse {
    Categories: Category[];
}

const Services = (props: ServiceFields) => {
    const { fields } = props;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [brands, setBrands] = useState<Category[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchBrandsAndCategories = async () => {
            try {
                const brandsResponse = await axios.get<APIResponse>('https://headlessdevsc.dev.local/api/sitecore/Search/GetBrands');

                const categoriesResponse = await axios.get<APIResponse>('https://headlessdevsc.dev.local/api/sitecore/Search/GetCategories');

                setBrands(brandsResponse.data.Categories || []);
                setCategories(categoriesResponse.data.Categories || []);
            } catch (error) {
                console.error('Error fetching brands and categories:', error);
            }
        };

        fetchBrandsAndCategories();
    }, []);

    const handleSearch = async () => {
        setIsSearchClicked(true);
        try {
            const response = await axios.post(
                'https://headlessdevsc.dev.local/api/sitecore/Search/SearchResult',
                { query: query, brands: selectedBrands, categories: selectedCategories },
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
                <h2 className='pb-3' style={{ textAlign: 'center' }}><Text field={fields.Heading} /></h2>
            )}

            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <h3>Brands</h3>
                        {brands.map((brand) => (
                            brand.Values.map((brand, index) => (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        id={`brand-${index}`}
                                        value={brand.Name}
                                        onChange={(e) => setSelectedBrands(e.target.checked ? [...selectedBrands, e.target.value] : selectedBrands.filter(brand => brand !== e.target.value))}
                                    />
                                    <label className='pl-2' htmlFor={`brand-${index}`}>{brand.Name}</label>
                                </div>
                            ))
                        ))}

                        <h3>Categories</h3>
                        {categories.map((category) => (
                            category.Values.map((category, index) => (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        id={`category-${index}`}
                                        value={category.Name}
                                        onChange={(e) => setSelectedCategories(e.target.checked ? [...selectedCategories, e.target.value] : selectedCategories.filter(category => category !== e.target.value))}
                                    />
                                    <label className='pl-2' htmlFor={`category-${index}`}>{category.Name}</label>
                                </div>
                            ))
                        ))}
                    </div>
                    <div className="row col-lg-10">
                        {(!isSearchClicked || (isSearchClicked && results.length < 0) ? fields.items : results).map((item: any, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-12 p-2">
                                <div className="card">
                                    <div className="content">
                                        <h4><Text field={isSearchClicked ? { value: item.Title } : item.Title} /></h4>
                                        <p><Text field={isSearchClicked ? { value: item.Description } : item.Description} /></p>
                                        <div>
                                            <strong>Price:</strong> <Text field={isSearchClicked ? { value: item.Price } : item.Price} />$
                                        </div>
                                        <div>
                                            <strong>Category:</strong> <Text field={isSearchClicked ? { value: item.ProductCategory } : item.ProductCategory} />
                                        </div>
                                        <div>
                                            <strong>Brand:</strong> <Text field={isSearchClicked ? { value: item.Brand } : item.Brand} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isSearchClicked && results.length === 0 && <h3 style={{ textAlign: 'center', color: 'red' }}>No Search Results Found</h3>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;