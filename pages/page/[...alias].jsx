import { NextSeo, VideoGameJsonLd } from 'next-seo';
import { isMultiLanguage } from '../../lib/isMultiLanguage';
import { getPreview } from '../../lib/getPreview';
import { useState, useEffect, useRouter } from 'react';
import { sortDate } from '@pantheon-systems/nextjs-kit';
import {
	getCurrentLocaleStore,
	globalDrupalStateStores,
} from '../../lib/stores';
import Link from 'next/link';
import Layout from '../../components/layout';

import HeroBanner from '../../components/sections/hero-banner';
import Intro from '../../components/sections/intro';
import Statistics from '../../components/sections/statistics';
import LogoSlider from '../../components/sections/logo-slider';
import ContactForm from '../../components/sections/contact-form';
import BannerSecond from '../../components/sections/banner_second';
import View from '../../components/sections/view';
import ContentWithText from '../../components/contentWithText';
import CaseStudy from '../../components/sections/content_with_image_video';
import HtmlIntro from '../../components/sections/htmlIntro';
import ImageGallery from '../../components/sections/gallery';
import ContentWithImage from '../../components/sections/colTwoImage';
import Body from '../../components/sections/Body';
import ColFourCards from '../../components/sections/colFourCards';


export default function PageTemplate({
	bladeUrl,
	blades,
	page,
	hrefLang,
	footerMenu,
	headerMenu,
	preview,
	heroBannerVid,
	multiLanguage,
	sortedBlogs,
	sortedProjects,
	services,
	allResources,
}) {
	let bladeList = pageBuilder(
		blades.id,
		blades.data,
		heroBannerVid,
		multiLanguage,
		hrefLang,
		sortedBlogs,
		sortedProjects,
		services,
		allResources,
	);
	
	useEffect(() => {
		document.body.classList.add(page.title.split(' ').join('-'));
		return () => {
			document.body.classList.remove(page.title.split(' ').join('-'));
		};
	}, []);

	return (
		<Layout preview={preview} footerMenu={footerMenu} headerMenu={headerMenu}>
			<NextSeo
				title={page?.field_meta_tag?.title}
				description={page?.field_meta_tag?.description}
				languageAlternates={hrefLang}
			/>
			{bladeList.map((blade, index) => {
				return blade;
			})}
		</Layout>
	);
}
//section builder
function pageBuilder(id, data, vid, multiLang, hrefLang, blogs, projects, services,blogResources) {
	let blades = [];
	
	data.map((blade, index) => {
		if (blade.type.replace('paragraph--', '') === 'hero_banner') {
			blades.push(<HeroBanner data={blade} vidData={vid} />);
		} else if (blade.type.replace('paragraph--', '') === 'intro') {
			blades.push(<Intro data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'statistics') {
			blades.push(<Statistics data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'logo_slider') {
			blades.push(<LogoSlider data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'contact_form') {
			blades.push(<ContactForm data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'banner_second') {
			blades.push(<BannerSecond data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'view') {
			blades.push(<View sectiondata={blade} data={blogResources} lang={multiLang} hrefLang={hrefLang} project={projects} serviceList={services} />);
		} else if ((blade.type.replace('paragraph--', '')).replace("_new_section_","") === 'content_with_text') {
			blades.push(<ContentWithText data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'content_with_image_video') {
			blades.push(<CaseStudy data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'html') {
			blades.push(<HtmlIntro data={blade} />)
		} else if (blade.type.replace('paragraph--', '') === 'image_gallery') {
			blades.push(<ImageGallery data={blade} />)
		} else if (blade.type.replace('paragraph--', '') === 'content_with_image') {
			blades.push(<ContentWithImage data={blade} />)
		} else if (blade.type.replace('paragraph--', '') === 'body') {
			blades.push(<Body data={blade} />)
		} else if (blade.type.replace('paragraph--', '') === 'team_grid') {
			blades.push(<ColFourCards data={blade} />)
		}

	});
	return blades;
}


//async function
export async function getServerSideProps(context) {
	const { locales, locale } = context;
	const multiLanguage = isMultiLanguage(locales);
	const lang = context.preview ? context.previewData.previewLang : locale;

	const store = getCurrentLocaleStore(lang, globalDrupalStateStores);

	// handle nested slugs like /pages/page
	const slug = `/page${context.params.alias
		.map((segment) => `/${segment}`)
		.join('')}`;

	const params = 'include=relationships.field_video';
	// if preview, use preview endpoint and add to store.
	const previewParams =
		context.preview && (await getPreview(context, 'node--page'));

	if (previewParams?.error) {
		return {
			redirect: {
				destination: previewParams.redirect,
				permanent: false,
			},
		};
	}
	let page
	try {
		page = await store?.getObjectByPath({
			objectName: 'node--page',
			// Prefix the slug with the current locale
			path: `${multiLanguage ? lang : ''}${slug}`,
			params: context.preview && previewParams,
			// params: 'include=relationships.field_video',
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
		'https://dev-xenomedia-nextjs.pantheonsite.io/en/jsonapi/node/page/' +
		page.id +
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
	//banner video
	const heroBannerVid = await store.getObject({
		objectName: 'paragraph--hero_banner',
		params: 'include=field_video',
		refresh: true,
		res: context.res,
		anon: true,
	});
	//next page blogs

	
	var blogs
	const pageSize = 50; // Set your desired page size
	let allResources = [];
	let currentPage = 0;
	async function getBlogs(ps,cp) {
		var temp = await store.getObject({
			objectName: 'node--blog',
			params: `include=field_featured_image.thumbnail,field_blog_type&page%5Boffset%5D=${cp}&page%5Blimit%5D=${ps}`,
			res: context.res,
			refresh: true,
			anon: true,
		});
		return temp
	}
	async function fetchAllResources() {
		const data = await getBlogs(pageSize, currentPage)
	
		if (data.length != 0) {
			allResources = allResources.concat(data)
			currentPage = currentPage + 50
			fetchAllResources()
		} else {
			return
		}
	}
	fetchAllResources()
	
    blogs = allResources
	
	
	const projects = await store.getObject({
		objectName: 'node--project',
		params:
			'include=field_featured_image.thumbnail , field_project_type , field_service , field_sector, field_project_type',
		res: context.res,
		refresh: true,
		anon: true,
	});
	if (!blogs) {
		throw new Error(
			'No blogs returned. Make sure the objectName and params are valid!',
		);
	}
	const sortedBlogs = sortDate({
		data: blogs,
		key: 'created',
		direction: 'desc',
	});
	const sortedProjects = sortDate({
		data: projects,
		key: 'created',
		direction: 'desc',
	});

	const services = await store.getObject({
		objectName: 'taxonomy_term--services',
		params: 'include=field_icon_image.thumbnail',
		res: context.res,
		refresh: true,
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
			objectName: 'node--page',
			id: page.id,
			// params: context.preview ? previewParams : params,
			refresh: true,
			res: context.res,
			// anon: context.preview ? false : true,
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
			bladeUrl,
			blades,
			page,
			hrefLang,
			footerMenu,
			headerMenu,
			preview: Boolean(context.preview),
			heroBannerVid,
			multiLanguage,
			sortedBlogs,
			sortedProjects,
			services,
			allResources,
		},
	};
}
