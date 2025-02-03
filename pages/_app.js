import '../styles/globals.css';
    import Script from 'next/script';
    import Navbar from '../components/Navbar';

    function MyApp({ Component, pageProps }) {
      return (
        <>
          <Navbar />
          <div className="container mt-4">
            <Component {...pageProps} />
          </div>
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
            crossorigin="anonymous"
          />
        </>
      );
    }

    export default MyApp;
