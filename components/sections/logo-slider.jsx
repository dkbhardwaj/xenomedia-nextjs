import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Styles from '../../styles/logoSlider.module.scss';
import { DRUPAL_URL } from '../../lib/constants';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function LogoSlider(props) {
	const [cta, setCta] = useState('');
	const btnText = props?.data?.attributes?.field_cta?.title;
	const hrefLink = props?.data?.attributes?.field_cta?.uri.replace('internal:', '');


	const { ref: magicSectionRef, inView: magicSectionIsVisible } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});
	const imgData = props.data.relationships.field_logo_items.links.related.href;
	const [pathArr, setPathArr] = useState([]);

	//fetching image path
	async function findImagePath(url) {
		const response = await fetch(url);
		const img = await response.json();
		return img;
	}
	const init = async () => {
		const file = await findImagePath(imgData);
		const idArr = file.data;
		const promises = idArr.map(async (item) => {
			let imgId = item.relationships.field_image.data.id;
			let imgUrl =
				`${DRUPAL_URL}/jsonapi/media/image/`+`${imgId}`+'/thumbnail';
			const path = await findImagePath(imgUrl);

			const imgPath = path.data.attributes.uri.url;
			return imgPath;
		});
		const images = await Promise.all(promises);
		//pushing image path into pathArr
		setPathArr((current) => [...current, images]);
	};
	const [len, setLen] = useState(1500);
	useEffect(() => {
		Aos.init({ offset: 300, duration: 2000, once: true });
		init();
		var win = window.innerWidth;
		if (win < 1100) {
			setLen(1300)
		}else{
			setLen(1500)
		}
		window.addEventListener('resize', function () {
			var win = window.innerWidth;
			if (win < 1100) {
				setLen(1300)
			}else{
				setLen(1500)
			}
		});
	}, []);
	var $ = require('jquery');
	if (typeof window !== 'undefined') {
		window.$ = window.jQuery = require('jquery');
	}
	const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
		ssr: false,
	});
	const options = {
		margin: 30,
		responsiveClass: true,
		nav: true,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		navClass: ['owl-prev', 'owl-next'],
		navText: ['', ''],
		responsive: {
			0: {
				items: 1,
			},
			595: {
				items: 2,
			},
			991: {
				items: 3,
			},
		},
	};
	const fieldTitle = props.data.attributes.field_title;

	return (
		<>
			<section data-aos="fade-up" className={`${Styles.logo_slider} padding-bottom-l`}>
				<div className="container">
					<div className={`${Styles.col_two_wrapper} padding-top-l`}>
						<div className={Styles.pattern}>
							<svg
								ref={magicSectionRef}
								className={
									magicSectionIsVisible ? `${Styles.anim} animation` : ''
								}
								width="1920"
								zoomAndPan="magnify"
								viewBox="0 0 1440 809.999993"
								height="1080"
								preserveAspectRatio="xMidYMid meet"
								version="1.0"
							>
								<defs>
									<filter
										x="0%"
										y="0%"
										width="100%"
										height="100%"
										id="0ba00b39e6"
									>
										<feColorMatrix
											values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
											colorInterpolationFilters="sRGB"
										></feColorMatrix>
									</filter>
									<mask id="1b6ca23df1">
										<g filter="url(#0ba00b39e6)">
											<rect
												x="-144"
												width="1728"
												fill="#000000"
												y="-80.999999"
												height="971.999992"
												fillOpacity="0.9373"
											></rect>
										</g>
									</mask>
									<clipPath id="0588e30e11">
										<path
											d="M 0.957031 0.652344 L 33 0.652344 L 33 33 L 0.957031 33 Z M 0.957031 0.652344 "
											clipRule="nonzero"
										></path>
									</clipPath>
									<clipPath id="8e4f52a7a4">
										<path
											d="M 16.910156 0.652344 C 8.097656 0.652344 0.957031 7.78125 0.957031 16.578125 C 0.957031 25.375 8.097656 32.507812 16.910156 32.507812 C 25.71875 32.507812 32.859375 25.375 32.859375 16.578125 C 32.859375 7.78125 25.71875 0.652344 16.910156 0.652344 "
											clipRule="nonzero"
										></path>
									</clipPath>
									<clipPath id="cacfa6d80c">
										<rect x="0" width="34" y="0" height="34"></rect>
									</clipPath>
									<clipPath id="f95ba5750d">
										<path
											d="M 413 710.398438 L 452 710.398438 L 452 750 L 413 750 Z M 413 710.398438 "
											clipRule="nonzero"
										></path>
									</clipPath>
									<clipPath id="55d9d49754">
										<path
											d="M 412.597656 710.398438 L 452.347656 710.398438 L 452.347656 750.148438 L 412.597656 750.148438 Z M 412.597656 710.398438 "
											clipRule="nonzero"
										></path>
									</clipPath>
								</defs>
								<rect
									x="-144"
									width="1728"
									fill="#ffffff"
									y="-80.999999"
									height="971.999992"
									fillOpacity="1"
								></rect>
								<rect
									x="-144"
									width="1728"
									fill="#ffffff"
									y="-80.999999"
									height="971.999992"
									fillOpacity="1"
								></rect>
								<ellipse
									className={`${Styles.fadein} fadein`}
									ry="15"
									rx="15"
									id="svg_35"
									cy="78"
									cx="-350"
									strokeOpacity="0"
									strokeDasharray="null"
									strokeWidth="0"
									stroke="#000000"
									fill="#95d141"
								/>
								<line
									className={`${Styles.go_anim} go_anim`}
									id="svg_23"
									y2="332.05208"
									x2="-349"
									y1="92"
									x1="-349"
									strokeLinecap="null"
									strokeLinejoin="null"
									strokeDasharray="null"
									strokeWidth="5"
									stroke="#000000"
									fill="none"
								/>
								<line
									className={`${Styles.go_anim} ${Styles.line_2} go_anim`}
									id="svg_25"
									y2="729"
									x2="-214"
									y1="599"
									x1="-299"
									strokeLinecap="null"
									strokeLinejoin="null"
									strokeDasharray="null"
									strokeWidth="5"
									stroke="#000000"
									fill="none"
								/>
								<line
									className={`${Styles.go_anim} ${Styles.line_3} go_anim`}
									stroke="#000000"
									id="svg_26"
									y2="728"
									x2={len}
									y1="728"
									x1="-214.03377"
									strokeLinecap="null"
									strokeLinejoin="null"
									strokeDasharray="null"
									strokeWidth="5"
									fill="none"
								/>
								<line
									className={`${Styles.fadein} ${Styles.cross} fadein`}
									id="svg_30"
									y2="745.50362"
									x2="-131"
									y1="711"
									x1="-165"
									strokeLinecap="null"
									strokeLinejoin="null"
									strokeDasharray="null"
									strokeWidth="5"
									stroke="#95d141"
									fill="none"
								/>
								<line
									className={`${Styles.fadein} ${Styles.cross} fadein`}
									transform="rotate(90 197.99999999999991,729.0000000000001) "
									id="svg_34"
									y2="1092"
									x2="215"
									y1="1058"
									x1="180"
									strokeLinecap="null"
									strokeLinejoin="null"
									strokeDasharray="null"
									strokeWidth="5"
									stroke="#95d141"
									fill="none"
								/>
							</svg>
						</div>
						<div className={Styles.col_left}>
							<h2>{fieldTitle}</h2>
						</div>
						<div className={Styles.col_right}>
							<div className={Styles.slider_wrap}>
								<OwlCarousel
									className="owl-theme"
									loop
									margin={4}
									nav={true}
									navText={['', '<img src="/images/Arrow_right.png" />']}
									dots={false}
									animateIn={true}
									{...options}
								>
									{pathArr[0]?.map((path, index) => {
										return (
											<div className={Styles.slider_card} key={index}>
												<div className={Styles.image_wrap}>
													<img src={DRUPAL_URL + path} alt="sss_logo" />
												</div>
											</div>
										);
									})}
								</OwlCarousel>
							</div>
						</div>
					</div>
					{
						props?.data?.attributes?.field_cta ? <div className={Styles.btn_wrap}>
							<Link href={hrefLink} className="right_arrow_btn">
								{btnText}
							</Link>
						</div> : ''
					}
				</div>
			</section>

			<ul id="owl-carousel-ul" className="owl-carousel owl-loaded owl-drag">
				{' '}
			</ul>
		</>
	);
}