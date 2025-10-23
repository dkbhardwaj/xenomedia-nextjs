import { NextSeo } from 'next-seo';
import { isMultiLanguage } from '../../lib/isMultiLanguage';
import { getPreview } from '../../lib/getPreview';
import Link from 'next/link';
import { sortDate } from '@pantheon-systems/nextjs-kit';
import {
	getCurrentLocaleStore,
	globalDrupalStateStores,
} from '../../lib/stores';
import { IMAGE_URL } from '../../lib/constants';
import { DRUPAL_URL } from '../../lib/constants';
import {Helmet} from "react-helmet";

import Layout from '../../components/layout';
import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { useState, useEffect } from 'react';
import Styles from '../../styles/blogDetail.module.scss';

const GradientPlaceholder = () => (
	<div className={Styles.no_img}>
		<h2 className=''>Xeno</h2>
	</div>
);

export default function ArticleTemplate({
	blog,
	hrefLang,
	footerMenu,
	headerMenu,
	preview,
	articles,
}) {
	//sort by date
	const sorted = articles.sort((a, b) => {
		const aDate = new Date(
			a.created.split('T')[0] + ' ' + a.created.split('T')[1],
		);
		const bDate = new Date(
			b.created.split('T')[0] + ' ' + b.created.split('T')[1],
		);
		return bDate.getTime() - aDate.getTime();
	});

	const recentP = sorted.slice(0, 4);
	const { title, field_teaser, field_body, created, type, id } = blog;
	var filteredPosts = recentP.filter((one) => one.id != id);

	const imgSrc = blog?.field_featured_image[0]?.thumbnail?.uri?.url || '';
	const [author, setAuthor] = useState('unknown');

	const uidLink = `${DRUPAL_URL}/en/jsonapi/node/blog/${id}/uid`;
	async function findCtaPath(url) {
		const response = await fetch(url);
		const img = await response.json();
		return img;
	}

	const WHITELISTED_TAGS = ['ul', 'h1', 'h2', 'h3', 'h4', 'h5', 'p', 'a', 'h6', 'img', 'b','i','u','strong', 'ol', 'li', 'div', 'form', 'input', 'label', 'select', 'option', 'button','tr','td','th','thead','tfoot','table','tbody','span','blockquote','q','figure','figcaption','hr','code','picture','video','textarea','canvas','caption','aside','audio','sub','sup','s','hr','style','font','em']
	DOMPurify.setConfig({
		IN_PLACE: true, // In place mode for faster sanitization,
		ALLOWED_TAGS: WHITELISTED_TAGS, // Only allow tags specified in the whitelist above
		ADD_ATTR: ['target'] // Allow elements with the target attribute
	})

	useEffect(() => {
		setTimeout(() => {
			var formPara = document.querySelectorAll(".body_text p")
			formPara.forEach((item) => {
				if (item.innerText.includes("<form")) {
					var form = decodeEntities(item.innerText)
					item.outerHTML = form
				}
			})
			function decodeEntities(encodedString) {
				var textArea = document.createElement('textarea');
				textArea.innerHTML = encodedString;
				return textArea.value;
			}

		}, 1500)
	})

	useEffect(() => {
		setTimeout(() => {
			var fields = document.querySelectorAll(`.body_text input`)
			fields.forEach(element => {
				element.addEventListener('click', () => {
					for (let i = 0; i < fields.length; i++) {
						if (fields[i].parentNode.classList.contains('selected')) {
							if (fields[i].value == '') {
								fields[i].parentNode.classList.remove('selected')
							}
						}
					}
					element.parentNode.classList.add('selected')

				})
			});

			document.addEventListener('click', (e) => {
				if (e.target.tagName != "INPUT") {
					for (let i = 0; i < fields.length; i++) {
						if (fields[i].parentNode.classList.contains('selected')) {
							if (fields[i].value == '') {
								fields[i].parentNode.classList.remove('selected')
							}
						}
					}
				}
			})

		}, 2000)


	})

	//recentposts
	if (filteredPosts.length == 4) {
		filteredPosts = filteredPosts.slice(0, 3);
	}
	const recentPostHtml = filteredPosts.map((post, i) => {
		const cDate = dateFormatter(post.created);
		return (
			<div className={Styles.wrapper} key={i}>
				<Link href={post.path.alias}></Link>
				<div className={Styles.col_img}>
					<img
						src={`${DRUPAL_URL}${post.field_featured_image[0].thumbnail.uri.url}`}
						alt=""
					/>
				</div>
				<div className={Styles.col_intro}>
					<h6>{post.title}</h6>
					<span>{cDate}</span>
				</div>
			</div>
		);
	});
	//end recent posts

	//author name
	const init = async () => {
		const file = await findCtaPath(uidLink);
		setAuthor(file.data.attributes.display_name);
	};
	useEffect(() => {
		init();
	}, []);
	const actualDate = dateFormatter(created);

	function dateFormatter(dateValue) {
		let createdData = dateValue.split('T')[0];
		let month = createdData.split('-')[1];
		let date = createdData.split('-')[2];
		let year = createdData.split('-')[0];
		//date format
		const monthName = getName();
		function getName() {
			switch (month) {
				case '01':
					return 'Jan';
				case '02':
					return 'Feb';
				case '03':
					return 'Mar';
				case '04':
					return 'Apr';
				case '05':
					return 'May';
				case '06':
					return 'Jun';
				case '07':
					return 'Jul';
				case '08':
					return 'Aug';
				case '09':
					return 'Sep';
				case '10':
					return 'Oct';
				case '11':
					return 'Nov';
				case '12':
					return 'Dec';
				default:
					return 'foo';
			}
		}
		const actualDate = `${date} ${monthName}, ${year}`;
		
		return actualDate;
		
	}
	const imageSrc = blog?.field_meta_tag?.image_src;
const resolvedImageUrl = imageSrc
  ? (imageSrc.startsWith('http')
      ? imageSrc
      : `https://dev-xenomedia-nextjs.pantheonsite.io${imageSrc}`)
  : `https://dev-xenomedia-nextjs.pantheonsite.io${imgSrc}`;

	return (
		<Layout preview={preview} footerMenu={footerMenu} headerMenu={headerMenu}>
			<Helmet>
				
				<meta name="twitter:url" content={`https://www.xenomedia.com/${blog?.path?.langcode}/${blog?.path?.alias}`} />
				<meta name="twitter:title" content={blog?.field_meta_tag?.title} />
				{/* This is a JSX comment 
				<meta name="twitter:image" content={`${(blog?.field_meta_tag?.image_src) == undefined ? `https://www.xenomedia.com/${imgSrc}`: `https://www.xenomedia.com/${blog?.field_meta_tag?.image_src}`}`} />

				url: `${(blog?.field_meta_tag?.image_src) == undefined ? `https://www.xenomedia.com/${imgSrc}`: `https://www.xenomedia.com/${blog?.field_meta_tag?.image_src}`}`,
					 width: 1200, height: 600, alt: "blog",
				*/}
				<meta name="twitter:image" content={resolvedImageUrl} />
				<meta name="twitter:image:width" content="1200" />
				<meta name="twitter:image:height" content="600" />
            </Helmet>
			<NextSeo
				title={blog?.field_meta_tag?.title}
				description={blog?.field_meta_tag?.description}
				languageAlternates={hrefLang}
				openGraph={{ type: 'blog detail',title: `${blog?.field_meta_tag?.title}`,
				  description: `${blog?.field_meta_tag?.description}`,
				  images: [ 
				   {
					 
					url: resolvedImageUrl,
					 width: 1200, height: 600, alt: "blog",
				   }
					],
					twitter: {
						cardType: 'summary_large_image',
						site: '@xenomedia',
					  },
				}}
				twitter={{
				  cardType: 'summary_large_image',
				  title: `${blog?.field_meta_tag?.title}`,
				  description: `${blog?.field_meta_tag?.description}`,
				  handle: '@xenomedia',
				  site: '@xenomedia',
				}}
			/>
			<section
				style={{ height: '100px', backgroundColor: '#349fb6' }}
			></section>
			<section className={`${Styles.landing_page} padding-bottom-s`}>
				<div className="container">
					<div className={Styles.blog_intro}>
						<h1>{title}</h1>
						<Link href="/en/page/blogs">
							<p>
								&larr; Back to{' '}
								{type.replace('node--', '').charAt(0).toUpperCase() +
									type.replace('node--', '').slice(1)}
							</p>{' '}
						</Link>
						<ul className={Styles.about}>
							<li>
								By <p>{author}</p>
							</li>
							<li>
								<p>{actualDate}</p>
							</li>
						</ul>
					</div>
					{/* <div className='bg_img' style={{height:'100%',width:'100%',position:'absolute',top:'0',left:'0'}}>
                    <img src={DRUPAL_URL + imgSrc} alt={thumbnail?.resourceIdObjMeta?.alt} />
				</div> */}
				</div>
			</section>
			<section className={`${Styles.content} no-padding-top`}>
				<div className="container">
					<div className={Styles.wrapper}>
						<div className={Styles.col_left}>
							<div className={Styles.banner_img}>
								{imgSrc !== '' ? (
									<img
										src={DRUPAL_URL + imgSrc}
										width="100"
										height="100"
										style={{ objectFit: 'cover' }}
										alt={blog?.field_featured_image[0]?.thumbnail.filename}
									/>
								) : (
									<GradientPlaceholder />
								)}
							</div>
							{field_body == null ? (
								<h5 style={{ marginTop: '50px', textAlign: 'center' }}>
									No content Avialable
								</h5>
							) : (
								<div
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(field_body.processed),
									}}
									className={`body_text ${Styles.body_text}`}
								/>
							)}
						</div>
						<div className={Styles.col_right}>
							<div>
								<h4>Recent posts</h4>
								<div className={Styles.recent_post}>{recentPostHtml}</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { locales, locale } = context;
	const multiLanguage = isMultiLanguage(locales);
	const lang = context.preview ? context.previewData.previewLang : locale;

	const store = getCurrentLocaleStore(lang, globalDrupalStateStores);

	// handle nested slugs like /article/featured
	const slug = `/blog${context.params.slug
		.map((segment) => `/${segment}`)
		.join('')}`;

	const params = 'include=field_featured_image.thumbnail&sort=-created&page[limit]=5`)';
	// if preview, use preview endpoint and add to store.
	const previewParams =
		context.preview && (await getPreview(context, 'node--blog', params));

	if (previewParams?.error) {
		return {
			redirect: {
				destination: previewParams.redirect,
				permanent: false,
			},
		};
	}

	const blog = await store.getObjectByPath({
		objectName: 'node--blog',
		// Prefix the slug with the current locale
		path: `${slug}`,
		params: context.preview ? previewParams : params,
		refresh: true,
		res: context.res,
		anon: context.preview ? false : true,
	});

	const articles = await store.getObject({
		objectName: 'node--blog',
		params: context.preview ? previewParams : params,
		res: context.res,
		refresh: true,
		anon: true,
	});
	const sortedArticles = sortDate({
		data: articles,
		key: 'changed',
		direction: 'asce',
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
			objectName: 'node--blog',
			id: blog.id,
			params: context.preview ? previewParams : params,
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
			blog,
			hrefLang,
			footerMenu,
			headerMenu,
			preview: Boolean(context.preview),
			articles,
		},
	};
}
