import { ImageField, Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

type BlogItem = {
    Image: ImageField;
    Title: TextField;
    Description: TextField;
};

type BlogDetail = {
    fields: {
        items: {
            fields: BlogItem;
            displayName: string;
        }[];
    };
};

const Blog = (props: BlogDetail) => {
    const { fields } = props;

    return (
        <section className="doctors p-2">
            <div className="container">
                <div className="row">
                    {fields.items.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-12 p-2">
                            <div className="single-doctor">
                                <Link href={`/blogs/${encodeURIComponent(item.displayName)}`}>
                                    <div className="image">
                                        {item.fields.Image.value && <img src={item.fields.Image.value.src} alt="#" />}
                                    </div>
                                    <div className="content">
                                        <h4><Text field={item.fields.Title} /></h4>
                                        <p><Text field={item.fields.Description} /></p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;