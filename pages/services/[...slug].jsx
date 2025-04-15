import { NextSeo } from 'next-seo';
import { isMultiLanguage } from '../../lib/isMultiLanguage';
import { getPreview } from '../../lib/getPreview';
import { sortDate } from '@pantheon-systems/nextjs-kit';
import {
	getCurrentLocaleStore,
	globalDrupalStateStores,
} from '../../lib/stores';
import Layout from '../../components/layout';
import React from 'react';
import { useState, useEffect } from 'react';
import Styles from '../../styles/blogDetail.module.scss';
import 'aos/dist/aos.css';
import Slider from '../../components/sections/portfolio_slider';
import BannerSecond from '../../components/sections/banner_second'
import Intro from '../../components/sections/intro';
import HtmlIntro from '../../components/sections/htmlIntro';
import HeroBanner from '../../components/sections/hero-banner';
import Services from '../../components/sections/content_with_image_video';
import ContactForm from '../../components/sections/contact-form';
import ColFourCards from '../../components/sections/colFourCards';

const GradientPlaceholder = () => (
	<div className={Styles.no_img}>
		<h4>N/A</h4>
	</div>
);

export default function ServicesTemplate({
	services,
	hrefLang,
	footerMenu,
	headerMenu,
	preview,
	sortedArticles,
	blades,
	heroBannerVid,
}) {
	
	const serviceType = services.name
	let bladeList = ''
	bladeList = pageBuilder(
		blades.id,
		blades.data,
		heroBannerVid,
	);

	const serviceName = services.name
	//fitered by services
	let filtered = sortedArticles.filter((value) => {
		for (let i = 0; i < value?.field_service.length; i++) {
			if (value?.field_service[i]?.name == serviceName) {
				return value
			}
		}
	})
	filtered = filtered.sort(function (a, b) {
		if (a.title < b.title) {
			return -1;
		}
		if (a.title > b.title) {
			return 1;
		}
		return 0;
	});
	var formval;
	const slicedData = filtered.slice(0, 12)
	var singlw = blades?.data
	singlw.map((dataVal, index) => {
		if (dataVal.type == "paragraph--contact_form") {
			formval = <ContactForm data={dataVal} />
		}
	});

	useEffect(() => {
		if (services.type == 'taxonomy_term--services') {
			document.body.classList.add('service_detail');
			return () => {
				document.body.classList.remove('service_detail');
			};
		}

	}, []);

	return (
		<Layout preview={preview} footerMenu={footerMenu} headerMenu={headerMenu}>
			<NextSeo
				title={services?.field_meta_tags?.title}
				description={services?.field_meta_tags?.description}
				languageAlternates={hrefLang}
			/>
			{bladeList.map((blade, index) => {
				return <div key={index}> {blade}</div>;
			})}
			<Slider data={slicedData} name={serviceType} />
			{formval}

		</Layout>
	);
}


function pageBuilder(id, data, vid) {
	let blades = [];
	data.map((blade, index) => {
		if (blade.type.replace('paragraph--', '') === 'hero_banner') {
			blades.push(<HeroBanner data={blade} vidData={vid} />);
		} else if (blade.type.replace('paragraph--', '') === 'banner_second') {
			blades.push(<BannerSecond data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'intro') {
			blades.push(<Intro data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'content_with_image_video') {
			blades.push(<Services data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'html') {
			blades.push(<HtmlIntro data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'team_grid') {
			blades.push(<ColFourCards data={blade} />)
		}
	});
	return blades;
}


export async function getServerSideProps(context) {
	const { locales, locale } = context;
	const multiLanguage = isMultiLanguage(locales);
	const lang = context.preview ? context.previewData.previewLang : locale;
	const store = getCurrentLocaleStore(lang, globalDrupalStateStores);

	// handle nested slugs like /article/featured
	const slug = `/services${context.params.slug
		.map((segment) => `/${segment}`)
		.join('')}`;
	const params =
		'include=field_project_image.thumbnail,field_featured_image.thumbnail,field_service';
	// if preview, use preview endpoint and add to store.
	const previewParams =
		context.preview && (await getPreview(context, 'node--project', params));



	if (previewParams?.error) {
		return {
			redirect: {
				destination: previewParams.redirect,
				permanent: false,
			},
		};
	}
	let services
	try {
		services = await store.getObjectByPath({
			objectName: 'taxonomy_term--services',
			// Prefix the slug with the current locale
			path: `${slug}`,
			params: 'include=field_section',
			refresh: true,
			res: context.res,
			anon: context.preview ? false : true,
		});
	} catch (error) {
		// Handle the error by rendering the error500 page
		return {
			redirect: {
				destination: `/500`,
				permanent: false,
			},
		};
	}

	const bladeUrl =
		'https://dev-xenomedia-nextjs.pantheonsite.io/en/jsonapi/taxonomy_term/services/' +
		services.id +
		'/field_section';

	let blades;
	let pullJson = () => {
		fetch(bladeUrl)
			.then((response) => response.json())
			.then((responseData) => {
				blades = responseData;
			});
	};
	pullJson();

	const articles = await store.getObject({
		objectName: 'node--project',
		params: context.preview ? previewParams : params,
		res: context.res,
		refresh: true,
		anon: true,
	});
	//field_service
	const sortedArticles = sortDate({
		data: articles,
		key: 'created',
		direction: 'asce',
	});
	const heroBannerVid = await store.getObject({
		objectName: 'paragraph--hero_banner',
		params: 'include=field_video',
		refresh: true,
		res: context.res,
		anon: true,
	});

	const footerMenu = await store.getObject({
		objectName: 'menu_items--main',
		refresh: true,
		res: context.res,
		anon: true,
	});

	const headerMenu = await store.getObject({
		objectName: 'menu_items--header-menu',
		refresh: true,
		res: context.res,
		anon: true,
	});

	const origin = process.env.NEXT_PUBLIC_FRONTEND_URL;
	// Load all the paths for the current article.
	const paths = locales.map(async (locale) => {
		const localeStore = getCurrentLocaleStore(locale, globalDrupalStateStores);
		const { path } = await localeStore.getObject({
			objectName: 'taxonomy_term--services',
			id: services.id,
			params: 'include=field_section',
			refresh: true,
			res: context.res,
			anon: context.preview ? false : true,
		});
		return path;
	});



	// Resolve all promises returned as part of paths
	// and prepare hrefLang.
	const hrefLang = await Promise.all(paths).then((values) => {
		return values.map((value) => {
			return {
				hrefLang: value.langcode,
				href: origin + '/' + value.langcode + value.alias,
			};
		});
	});

	return {
		props: {
			services,
			hrefLang,
			footerMenu,
			headerMenu,
			preview: Boolean(context.preview),
			sortedArticles,
			blades,
			heroBannerVid,
		},
	};
}
