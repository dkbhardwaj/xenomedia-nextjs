import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import BlogItem from '../sections/blogs';
import Styles from '../../styles/blogFilter.module.scss';
import Aos from 'aos';
import 'aos/dist/aos.css';
export default function BlogListTemplate(props) {
	const data = props.data;
	const multiLanguage = props.lang;
	const hrefLang = props.hrefLang;
	const { locale } = useRouter();
	const sorted = data.sort(function (a, b) {
		var dateA = new Date(a.created), dateB = new Date(b.created)
		return dateB - dateA
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
		if (demo.length != 0) {
			let dataArr = [];
			demo.map((singleVal) => {
				const filtered = haveCategoryName.filter(
					(val) => val.field_blog_type[0].name == singleVal,
				);
				dataArr.push(filtered);
				if (dataArr.length > 1) {
					const concatArr = [].concat.apply([], dataArr);
					setCd(concatArr);
					setToSearch(concatArr);
				} else {
					setCd(dataArr[0]);
					setToSearch(dataArr[0]);
				}
			});
		} else {
			setCd(sorted);
		}
	}

	useEffect(() => {
		Aos.init({ offset: 300, duration: 2000, once: true });
		filteringData(getCategory);
	}, [getCategory]);
	// outerclick dropdown off
	let categoryref = useRef();
	useEffect(() => {
		function handleClickOutside(event) {
			if (categoryref.current && !categoryref.current.contains(event.target)) {
				setListState(0);
			}
		}
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [listState]);

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
		var selectedCat = document.querySelectorAll('.filtered_by label input');
		selectedCat.forEach((category) => {
			category.value === val ? (category.checked = false) : '';
		});
		SetGetCategory((prev) => {
			return prev.filter((s) => s != val);
		});
		setPgValue(1);
		setselected(0);
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
		<>
			<section data-aos="fade-up" className={Styles.blog_filter}>
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
					) : (
						''
					)}

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
		</>
	);
}
