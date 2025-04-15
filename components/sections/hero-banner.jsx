import React from 'react';
import Styles from '../../styles/banner.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import { DRUPAL_URL } from '../../lib/constants';


export default function HeroBanner(props) {
	
	const imgSrc = props.vidData[0]?.field_video?.uri?.url || '';
	const link = props.data.relationships.field_video.links.related.href;
	const bannerHeading = props?.data?.attributes?.field_hero_title;
	const bannerSubHeading = props?.data?.attributes?.field_subtitle;
	const bannerTitle = props?.data?.attributes?.field_title;
	const [videoPath, setVideoPath] = useState();

	async function findImagePath(url) {
		const response = await fetch(url, { method: 'GET' });
		const img = await response.json();
		return img;
	}

	const init = async () => {
		const file = await findImagePath(props.data.relationships.field_video.links.related.href);
		setVideoPath(
			file.data.attributes.uri.url
		);
	};
	useEffect(() => {
		init();
	});
	
	useEffect(() => {
		if (videoPath) {
			// initialize video player
			const video = document.getElementById("heroBanner");
			video.src = videoPath;
		}
	}, [videoPath]);
	let slidingTags;
	useEffect(() => {

		var section = document.getElementsByClassName(Styles.banner)[0];
		if (document.body.classList.contains('services')) {
			section.classList.add(Styles.banner_second)
		}

		var slidingDiv = document.getElementById('slidingVertical')
		var slidingTags = slidingDiv.querySelectorAll("span");
		var slideH1 = slidingDiv.querySelectorAll("h1")[0];
		let n = 0;

		slideH1.style.animationDuration = (slidingTags.length + 1) * 2.5 + "s";
		for (let i = 0; i < slidingTags.length; i++) {
			n += 2.5;
			slidingTags[i].style.animationDelay = n + "s";
			slidingTags[i].style.animationDuration = (slidingTags.length + 1) * 2.5 + "s";
		}
	});

	return (
		<section className={Styles.banner}>
			<div className={Styles.icon_wrapper}>
				<div className={Styles.icon_wrap}>
					<Link
						href="https://www.facebook.com/Xeno-Media-275247338926/"
						className="empty_link"
					>
						.
					</Link>
					<svg
						id="fb"
						viewBox="0,0,256,256"
						width="45px"
						height="45px"
						fillRule="nonzero"
					>
						<g
							fill="#95d141"
							fillRule="nonzero"
							stroke="none"
							strokeWidth="1"
							strokeLinecap="butt"
							strokeLinejoin="miter"
							strokeMiterlimit="10"
							strokeDasharray=""
							strokeDashoffset="0"
							fontFamily="none"
							fontWeight="none"
							fontSize="none"
							textAnchor="none"
						// style={{mix-blend-mode: 'normal'}}
						>
							<g transform="scale(8.53333,8.53333)">
								<path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.016 4.432,10.984 10.206,11.852v-8.672h-2.969v-3.154h2.969v-2.099c0,-3.475 1.693,-5 4.581,-5c1.383,0 2.115,0.103 2.461,0.149v2.753h-1.97c-1.226,0 -1.654,1.163 -1.654,2.473v1.724h3.593l-0.487,3.154h-3.106v8.697c5.857,-0.794 10.376,-5.802 10.376,-11.877c0,-6.627 -5.373,-12 -12,-12z"></path>
							</g>
						</g>
					</svg>
				</div>
				<div className={Styles.icon_wrap}>
					<Link href="https://www.instagram.com/xenomediail/" className="empty_link">
						.
					</Link>

					<svg
						viewBox="0,0,256,256"
						width="45px"
						height="45px"
						fillRule="nonzero"
					>
						<g
							fill="#95d141"
							fillRule="nonzero"
							stroke="none"
							strokeWidth="1"
							strokeLinecap="butt"
							strokeLinejoin="miter"
							strokeMiterlimit="10"
							strokeDasharray=""
							strokeDashoffset="0"
							fontFamily="none"
							fontWeight="none"
							fontSize="none"
							textAnchor="none"
						// style="mix-blend-mode: normal"
						>
							<g transform="scale(8.53333,8.53333)">
								<path d="M9.99805,3c-3.859,0 -6.99805,3.14195 -6.99805,7.00195v10c0,3.859 3.14195,6.99805 7.00195,6.99805h10c3.859,0 6.99805,-3.14195 6.99805,-7.00195v-10c0,-3.859 -3.14195,-6.99805 -7.00195,-6.99805zM22,7c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM15,9c3.309,0 6,2.691 6,6c0,3.309 -2.691,6 -6,6c-3.309,0 -6,-2.691 -6,-6c0,-3.309 2.691,-6 6,-6zM15,11c-2.20914,0 -4,1.79086 -4,4c0,2.20914 1.79086,4 4,4c2.20914,0 4,-1.79086 4,-4c0,-2.20914 -1.79086,-4 -4,-4z"></path>
							</g>
						</g>
					</svg>
				</div>
				<div className={Styles.icon_wrap}>
					<Link href="https://www.linkedin.com/company/xeno-media/" className="empty_link">
						.
					</Link>
					<svg
						viewBox="0,0,256,256"
						width="45px"
						height="45px"
						fillRule="nonzero"
					>
						<g
							fill="#95d141"
							fillRule="nonzero"
							stroke="none"
							strokeWidth="1"
							strokeLinecap="butt"
							strokeLinejoin="miter"
							strokeMiterlimit="10"
							strokeDasharray=""
							strokeDashoffset="0"
							fontFamily="none"
							fontWeight="none"
							fontSize="none"
							textAnchor="none"
						// style="mix-blend-mode: normal"
						>
							<g transform="scale(8.53333,8.53333)">
								<path d="M24,4h-18c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2zM10.954,22h-2.95v-9.492h2.95zM9.449,11.151c-0.951,0 -1.72,-0.771 -1.72,-1.72c0,-0.949 0.77,-1.719 1.72,-1.719c0.948,0 1.719,0.771 1.719,1.719c0,0.949 -0.771,1.72 -1.719,1.72zM22.004,22h-2.948v-4.616c0,-1.101 -0.02,-2.517 -1.533,-2.517c-1.535,0 -1.771,1.199 -1.771,2.437v4.696h-2.948v-9.492h2.83v1.297h0.04c0.394,-0.746 1.356,-1.533 2.791,-1.533c2.987,0 3.539,1.966 3.539,4.522z"></path>
							</g>
						</g>
					</svg>
				</div>
			</div>
			<div className={Styles.bg_video}>
				<video id='heroBanner' autoPlay loop muted playsInline >
				</video>
			</div>
			<div className="container">
				<div className={Styles.intro}>
					<h3>{bannerSubHeading}</h3>
					<h2>{bannerTitle}</h2>
					<div id='slidingVertical' class={Styles.slidingVertical}>
						<h1>{bannerHeading[0]}</h1>
						{bannerHeading.slice(1).map((element, index) => (
							<span key={index}>{element}</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
