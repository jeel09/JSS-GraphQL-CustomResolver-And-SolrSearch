import { Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

type BannerFields = {
    fields: {
        Heading: TextField;
        Description: TextField;
    }
};

type ContentBlockFields = {
    fields: {
        Banners: BannerFields[];
    };
};

const Banner = (props: ContentBlockFields) => {
    const { fields } = props;
    return (
        <section className="slider">
            <div className="hero-slider">
                {fields.Banners.map((banner, index) => (
                    <div className="single-slider" style={{ backgroundImage: "url('./img/slider.jpg')" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="text">
                                        <div key={index}>
                                            <h1><Text field={banner.fields.Heading} /></h1>
                                            <p><Text field={banner.fields.Description} /></p>
                                            <div className="button">
                                                <a href="#" className="btn">Get Appointment</a>
                                                <a href="#" className="btn primary">About Us</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Banner;