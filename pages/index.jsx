import { NextSeo } from 'next-seo';
import { isMultiLanguage } from '../lib/isMultiLanguage';
import { getPreview } from '../lib/getPreview';
import { useState, useEffect } from 'react';
import { getCurrentLocaleStore, globalDrupalStateStores } from '../lib/stores';
import Link from 'next/link';
import Layout from '../components/layout';
import HeroBanner from '../components/sections/hero-banner';
import Intro from '../components/sections/intro';
import Statistics from '../components/sections/statistics';
import LogoSlider from '../components/sections/logo-slider';
import ContactForm from '../components/sections/contact-form';
import BannerSecond from '../components/sections/banner_second';
import View from '../components/sections/view';
import ContentWithImageVideo from '../components/sections/content_with_image_video';
import ContentWithText from '../components/contentWithText';
import ContentWithList from '../components/contentWithList';
import HtmlIntro from '../components/sections/htmlIntro';
import ColFourCards from '../components/sections/colFourCards';


export default function PageTemplate({
	blades,
	page,
	hrefLang,
	footerMenu,
	headerMenu,
	preview,
	heroBannerVid,
	blogs
}) {
	let bladeList = pageBuilder(blades.id, blades.data, heroBannerVid, blogs);
	useEffect(() => {
		document.body.classList.add('homepage');
		return () => {
			document.body.classList.remove('homepage');
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
				return (
					<>
						<div key={index}>
							{blade}
						</div>
					</>
				);
			})}
		</Layout>
	);
}
//section builder
function pageBuilder(id, data, vid, blogs) {
	let blades = [];
	data.map((blade, index) => {
		if (blade.type.replace('paragraph--', '') === 'hero_banner') {
			blades.push(<HeroBanner data={blade} vidData={vid} />);
		} else if (blade.type.replace('paragraph--', '') === 'intro') {
			blades.push(<Intro data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'content_with_text') {
			blades.push(<ContentWithText data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'content_with_text_new_section_') {
			blades.push(<ContentWithList data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'html') {
			blades.push(<HtmlIntro data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'content_with_image_video') {
			blades.push(<ContentWithImageVideo data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'statistics') {
			blades.push(<Statistics data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'logo_slider') {
			blades.push(<LogoSlider data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'contact_form') {
			blades.push(<ContactForm data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'banner_second') {
			blades.push(<BannerSecond data={blade} />);
		} else if (blade.type.replace('paragraph--', '') === 'view') {
			blades.push(<View sectiondata={blade} data={blogs} />);
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

	const params = 'include=relationships.field_video';
	// if preview, use preview endpoint and add to store.
	const previewParams =
		context.preview && (await getPreview(context, 'node--page', params));

	if (previewParams?.error) {
		return {
			redirect: {
				destination: previewParams.redirect,
				permanent: false,
			},
		};
	}

	const page = await store.getObjectByPath({
		objectName: 'node--page',
		// Prefix the slug with the current locale
		path: `${multiLanguage ? lang : ''}`,
		params: context.preview && previewParams,
		// params: 'include=relationships.field_video',
		refresh: true,
		res: context.res,
		anon: context.preview ? false : true,
	});
	const bladeUrl =
		'https://dev-xenomedia-nextjs.pantheonsite.io/en/jsonapi/node/page/2b2c5cd0-a92d-465c-970d-e60ad273904d/field_section';

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

	const pageSize = 50; // Set your desired page size
    let allResources = [];
    let currentPage = 0;

    async function getBlogs(ps, cp) {
        // Fetch data from your store
        const temp = await store.getObject({
            objectName: 'node--blog',
            params: `include=field_featured_image.thumbnail,field_blog_type&page%5Boffset%5D=${cp}&page%5Blimit%5D=${ps}`,
            res: context.res,
            refresh: true,
            anon: true,
        });
        return temp;
    }

    async function fetchAllResources() {
        let hasMore = true;
        while (hasMore) {
            const data = await getBlogs(pageSize, currentPage);
            if (data.length > 0) {
                allResources = allResources.concat(data);
                currentPage += pageSize;
            } else {
                hasMore = false;
            }
        }
    }

    // Await the fetchAllResources to complete
    await fetchAllResources();
	var blogs  = allResources;

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
			blades,
			page,
			hrefLang,
			footerMenu,
			headerMenu,
			preview: Boolean(context.preview),
			heroBannerVid,
			blogs
		},
	};
}
