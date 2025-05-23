import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { isMultiLanguage } from '../../lib/isMultiLanguage.js';
import { sortDate } from '@pantheon-systems/nextjs-kit';
import {
	getCurrentLocaleStore,
	globalDrupalStateStores,
} from '../../lib/stores';

import Layout from '../../components/layout';
import PageHeader from '../../components/page-header';
import Link from 'next/link';



export default function PageListTemplate({
	hrefLang,
	sortedPages,
	footerMenu,
	multiLanguage,
}) {
	// console.log(sortedPages)
	const { locale } = useRouter();
	return (
		<Layout footerMenu={footerMenu}>
			<NextSeo
				title="Decoupled Next Drupal Demo"
				description="Generated by create next app."
				languageAlternates={hrefLang || false}
			/>{' '}
			<PageHeader title="Pages" />
			<div className="mt-12 mx-auto max-w-[50vw]">
				<section></section>
				<section></section>
				<div className="container">
					<ul>
						{sortedPages ? (
							sortedPages?.map(({ id, title, body, path }) => (
								<li className="prose justify-items-start mt-8" key={id}>
									<h2>{title}</h2>
									<div dangerouslySetInnerHTML={{ __html: body?.summary }} />
									<Link
										passHref
										href={`${multiLanguage ? `/${path?.langcode || locale}` : ''
											}${path.alias}`}
										className="font-normal underline"
									>
										Read more →
									</Link>
								</li>
							))
						) : (
							<h2 className="text-xl text-center mt-14">No pages found 🏜</h2>
						)}
					</ul>
				</div>
				
			</div>
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const origin = process.env.NEXT_PUBLIC_FRONTEND_URL;
	const { locales, locale } = context;
	// if there is more than one language in context.locales,
	// assume multilanguage is enabled.
	const multiLanguage = isMultiLanguage(locales);
	const hrefLang = locales.map((locale) => {
		return {
			hrefLang: locale,
			href: origin + '/' + locale,
		};
	});

	const store = getCurrentLocaleStore(locale, globalDrupalStateStores);

	try {
		const pages = await store.getObject({
			objectName: 'node--page',
			refresh: true,
			res: context.res,
			params: 'fields[node--page]=id,title,body,path',
			anon: true,
		});

		const footerMenu = await store.getObject({
			objectName: 'menu_items--main',
			refresh: true,
			res: context.res,
			anon: true,
		});

		if (!pages) {
			return { props: { footerMenu } };
		}

		const sortedPages = sortDate({
			data: pages,
			key: 'changed',
			direction: 'asc',
		});

		return {
			props: {
				sortedPages,
				footerMenu,
				hrefLang,
				multiLanguage,
			},
		};
	} catch (error) {
		console.error('Unable to fetch data for pages: ', error);
		return {
			notFound: true,
		};
	}
}
