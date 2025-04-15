import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { isMultiLanguage } from '../../lib/isMultiLanguage.js';
import { sortDate } from '@pantheon-systems/nextjs-kit';
import {
	getCurrentLocaleStore,
	globalDrupalStateStores,
} from '../../lib/stores';
import { useState, useEffect, useRef } from 'react';

import BlogItem from '../../components/sections/blogs';
import Layout from '../../components/layout';
import Styles from '../../styles/blogFilter.module.scss';

export default function BlogListTemplate({
	sortedBlogs,
	footerMenu,
	hrefLang,
	multiLanguage,
}) {
	
	const { locale } = useRouter();
	const sorted = sortedBlogs.sort((a, b) => {
		const aDate = new Date(
			a.created.split('T')[0] + ' ' + a.created.split('T')[1],
		);
		const bDate = new Date(
			b.created.split('T')[0] + ' ' + b.created.split('T')[1],
		);
		return bDate.getTime() - aDate.getTime();
	});
	const [categories, setCategories] = useState([]);
	const [cd, setCd] = useState(sorted);
	const [selected, setselected] = useState(0);
	const [pgValue, setPgValue] = useState(1);
	const [rows, setRows] = useState(12);
	let arr = [];

	let pageBtn;
	const trimStart = (pgValue - 1) * rows;
	const trimEnd = trimStart + rows;
	let trimData = cd.slice(trimStart, trimEnd);
	const pages = Math.ceil(cd?.length / rows);
	const [listState, setListState] = useState(0);
	const [toSearch, setToSearch] = useState(sorted);
	//pagination
	for (let i = 1; i <= pages; i++) {
		arr.push(i);
	}
	//show page Btn List
	pageBtn =
		arr &&
		arr.map((item, index) => (
			<li
				className={
					selected === index ? 'paginationBtn active_btn' : 'paginationBtn'
				}
				onClick={() => clickHandler(item, index)}
				key={index}
			>
				{item}
			</li>
		));
	//clickHandler
	function clickHandler(item, index) {
		if (selected === index) {
			setselected(null);
		}
		setselected(index);
		paginationContent(item);
	}
	//paginationContent
	function paginationContent(pgNumber) {
		setPgValue(pgNumber);
	}
	//pagination end

	// get filter catagories
	sorted.map((one) => {
		if (one.hasOwnProperty('field_blog_type')) {
			if (one.field_blog_type.length != 0) {
				let type = one.field_blog_type[0].name;
				if (categories.indexOf(type) === -1) {
					setCategories([...categories, type]);
				}
			}
		} else {
			console.log('ns');
		}
	});
	//checkbox
	const [getCategory, SetGetCategory] = useState([]);
	const getVal = (e) => {
		const value = e.target.value;
		const checked = e.target.checked;
		if (checked) {
			SetGetCategory((current) => [...current, value]);
		} else {
			SetGetCategory((oldValues) => {
				return oldValues.filter((fruit) => fruit !== value);
			});
		}
	};
	function filteringData(demo) {
		const haveCategoryName = sorted.filter(
			(one) => one.field_blog_type.length != 0,
		);
		if (getCategory.length != 0) {
			demo.map((singleVal) => {
				const filtered = () => {
					return haveCategoryName.filter(
						(val) => val.field_blog_type[0].name == singleVal,
					);
				};

				setCd(filtered);
				setToSearch(filtered);
			});
		} else {
			setCd(sorted);
		}
	}
 
	useEffect(() => {
		filteringData(getCategory);
	}, [getCategory]);

	let categoryref = useRef();
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (!categoryref.current.contains(e.target)) {
				setListState(0);
			}
		};
		document.addEventListener('click', handleClickOutside, true);
	});

	//categorybox
	const categoryBox = () => {
		if (listState == 0) {
			setListState(1);
		} else {
			setListState(0);
		}
	};
	//removeCategoty
	const removeCategoty = (val) => {
		var selectedCat = document.querySelectorAll(".filtered_by label input");
		selectedCat.forEach((category) => {
			category.value === val ?(category.checked =false):''
		})
		SetGetCategory((prev) => {
			return prev.filter((s) => s != val);
		});
	};
	//search filter
	const handler = (e) => {
		var pgno = pgValue;
		const val = e.target.value;
		if (val != '') {
			const data = toSearch.filter(
				(one) =>
					one.title.toLowerCase().includes(val) ||
					one.field_teaser.processed.toLowerCase().includes(val),
			);
			setPgValue(1);
			setselected(0);

			setCd(data);
		} else {
			setselected(0);
			setCd(toSearch);
		}
	};

	// return
	return (
		<Layout footerMenu={footerMenu}>
			<NextSeo
				title="Blogs Landing"
				description="Find all blogs here"
				languageAlternates={hrefLang || false}
			/>
		
			<section className={Styles.blog_filter}>
				<div className="container">
					<div className={Styles.filter_block}>
						<div
							className={
								listState == 0
									? Styles.category_wrap
									: `${Styles.category_wrap} ${Styles.active}`
							}
							ref={categoryref}
						>
							<input
								type="text"
								value={
									getCategory.length === 0
										? 'Select to Filter'
										: `${getCategory.length} item selected`
								}
								readOnly
								className={Styles.selected_val}
								onClick={() => categoryBox()}
							/>
							<ul ref={categoryref}>
								{categories.map((cat, index) => {
									return (
										<li key={index} className="filtered_by">
											<label htmlFor={index}>
												<input
													type="checkbox"
													id={index}
													name={cat}
													value={cat}
													onChange={getVal}
												/>
												{cat}
											</label>
										</li>
									);
								})}
							</ul>
						</div>
						<div className={Styles.search_wrap}>
							<input
								type="text"
								className={Styles.search}
								placeholder="Search"
								onChange={handler}
							/>
						</div>
					</div>
					{getCategory.length !== 0 ? (
						<div className={Styles.filters}>
							<h6>Filtered By :-</h6>
							{getCategory.map((c, i) => {
								return (
									<p key={i} onClick={() => removeCategoty(c)}>
										{c} <span>x</span>
									</p>
								);
							})}
						</div>
					) : ""}

					<div className="wrapper">
						{trimData.length === 0 ? (
							<h3 className={Styles.not_found}>Not Found</h3>
						) : (
							trimData.map((card, index) => {
								return (
									<BlogItem
										data={card}
										contentType="blogs"
										multiLanguage={multiLanguage}
										locale={locale}
										key={index}
									/>
								);
							})
						)}
					</div>
					<div className="pagination" style={{ marginTop: '50px' }}>
						<ul style={{ display: 'flex', justifyContent: 'center' }}>
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

		const blogs = await store.getObject({
			objectName: 'node--blog',
			params: 'include=field_featured_image.thumbnail , field_blog_type',
			res: context.res,
			refresh: true,
			anon: true,
		});

		const footerMenu = await store.getObject({
			objectName: 'menu_items--main',
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
			key: 'changed',
			direction: 'desc',
		});

		return {
			props: {
				sortedBlogs,
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
