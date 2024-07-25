import { ImageField, Image, Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import { useI18n } from 'next-localization';

type NewsFields = {
    fields: {
        Heading: TextField;
        items: {
            Title: TextField;
            Description: TextField;
            Image: ImageField;
            children: {
                fields: {
                    Heading: TextField;
                    Description: TextField;
                };
            }[];
        }[];
    };
};

const News = (props: NewsFields) => {
    const { fields } = props;
    const { t } = useI18n();

    return (
        <section>
            <h2 style={{ textAlign: 'center' }}><Text field={fields.Heading} /></h2>
            <p>{t('ExDictionary')}</p>
            <div className="container">
                <div className="row">
                    {fields.items.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-12 p-2">
                            <div className="card">
                                <div className="image">
                                    <Image field={item.Image} alt="#" style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="content">
                                    <h4><Text field={item.Title} /></h4>
                                    <p><Text field={item.Description} /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;