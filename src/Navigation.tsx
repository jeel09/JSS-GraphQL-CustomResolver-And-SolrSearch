// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.

const Navigation = (): JSX.Element => {

  return (
    // <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
    //   <h5 className="my-0 me-md-auto fw-normal">
    //     <Link href="/" className="text-dark">
    //       <img src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
    //     </Link>
    //   </h5>
    //   <nav className="my-2 my-md-0 me-md-3">
    //     <a
    //       className="p-2 text-dark"
    //       href="https://jss.sitecore.com"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       {t('Documentation')}
    //     </a>
    //     <Link className="p-2 text-dark" href="/styleguide">
    //       {t('Styleguide')}
    //     </Link>
    //     <Link className="p-2 text-dark" href="/graphql">
    //       {t('GraphQL')}
    //     </Link>
    //   </nav>
    // </div>
    <header className="header" >
      <div className="header-inner">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12">
                <div className="logo">
                  <a href="/"><img src="./img/logo.png" alt="#" /></a>
                </div>
                <div className="mobile-nav"></div>
              </div>
              <div className="col-lg-7 col-md-9 col-12">
                <div className="main-menu">
                  <nav className="navigation">
                    <ul className="nav menu">
                      <li className="active"><a href="#">Home <i className="icofont-rounded-down"></i></a>
                        <ul className="dropdown">
                          <li><a href="index.html">Home Page 1</a></li>
                        </ul>
                      </li>
                      <li><a href="/cards">Cards </a></li>
                      <li><a href="/services">Services </a></li>
                      <li><a href="/blogs">Blogs</a>
                      </li>
                      <li><a href="/news">News</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-2 col-12">
                <div className="get-quote">
                  <a href="appointment.html" className="btn">Book Appointment</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
