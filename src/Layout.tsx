import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import Navigation from 'src/Navigation';
import dynamic from 'next/dynamic';

const Scripts = dynamic(() => import('src/Scripts'), { ssr: false });

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;

  return (
    <>
      <Head>
        <title>Mediplus - Free Medical and Doctor Directory HTML Template.</title>

        <link rel="icon" href="./img/favicon.png" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link rel="stylesheet" href="./css/bootstrap.min.css" />
        <link rel="stylesheet" href="./css/nice-select.css" />
        <link rel="stylesheet" href="./css/font-awesome.min.css" />
        <link rel="stylesheet" href="./css/icofont.css" />
        <link rel="stylesheet" href="./css/slicknav.min.css" />
        <link rel="stylesheet" href="./css/owl-carousel.css" />
        <link rel="stylesheet" href="./css/datepicker.css" />
        <link rel="stylesheet" href="./css/animate.min.css" />
        <link rel="stylesheet" href="./css/magnific-popup.css" />
        <link rel="stylesheet" href="./css/normalize.css" />
        <link rel="stylesheet" href="./css/responsive.css" />

        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head>

      <Navigation />
      {/* root placeholder for the app, which we add components to using route data */}
      <div className="container">{route && <Placeholder name="jss-main" rendering={route} />}</div>

      <Scripts />
      
    </>
  );
};

export default Layout;
