// import '../styles/globals.css';
import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import '../styles/common/_global.scss'
// import '@pantheon-systems/nextjs-kit/style.css';
import { ParallaxProvider } from 'react-scroll-parallax'
// import { usePathname } from 'next/navigation'


function App({ Component, pageProps }) {
	useEffect(() => {
		var anchors = document.querySelectorAll("a");
		anchors.forEach((element) => {
			if (!(element.host).includes('xenomedia')) {
				element.setAttribute('target','_blank')
			}
		})
	})
    const gTagScript = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-M17HV5ZCC8"></script>
							<script>
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());

							gtag('config', 'G-M17HV5ZCC8');
							</script>`
	
	
	useEffect(() => {
		let head = document.getElementsByTagName("head")[0];
		head.innerHTML += gTagScript
	})
  
	// make sure we don't output invalid `hrefLang` values
	if (!process.env.NEXT_PUBLIC_FRONTEND_URL) {
		delete pageProps.hrefLang;
	}

	return (<><noscript> 
		<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WZ5XKV8" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
				</noscript>
			<ParallaxProvider scrollAxis='vertical'><Component {...pageProps} /></ParallaxProvider>
			</>);
}

export default App;
