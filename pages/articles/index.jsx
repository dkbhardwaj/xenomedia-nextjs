import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { isMultiLanguage } from '../../lib/isMultiLanguage.js';
import { sortDate } from '@pantheon-systems/nextjs-kit';
import {
	getCurrentLocaleStore,
	globalDrupalStateStores,
} from '../../lib/stores';
import { useState } from 'react';

import { ArticleGridItem } from '../../components/grid';
import { withGrid } from '@pantheon-systems/nextjs-kit';
import PageHeader from '../../components/page-header';
import Layout from '../../components/layout';

export default function SSRArticlesListTemplate({
	sortedArticles,
	footerMenu,
	hrefLang,
	multiLanguage,
}) {
	console.log(hrefLang)
	const { locale } = useRouter();
	const ArticleGrid = withGrid(ArticleGridItem);

	const [cd, setCd] = useState(sortedArticles);
	const [selected, setselected] = useState(0);
	const [pgValue, setPgValue] = useState(1);
	const [rows, setRows] = useState(1);
	let arr = [];
	
	let pageBtn;
	const trimStart = (pgValue - 1) * rows;
	const trimEnd = trimStart + rows;
	let trimData = cd.slice(trimStart, trimEnd);
	
	const pages = Math.ceil(cd?.length / rows);

	//search filter
	const handler = e => {
		var pgno = pgValue
		const val = e.target.value
		if (val != '') {
			let data
			data = sortedArticles.filter(one => one.title.toLowerCase().includes(val))
				setPgValue(1)
			
			
			setCd(data)

		}
		else {
			console.log(pgno)
			setCd(sortedArticles)
			// setPgValue(pgno)
		}
	}

	//pagination
	 for (let i = 1; i <= pages; i++) {
		 arr.push(i);
	 }
	//show page Btn List
	 pageBtn = arr && arr.map((item, index) => (
		 <li className={selected === index ? "paginationBtn active_btn": "paginationBtn"} onClick={() => clickHandler(item, index)} key={index}>{item}</li>
	 ));
	 //clickHandler
	 function clickHandler(item,index) {
		 if (selected === index) {
			 setselected(null)
		   }
		 setselected(index)
		 paginationContent(item)
	 }
	 //paginationContent
	 function paginationContent(pgNumber) {
		 setPgValue(pgNumber);
	 }
	 

    //pagination end

	return (
		<Layout footerMenu={footerMenu}>
			<NextSeo
				title="Decoupled Next Drupal Demo"
				description="Generated by create next app."
				languageAlternates={hrefLang || false}
			/>
			<section>
			   <PageHeader title="Articles" />
			</section>
			<section>
				<div className="container">
					<input type="text" placeholder='search'
						style={{
						width: '300px', height: '40px', padding:'5px 15px'
						}}
						onChange={handler}
					/>
				</div>
				
			 </section>
			<section>
				<div className="container">
						{trimData.length === 0 ?(<h2 className=''>not found</h2>):(
                    <ArticleGrid
					data={trimData}
					contentType="articles"
					multiLanguage={multiLanguage}
					locale={locale}
				/>
				)}
				
				<div className="pagination" style={{marginTop:'50px'}}>
					<ul style={{display:'flex',justifyContent:'center'}}>
					  {pageBtn}
					</ul>
				</div>
				</div>
				
			</section>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	try {
		const origin = process.env.NEXT_PUBLIC_FRONTEND_URL;
		const { locale, locales } = context;
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

		const articles = await store.getObject({
			objectName: 'node--article',
			res: context.res,
			refresh: true,
			params: 'include=field_media_image.field_media_image',
			anon: true,
		});

		const footerMenu = await store.getObject({
			objectName: 'menu_items--main',
			res: context.res,
			refresh: true,
			anon: true,
		});

		if (!articles) {
			throw new Error(
				'No articles returned. Make sure the objectName and params are valid!',
			);
		}

		const sortedArticles = sortDate({
			data: articles,
			key: 'changed',
			direction: 'desc',
		});

		return {
			props: {
				sortedArticles,
				hrefLang,
				multiLanguage,
				footerMenu,
			},
		};
	} catch (error) {
		console.error('Unable to fetch data for article page: ', error);
		return {
			notFound: true,
		};
	}
}
