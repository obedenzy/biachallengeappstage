import '../styles/globals.css';
    import Navbar from '../components/Navbar';
    import Script from 'next/script';

    function MyApp({ Component, pageProps }) {
      return (
        <>
          <Navbar />
          <div className="container mt-4">
            <Component {...pageProps} />
          </div>
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" />
        </>
      );
    }

    export default MyApp;
