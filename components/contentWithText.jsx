import React, { useEffect } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import Styles from '../styles/contentWithList.module.scss';
import DOMPurify from 'isomorphic-dompurify';
import Aos from 'aos';
import 'aos/dist/aos.css';
export default function ContentWithList(props) {
	const sectionData = props.data

	const WHITELISTED_TAGS = ['ul','h1','h2','h3','h4','h5','p','a', 'li','div']
	DOMPurify.setConfig({
		IN_PLACE: true, // In place mode for faster sanitization,
		ALLOWED_TAGS: WHITELISTED_TAGS, // Only allow tags specified in the whitelist above
		ADD_ATTR: ['target'] // Allow elements with the target attribute
	})
	
	const sanitizedBlurb = DOMPurify.sanitize(sectionData?.attributes?.field_blurb_text?.processed);

	const { ref: magicSectionRef, inView: magicSectionIsVisible } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});
	useEffect(() => {
		Aos.init({ offset: 300, duration: 2000, once: true });
	}, []);

	const subtitle = sectionData?.attributes?.field_subtitle
	const suffix = sectionData?.attributes?.field_suffix
	const title = sectionData?.attributes?.field_title

	return (
		<section data-aos="fade-up" className={`${Styles.content_with_list} ${Styles.homepage}`}>
			<div className="container">
				{(!subtitle && !suffix && !title && !sanitizedBlurb) ? "" : 
				<div className={Styles.col_two_wrapper}>
					<div className={Styles.col_left}>
						<div className={Styles.content}>
							<div className={Styles.heading_wrap}>
								<div className={Styles.heading}>
									<h3 className={Styles.bg_white_arrow}>{sectionData?.attributes?.field_subtitle}</h3>
								</div>
								<div className={Styles.sub_heading}>
									<h5>{sectionData?.attributes?.field_suffix}</h5>
								</div>
							</div>
							<div dangerouslySetInnerHTML={{ __html: sanitizedBlurb }} className={Styles.list_wrap} />
						</div>
						<div className={Styles.cross_wrap}>
							<div className={Styles.img_wrap}>
								<img src="/x-graphic.png" alt="x_logo" />
							</div>
							<div className={Styles.img_wrap}>
								<img src="/x-graphic.png" alt="x_logo" />
							</div>
							<div className={Styles.img_wrap}>
								<img src="/x-graphic.png" alt="x_logo" />
							</div>
						</div>
					</div>
					<div className={Styles.col_right}>
						<h2>{sectionData?.attributes?.field_title}</h2>
					</div>
				</div>
				}
				
				
					<div className={Styles.btn_wrap}>
						{sectionData?.attributes?.field_cta !== null ? (<Link href={sectionData?.attributes?.field_cta?.uri.replace('internal:', '')} className="left_arrow_btn">
							{sectionData?.attributes?.field_cta?.title}
						</Link>) : ''}
						<div className={Styles.pattern}>
							<svg
								ref={magicSectionRef}
								className={
									magicSectionIsVisible ? `${Styles.anim} animation` : ''
								}
								width="1300"
								zoomAndPan="magnify"
								viewBox="0 0 1613.051 1029.798"
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
										id="4ae908233e"
									>
										<feColorMatrix
											values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
											color-interpolation-filters="sRGB"
										/>
									</filter>
									<mask id="d290c9ff1f">
										<g filter="url(#4ae908233e)">
											<rect
												x="-144"
												width="1728"
												fill="#000000"
												y="-80.999999"
												height="971.999992"
												fill-opacity="0.9373"
											/>
										</g>
									</mask>
									<clipPath id="fc7dc1ed4b">
										<path
											d="M 1.070312 0.503906 L 37 0.503906 L 37 37 L 1.070312 37 Z M 1.070312 0.503906 "
											clip-rule="nonzero"
										/>
									</clipPath>
									<clipPath id="e2904ef55c">
										<path
											d="M 19.019531 0.503906 C 9.105469 0.503906 1.070312 8.527344 1.070312 18.421875 C 1.070312 28.320312 9.105469 36.34375 19.019531 36.34375 C 28.929688 36.34375 36.964844 28.320312 36.964844 18.421875 C 36.964844 8.527344 28.929688 0.503906 19.019531 0.503906 "
											clip-rule="nonzero"
										/>
									</clipPath>
									<clipPath id="2377c48a8e">
										<rect x="0" width="38" y="0" height="38" />
									</clipPath>
									<clipPath id="c38823e575">
										<path
											d="M 1003.167969 477 L 1048 477 L 1048 521.554688 L 1003.167969 521.554688 Z M 1003.167969 477 "
											clip-rule="nonzero"
										/>
									</clipPath>
									<clipPath id="62940f3072">
										<path
											d="M 1003.167969 476.554688 L 1048.167969 476.554688 L 1048.167969 521.554688 L 1003.167969 521.554688 Z M 1003.167969 476.554688 "
											clip-rule="nonzero"
										/>
									</clipPath>
								</defs>
								<rect
									x="-144"
									width="1728"
									fill="#ffffff"
									y="-80.999999"
									height="971.999992"
									fill-opacity="1"
								/>
								<rect
									x="-144"
									width="1728"
									fill="#ffffff"
									y="-80.999999"
									height="971.999992"
									fill-opacity="1"
								/>
								<g
									id="b1"
									className={`${Styles.fadein} fadein`}
									mask="url(#d290c9ff1f)"
								>
									<g transform="matrix(1, 0, 0, 1, 1214, 288)">
										<g clip-path="url(#2377c48a8e)">
											<g clip-path="url(#fc7dc1ed4b)">
												<g clip-path="url(#e2904ef55c)">
													<path
														fill="#95d141"
														d="M 1.070312 0.503906 L 37.707031 0.503906 L 37.707031 37.136719 L 1.070312 37.136719 Z M 1.070312 0.503906 "
														fill-opacity="1"
														fill-rule="nonzero"
													/>
												</g>
											</g>
										</g>
									</g>
								</g>
								<line
									id="b3"
									className={`${Styles.go_anim} ${Styles.line_2} go_anim`}
									stroke="#95d141"
									y2="498"
									x2="-1350"
									y1="498"
									x1="1130"
									fill-opacity="0"
									stroke-linecap="null"
									stroke-linejoin="null"
									stroke-dasharray="null"
									stroke-width="5"
									fill="none"
								/>
								<line
									id="b2"
									className={`${Styles.go_anim} go_anim`}
									y2="497.25"
									x2="1129.5"
									y1="320.625"
									x1="1228.5"
									fill-opacity="0"
									stroke-linecap="null"
									stroke-linejoin="null"
									stroke-dasharray="null"
									stroke-width="5"
									stroke="#95d141"
									fill="none"
								/>
								<g
									id="b4"
									className={`${Styles.fadein} fadein`}
									clip-path="url(#c38823e575)"
								>
									<path
										fill="#ffffff"
										d="M 1029.25 499.078125 L 1047.558594 517.457031 L 1043.976562 521.050781 L 1025.667969 502.675781 L 1007.355469 521.050781 L 1003.773438 517.457031 L 1022.085938 499.078125 L 1003.773438 480.703125 L 1007.355469 477.105469 L 1025.667969 495.484375 L 1043.976562 477.105469 L 1047.558594 480.703125 Z M 1029.25 499.078125 "
										fill-opacity="1"
										fill-rule="nonzero"
									/>
								</g>
								<g
									id="b5"
									className={`${Styles.fadein} fadein`}
									clip-path="url(#62940f3072)"
								>
									<path
										fill="#000000"
										d="M 1043.976562 521.554688 C 1043.851562 521.554688 1043.722656 521.503906 1043.625 521.40625 L 1025.667969 503.386719 L 1007.710938 521.40625 C 1007.617188 521.5 1007.488281 521.554688 1007.355469 521.554688 C 1007.222656 521.554688 1007.097656 521.5 1007 521.40625 L 1003.421875 517.8125 C 1003.226562 517.617188 1003.226562 517.300781 1003.421875 517.101562 L 1021.378906 499.078125 L 1003.421875 481.058594 C 1003.226562 480.859375 1003.226562 480.542969 1003.421875 480.347656 L 1007 476.75 C 1007.097656 476.65625 1007.222656 476.605469 1007.355469 476.605469 C 1007.488281 476.605469 1007.617188 476.65625 1007.710938 476.75 L 1025.667969 494.773438 L 1043.625 476.75 C 1043.820312 476.554688 1044.136719 476.554688 1044.332031 476.75 L 1047.914062 480.347656 C 1048.109375 480.542969 1048.109375 480.859375 1047.914062 481.058594 L 1029.957031 499.078125 L 1047.914062 517.101562 C 1048.007812 517.195312 1048.058594 517.324219 1048.058594 517.457031 C 1048.058594 517.589844 1048.007812 517.71875 1047.914062 517.8125 L 1044.332031 521.40625 C 1044.234375 521.503906 1044.105469 521.554688 1043.976562 521.554688 Z M 1025.667969 502.171875 C 1025.792969 502.171875 1025.921875 502.222656 1026.019531 502.320312 L 1043.976562 520.339844 L 1046.851562 517.457031 L 1028.894531 499.433594 C 1028.800781 499.339844 1028.75 499.210938 1028.75 499.078125 C 1028.75 498.945312 1028.800781 498.820312 1028.894531 498.722656 L 1046.851562 480.703125 L 1043.976562 477.816406 L 1026.019531 495.839844 C 1025.824219 496.035156 1025.507812 496.035156 1025.3125 495.839844 L 1007.355469 477.816406 L 1004.480469 480.703125 L 1022.4375 498.722656 C 1022.632812 498.921875 1022.632812 499.238281 1022.4375 499.433594 L 1004.480469 517.457031 L 1007.355469 520.339844 L 1025.3125 502.320312 C 1025.410156 502.222656 1025.539062 502.171875 1025.667969 502.171875 Z M 1025.667969 502.171875 "
										fill-opacity="1"
										fill-rule="nonzero"
									/>
								</g>
							</svg>
						</div>
					</div>
				
				
			</div>
		</section>

	);
}


