import { Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

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

interface Value {
    Name: string;
}

interface Category {
    Name: string;
    Values: Value[];
}

interface SearchResult {
    Title: string;
    Description: string;
    Price: string;
    ProductCategory: string;
    Brand: string;
}

interface APIResponse {
    SearchResults: SearchResult[];
    Facets: {
        Brands: {
            Categories: Category[];
        };
        Categories: {
            Categories: Category[];
        };
        Price: {
            minPrice: number;
            maxPrice: number;
        };
    };
}

const Services = (props: ServiceFields) => {
    const { fields } = props;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [brands, setBrands] = useState<Category[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [value, setValue] = useState({ min: 0, max: 1000 });
    const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(1000);
    const [sliderMinPrice, setSliderMinPrice] = useState<number>(0);
    const [sliderMaxPrice, setSliderMaxPrice] = useState<number>(1000);
    
    useEffect(() => {
        setSliderMinPrice(minPrice);
        setSliderMaxPrice(maxPrice);
    }, [minPrice, maxPrice]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post<APIResponse>(
                    'https://headlessdevsc.dev.local/api/sitecore/Search/GetDataAndSearchResult',
                    {
                        query: query,
                        brands: selectedBrands,
                        categories: selectedCategories,
                        minPrice: selectedMinPrice,
                        maxPrice: selectedMaxPrice
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setResults(response.data.SearchResults || []);
                setBrands(response.data.Facets.Brands.Categories || []);
                setCategories(response.data.Facets.Categories.Categories || []);
                setMinPrice(response.data.Facets.Price.minPrice);
                setMaxPrice(response.data.Facets.Price.maxPrice);
                setValue({ min: response.data.Facets.Price.minPrice, max: response.data.Facets.Price.maxPrice });
            } catch (error) {
                console.error('Error fetching data:', error);
                setResults([]);
            }
        };
        fetchData();
    }, [query, selectedBrands, selectedCategories, isSearchClicked, selectedMinPrice, selectedMaxPrice]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSearchClicked(true);
        if (event.target.type === 'text') {
            setQuery(event.target.value);
            setSelectedMinPrice(selectedMinPrice);
            setSelectedMaxPrice(selectedMaxPrice);
        }
        else if (event.target.type === 'checkbox') {
            if (event.target.id.startsWith('brand')) {
                setSelectedBrands(event.target.checked ? [...selectedBrands, event.target.value] : selectedBrands.filter(brand => brand !== event.target.value));
            } else if (event.target.id.startsWith('category')) {
                setSelectedCategories(event.target.checked ? [...selectedCategories, event.target.value] : selectedCategories.filter(category => category !== event.target.value));
            }
            setSelectedMinPrice(selectedMinPrice);
            setSelectedMaxPrice(selectedMaxPrice);
        }
    };

    return (
        <section>
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search..."
                />
            </div>

            {(!isSearchClicked || (isSearchClicked && results.length > 0)) && (
                <h2 className='pb-3' style={{ textAlign: 'center' }}><Text field={fields.Heading} /></h2>
            )}
            {isSearchClicked && results.length === 0 && <h2 className='pb-3' style={{ textAlign: 'center', color: 'red' }}>No Search Results Found</h2>}

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
                                        onChange={handleSearch}
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
                                        onChange={handleSearch}
                                    />
                                    <label className='pl-2' htmlFor={`category-${index}`}>{category.Name}</label>
                                </div>
                            ))
                        ))}

                        <h3>Price</h3>
                        <div className='pt-2'>
                            <InputRange
                                minValue={minPrice}
                                value={{ min: sliderMinPrice, max: sliderMaxPrice }}
                                maxValue={maxPrice}
                                onChange={value => {
                                    if (typeof value === 'number') {
                                        setSliderMinPrice(value);
                                        setSliderMaxPrice(value);
                                    } else {
                                        setSliderMinPrice(value.min);
                                        setSliderMaxPrice(value.max);
                                    }
                                }}
                                onChangeComplete={value => {
                                    if (typeof value === 'number') {
                                        setSelectedMinPrice(value);
                                        setSelectedMaxPrice(value);
                                    } else {
                                        setSelectedMinPrice(value.min);
                                        setSelectedMaxPrice(value.max);
                                    }
                                    setIsSearchClicked(true);
                                }}
                            />
                        </div>
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;