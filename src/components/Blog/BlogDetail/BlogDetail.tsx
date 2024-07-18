import React from 'react';
import { TextField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import moment from 'moment';

type Detail = {
    AuthorName: TextField;
    BlogName: TextField;
    BlogDate: Field<string>;
}

type BlogDetail = {
    fields: {
        items: {
            fields: Detail;
        }[];
    };
};

const formatDate = (dateField: Field<string>) => {
    const date = moment(dateField.value);
    return date.format('DD/MM/YYYY');
}

const BlogDetail = (props: BlogDetail) => {
    const { fields } = props;

    return (
        <section className="blog-detail">
            <div className="container">
                {fields.items.map((item, index) => (
                    <div key={index}>
                        <div className='authorname'>
                            <h1><Text field={item.fields.AuthorName} /></h1>
                        </div>
                        <div className='blogname'>
                            <h1><Text field={item.fields.BlogName} /></h1>
                        </div>
                        <div className='blogdate'>
                            <h1>{formatDate(item.fields.BlogDate)}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BlogDetail;
