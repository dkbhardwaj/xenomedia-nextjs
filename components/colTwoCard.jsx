import React from 'react';
import Styles from '../styles/intro.module.scss';
import StylesTwo from '../styles/blogDetail.module.scss';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';




export default function Intro() {
	const { ref: magicSectionRef, inView: magicSectionIsVisible } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});
	const pattern = <div className={`${StylesTwo.intro_pattern} ${StylesTwo.service}`}>
		<svg
			ref={magicSectionRef}
			className={
				magicSectionIsVisible ? `${StylesTwo.anim} animation` : ''
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
				className={`${StylesTwo.fadein} fadein`}
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
				className={`${StylesTwo.go_anim} ${StylesTwo.line_2} go_anim`}
				stroke="#95d141"
				y2="498"
				x2="-1100"
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
				className={`${StylesTwo.go_anim} go_anim`}
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
				className={`${StylesTwo.fadein} fadein`}
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
				className={`${StylesTwo.fadein} fadein`}
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

	return (
		
		
		<section className={`${Styles.intro} ${Styles.service}`}>
		<div className="container">
			<div className={Styles.col_two_wrapper}>
				<div className={`${Styles.col_left} ${StylesTwo.landing_page}`}>

						<h2>CHECK OFF YOUR DIGITAL MARKETING TO-DO LIST WITH OUR HELP.</h2>
						{pattern}
					</div>
				<div className={ `${Styles.col_right} ${Styles.service} ${StylesTwo.landing_page} ${Styles.no_margin_bottom} ${StylesTwo.title_null}`}>
				<p style={{overflow:'visible'}} >
						Our services will grow your audiences and convert them from visitors to new business. From design and concepts through launch, analytics and optimization, we&apos;re here to help you break through the growth plateau and start seeing real ROI. 
						</p>
					
				</div>
		   
				
			</div>
		</div>
	</section>
			
	);
}


// <section className={Styles.intro}>
// 			<div className="container">
// 				<div className={Styles.col_two_wrapper} >
// 					<div className={Styles.col_left}  style={{paddingRight:'0px'}}>
// 						<h2>CHECK OFF YOUR DIGITAL MARKETING TO-DO LIST WITH OUR HELP.</h2>
// 					</div>
// 					<div className={Styles.col_right} >
// 					<div className={Styles.pattern} >
// 							<svg
// 								ref={magicSectionRef}
// 								className={
// 									magicSectionIsVisible ? `${Styles.anim} animation` : ''
// 								}
// 								width="1920"
// 								zoomAndPan="magnify"
// 								viewBox="0 0 1440 809.999993"
// 								height="1080"
// 								preserveAspectRatio="xMidYMid meet"
// 								version="1.0"
// 							>
// 								<defs>
// 									<filter
// 										x="0%"
// 										y="0%"
// 										width="100%"
// 										height="100%"
// 										id="62f5e9ae94"
// 									>
// 										<feColorMatrix
// 											values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
// 											colorInterpolationFilters="sRGB"
// 										/>
// 									</filter>
// 									<mask id="8a9bb35b5f">
// 										<g filter="url(#62f5e9ae94)">
// 											<rect
// 												x="-144"
// 												width="1728"
// 												fill="#000000"
// 												y="-80.999999"
// 												height="971.999992"
// 												fillOpacity="0.9373"
// 											/>
// 										</g>
// 									</mask>
// 									<clipPath id="de5431f358">
// 										<path
// 											d="M 0.78125 0.679688 L 45 0.679688 L 45 45 L 0.78125 45 Z M 0.78125 0.679688 "
// 											clipRule="nonzero"
// 										/>
// 									</clipPath>
// 									<clipPath id="79b85747db">
// 										<path
// 											d="M 22.796875 0.679688 C 10.636719 0.679688 0.78125 10.523438 0.78125 22.664062 C 0.78125 34.804688 10.636719 44.648438 22.796875 44.648438 C 34.957031 44.648438 44.8125 34.804688 44.8125 22.664062 C 44.8125 10.523438 34.957031 0.679688 22.796875 0.679688 "
// 											clipRule="nonzero"
// 										/>
// 									</clipPath>
// 									<clipPath id="3bfc9ba8da">
// 										<rect x="0" width="46" y="0" height="46" />
// 									</clipPath>
// 									<clipPath id="2eb5079924">
// 										<path
// 											d="M 424.199219 684 L 479 684 L 479 738.929688 L 424.199219 738.929688 Z M 424.199219 684 "
// 											clipRule="nonzero"
// 										/>
// 									</clipPath>
// 									<clipPath id="489517740b">
// 										<path
// 											d="M 424.199219 683.429688 L 479.699219 683.429688 L 479.699219 738.929688 L 424.199219 738.929688 Z M 424.199219 683.429688 "
// 											clipRule="nonzero"
// 										/>
// 									</clipPath>
// 									<clipPath id="235a9c8c1f">
// 										<path
// 											d="M 498.105469 684 L 553 684 L 553 738.929688 L 498.105469 738.929688 Z M 498.105469 684 "
// 											clipRule="nonzero"
// 										/>
// 									</clipPath>
// 									<clipPath id="4d55f10c7b">
// 										<path
// 											d="M 498.105469 683.429688 L 553.605469 683.429688 L 553.605469 738.929688 L 498.105469 738.929688 Z M 498.105469 683.429688 "
// 											clipRule="nonzero"
// 										/>
// 									</clipPath>
// 								</defs>
// 								<rect
// 									x="-144"
// 									width="1728"
// 									fill="#ffffff"
// 									y="-80.999999"
// 									height="971.999992"
// 									fillOpacity="1"
// 								/>
// 								<rect
// 									x="-144"
// 									width="1728"
// 									fill="#ffffff"
// 									y="-80.999999"
// 									height="971.999992"
// 									fillOpacity="1"
// 								/>
// 								<rect
// 									x="-144"
// 									width="1728"
// 									fill="#ffffff"
// 									y="-80.999999"
// 									height="971.999992"
// 									fillOpacity="1"
// 								/>
// 								<g
// 									id="dot"
// 									className={`${Styles.fadein} fadein`}
// 									mask="url(#8a9bb35b5f)"
// 								>
// 									<g transform="matrix(1, 0, 0, 1, 239, 331)">
// 										<g clipPath="url(#3bfc9ba8da)">
// 											<g clipPath="url(#de5431f358)">
// 												<g clipPath="url(#79b85747db)">
// 													<path
// 														fill="#95d141"
// 														d="M 0.78125 0.679688 L 45.726562 0.679688 L 45.726562 45.625 L 0.78125 45.625 Z M 0.78125 0.679688 "
// 														fillOpacity="1"
// 														fillRule="nonzero"
// 													/>
// 												</g>
// 											</g>
// 										</g>
// 									</g>
// 								</g>
// 								<line
// 									id="l1"
// 									className={`${Styles.go_anim} go_anim`}
// 									transform="rotate(0 344.6243896484375,209.95306396484378) "
// 									y2="347.277"
// 									x2="265.39905"
// 									y1="72.62911"
// 									x1="423.84975"
// 									strokeLinecap="null"
// 									strokeLinejoin="null"
// 									strokeDasharray="null"
// 									strokeWidth="5"
// 									stroke="#95d141"
// 									fill="none"
// 								/>
// 								<line
// 									id="l2"
// 									className={`${Styles.go_anim} ${Styles.line_2} go_anim`}
// 									y2="711.12677"
// 									x2="405.07041"
// 									y1="355.49297"
// 									x1="263.05163"
// 									strokeLinecap="null"
// 									strokeLinejoin="null"
// 									strokeDasharray="null"
// 									strokeWidth="5"
// 									stroke="#95d141"
// 									fill="none"
// 								/>
// 								<line
// 									id="l3"
// 									className={`${Styles.go_anim} ${Styles.line_3} go_anim`}
// 									stroke="#95d141"
// 									y2="711.12677"
// 									x2="1400"
// 									y1="711.12677"
// 									x1="405.07041"
// 									strokeLinecap="null"
// 									strokeLinejoin="null"
// 									strokeDasharray="null"
// 									strokeWidth="5"
// 									fill="none"
// 								/>
// 								<g
// 									id="c1"
// 									className={`${Styles.fadein} fadein`}
// 									clipPath="url(#2eb5079924)"
// 								>
// 									<path
// 										fill="#ffffff"
// 										d="M 456.367188 711.210938 L 478.953125 733.878906 L 474.535156 738.308594 L 451.949219 715.644531 L 429.367188 738.308594 L 424.949219 733.878906 L 447.53125 711.210938 L 424.949219 688.542969 L 429.367188 684.109375 L 451.949219 706.777344 L 474.535156 684.109375 L 478.953125 688.542969 Z M 456.367188 711.210938 "
// 										fillOpacity="1"
// 										fillRule="nonzero"
// 									/>
// 								</g>
// 								<g
// 									id="c2"
// 									className={`${Styles.fadein} fadein`}
// 									clipPath="url(#489517740b)"
// 								>
// 									<path
// 										fill="#000000"
// 										d="M 474.535156 738.929688 C 474.378906 738.929688 474.21875 738.871094 474.097656 738.75 L 451.949219 716.519531 L 429.800781 738.75 C 429.6875 738.863281 429.527344 738.929688 429.367188 738.929688 C 429.203125 738.929688 429.042969 738.863281 428.929688 738.75 L 424.511719 734.316406 C 424.269531 734.074219 424.269531 733.683594 424.511719 733.4375 L 446.660156 711.210938 L 424.511719 688.984375 C 424.269531 688.742188 424.269531 688.351562 424.511719 688.105469 L 428.929688 683.671875 C 429.042969 683.558594 429.203125 683.492188 429.367188 683.492188 C 429.527344 683.492188 429.6875 683.558594 429.800781 683.671875 L 451.949219 705.902344 L 474.097656 683.671875 C 474.339844 683.429688 474.730469 683.429688 474.972656 683.671875 L 479.386719 688.105469 C 479.628906 688.347656 479.628906 688.738281 479.386719 688.984375 L 457.242188 711.210938 L 479.386719 733.4375 C 479.503906 733.554688 479.570312 733.710938 479.570312 733.878906 C 479.570312 734.042969 479.503906 734.199219 479.386719 734.316406 L 474.972656 738.75 C 474.851562 738.871094 474.691406 738.929688 474.535156 738.929688 Z M 451.949219 715.023438 C 452.105469 715.023438 452.265625 715.085938 452.386719 715.207031 L 474.535156 737.433594 L 478.078125 733.878906 L 455.929688 711.648438 C 455.816406 711.53125 455.75 711.375 455.75 711.210938 C 455.75 711.046875 455.816406 710.890625 455.929688 710.773438 L 478.078125 688.542969 L 474.535156 684.988281 L 452.386719 707.214844 C 452.144531 707.457031 451.753906 707.457031 451.511719 707.214844 L 429.367188 684.988281 L 425.820312 688.542969 L 447.96875 710.773438 C 448.210938 711.015625 448.210938 711.40625 447.96875 711.648438 L 425.820312 733.878906 L 429.367188 737.433594 L 451.511719 715.207031 C 451.632812 715.085938 451.792969 715.023438 451.949219 715.023438 Z M 451.949219 715.023438 "
// 										fillOpacity="1"
// 										fillRule="nonzero"
// 									/>
// 								</g>
// 								<g
// 									id="c3"
// 									className={`${Styles.fadein} fadein`}
// 									clipPath="url(#235a9c8c1f)"
// 								>
// 									<path
// 										fill="#ffffff"
// 										d="M 530.273438 711.210938 L 552.855469 733.878906 L 548.441406 738.308594 L 525.855469 715.644531 L 503.269531 738.308594 L 498.851562 733.878906 L 521.4375 711.210938 L 498.851562 688.542969 L 503.269531 684.109375 L 525.855469 706.777344 L 548.441406 684.109375 L 552.855469 688.542969 Z M 530.273438 711.210938 "
// 										fillOpacity="1"
// 										fillRule="nonzero"
// 									/>
// 								</g>
// 								<g
// 									id="c4"
// 									className={`${Styles.fadein} fadein`}
// 									clipPath="url(#4d55f10c7b)"
// 								>
// 									<path
// 										fill="#000000"
// 										d="M 548.441406 738.929688 C 548.28125 738.929688 548.125 738.871094 548.003906 738.75 L 525.855469 716.519531 L 503.707031 738.75 C 503.589844 738.863281 503.433594 738.929688 503.269531 738.929688 C 503.105469 738.929688 502.949219 738.863281 502.832031 738.75 L 498.417969 734.316406 C 498.175781 734.074219 498.175781 733.683594 498.417969 733.4375 L 520.5625 711.210938 L 498.417969 688.984375 C 498.175781 688.742188 498.175781 688.351562 498.417969 688.105469 L 502.832031 683.671875 C 502.949219 683.558594 503.105469 683.492188 503.269531 683.492188 C 503.433594 683.492188 503.589844 683.558594 503.707031 683.671875 L 525.855469 705.902344 L 548.003906 683.671875 C 548.242188 683.429688 548.632812 683.429688 548.875 683.671875 L 553.292969 688.105469 C 553.535156 688.347656 553.535156 688.738281 553.292969 688.984375 L 531.144531 711.210938 L 553.292969 733.4375 C 553.410156 733.554688 553.472656 733.710938 553.472656 733.878906 C 553.472656 734.042969 553.410156 734.199219 553.292969 734.316406 L 548.875 738.75 C 548.757812 738.871094 548.597656 738.929688 548.441406 738.929688 Z M 525.855469 715.023438 C 526.011719 715.023438 526.171875 715.085938 526.292969 715.207031 L 548.441406 737.433594 L 551.984375 733.878906 L 529.835938 711.648438 C 529.71875 711.53125 529.65625 711.375 529.65625 711.210938 C 529.65625 711.046875 529.71875 710.890625 529.835938 710.773438 L 551.984375 688.542969 L 548.441406 684.988281 L 526.292969 707.214844 C 526.050781 707.457031 525.660156 707.457031 525.417969 707.214844 L 503.269531 684.988281 L 499.726562 688.542969 L 521.875 710.773438 C 522.113281 711.015625 522.113281 711.40625 521.875 711.648438 L 499.726562 733.878906 L 503.269531 737.433594 L 525.417969 715.207031 C 525.539062 715.085938 525.699219 715.023438 525.855469 715.023438 Z M 525.855469 715.023438 "
// 										fillOpacity="1"
// 										fillRule="nonzero"
// 									/>
// 								</g>
// 							</svg>
// 						</div>
// 						<p style={{overflow:'visible'}}>
// 						Our services will grow your audiences and convert them from visitors to new business. From design and concepts through launch, analytics and optimization, we&apos;re here to help you break through the growth plateau and start seeing real ROI. 
// 						</p>
// 						{/* <div className={Styles.btn_wrap}>
// 							<Link href="/" className='right_arrow_btn'>more about us</Link>
// 						</div> */}
// 					</div>
// 				</div>
// 			</div>
// 		</section>