import { Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React from 'react';

type Item = {
    id: string;
    url: {
        path: string;
    };
    title: {
        value: string;
        jsonValue: {
            value: string;
        };
    };
    description: {
        value: string;
    };
    image: {
        src: string;
        altText: string;
    };
    price: {
        value: string;
    };
};

type ItemSearchResults = {
    results: Item[];
};

type GraphQlProductProps = ComponentProps & {
    fields: {
        data: {
            contextItem: {
                id: string;
                children: ItemSearchResults;
                pageTitle: {
                    value: string;
                };
            };
        };
    };
};

const GraphQLProduct = (props: GraphQlProductProps): JSX.Element => {
    // Query results in integrated GraphQL replace the normal `fields` data
    // i.e. with { data, }
    const { contextItem } = props.fields.data;

    return (
        <div data-e2e-id="graphql-integrated">
            {contextItem && (
                <section>
                    <h2 style={{ textAlign: 'center' }}><Text field={contextItem.pageTitle} /></h2>
                    <div className="container">
                        <div className="row">
                            {contextItem.children.results.map((child, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-12 p-2">
                                    <div className="card">
                                        <div className="image">
                                            {child.image && <img src={child.image.src} alt="#" />}
                                        </div>
                                        <div className="content">
                                            <h4><Text field={child.title} /></h4>
                                            <p><Text field={child.description} /></p>
                                            <div>
                                                <strong>Price:</strong> {child.price?.value}$
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default withDatasourceCheck()<GraphQlProductProps>(GraphQLProduct);
