const path = require('path');
const getLocales = require('./scripts/get-locales');

// Load the .env file for local development
// .env.development.local by default
require('dotenv').config({
	path: path.resolve(process.cwd(), '.env.development.local'),
});

if (
	process.env.BACKEND_URL === undefined &&
	process.env.PANTHEON_CMS_ENDPOINT === undefined
) {
	let message;
	if (process.env.NODE_ENV === 'development') {
		message = `No BACKEND_URL found.\nSee the README.md for information on setting this variable locally.`;
	} else if (process.env.NODE_ENV === 'production') {
		message = `No CMS Endpoint found.\nLink a CMS or set the BACKEND_URL environment variable in the settings tab in the dashboard\nIf your site does not require a backend to build, remove this check from the next.config.js.`;
	}
	throw new Error(message);
}

// if the FRONTEND_URL is not set, fallback to the PANTHEON_ENVIRONMENT_URL
if (
	process.env.FRONTEND_URL === undefined &&
	process.env.PANTHEON_ENVIRONMENT_URL
) {
	process.env.FRONTEND_URL = process.env.PANTHEON_ENVIRONMENT_URL;
}

let backendUrl, imageDomain;
if (process.env.BACKEND_URL === undefined) {
	backendUrl = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;
	imageDomain = process.env.IMAGE_DOMAIN || process.env.PANTHEON_CMS_ENDPOINT;

	// populate BACKEND_URL as a fallback and for build scripts
	process.env.BACKEND_URL = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;
} else {
	backendUrl = process.env.BACKEND_URL;
	imageDomain =
		process.env.IMAGE_DOMAIN ||
		process.env.BACKEND_URL.replace(/^https?:\/\//, '');
}
// remove trailing slash if it exists
imageDomain = imageDomain.replace(/\/$/, '');

if (process.env.PANTHEON_ENVIRONMENT_URL) {
	if (process.env.PANTHEON_ENVIRONMENT_URL.startsWith('live')) {
		process.env.IS_LIVE_ENVIRONMENT = true;
	}
}

// expose FRONTEND_URL to properly set hrefLang
// and remove trailing slash
process.env.NEXT_PUBLIC_FRONTEND_URL = process.env.FRONTEND_URL
	? process.env.FRONTEND_URL?.replace(/\/$/, '')
	: '';

const injectedOptions = {};
if (process.env.PANTHEON_UPLOAD_PATH) {
	injectedOptions['basePath'] = process.env.PANTHEON_UPLOAD_PATH;
}

module.exports = async () => {
	const locales = await getLocales();
	const nextConfig = {
		...(injectedOptions && injectedOptions),
		env: {
			backendUrl: backendUrl,
			// set imageUrl if IMAGE_DOMAIN is set in env vars to override default
			imageUrl: `https://${imageDomain}`,
			// makes locales available to lib/stores.js
			locales: locales,
		},
		reactStrictMode: true,
		images: {
			domains: [imageDomain],
		},

		i18n: {
			locales: locales,
			defaultLocale: 'en',
		},
		output: 'standalone',
		async rewrites() {
			return [
				{
					// inline-images can still be fetched from their source
					source: '/sites/default/:path*',
					destination: `${backendUrl}/sites/default/:path*`,
				},
				{
					source: '/confirmation',
					destination: '/page/confirmation',
				},
				

			];
		},
		async redirects() {
			return [
				{
					source: '/about-us',
					destination: '/en/page/about-us',
					permanent: true,
				},
				{
					source: '/about-xeno-media',
					destination: '/en/page/about-us',
					permanent: true,
				},
				{
					source: '/portfolio',
					destination: '/en/page/portfolio',
					permanent: true,
				},
				{
					source: '/blog',
					destination: '/en/page/blogs',
					permanent: true,
				}, 
				{
					source: '/services',
					destination: '/en/page/services',
					permanent: true,
				},
				{
					source: '/contact',
					destination: '/en/page/contact-us',
					permanent: true,
				},
			];
		},
		
	};

	return nextConfig;
};
