import React, { useState, useEffect, useRef } from 'react';
import Styles from '../../styles/contactForm.module.scss';
import DOMPurify from 'isomorphic-dompurify';
import { useInView } from 'react-intersection-observer';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function ContactForm(props) {
	const formSection = useRef();
	const fieldRef = useRef();
	const { ref: magicSectionRef, inView: magicSectionIsVisible } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});

	const WHITELISTED_TAGS = ['input', 'form', 'label', 'select', 'option', 'div']
	DOMPurify.setConfig({
		IN_PLACE: true, // In place mode for faster sanitization,
		ALLOWED_TAGS: WHITELISTED_TAGS, // Only allow tags specified in the whitelist above
		ADD_ATTR: ['target'] // Allow elements with the target attribute
	})

	const formhtml = DOMPurify.sanitize(props.data?.attributes?.field_form?.processed);
	const [formVal, setFormVal] = useState("")

	useEffect(() => {
		var container = document.createElement("div")
		setTimeout(() => {
			var container2 = document.querySelector(".dynamicForm")
			function decodeEntities(encodedString) {
				var textArea = document.createElement('textarea');
				textArea.innerHTML = encodedString;
				return textArea.value;
			}
			container2.innerHTML = decodeEntities(formhtml)
			var temp = decodeEntities(formhtml)
			setFormVal(container2)
		}, 300)

	});






	const blurb = (props?.data?.attributes?.field_blurb?.processed)

	const title = DOMPurify.sanitize(props?.data?.attributes?.field_title, {
		ALLOWED_TAGS: [],
	});
	const [val, active] = useState(null);

	function setAos() {
		const body = document.body;
		const component = document.getElementById('contact_form');
		if (body.classList.contains('detail_page')) {
			component.setAttribute('data-aos', '');
		} else {
			component.setAttribute('data-aos', 'fade-up');
		}
	}
	useEffect(() => {
		setAos()
	});

	useEffect(() => {
		Aos.init({ offset: 300, duration: 2000, once: true });
	}, []);


	useEffect(() => {
		var fields = document.querySelectorAll(`#contact_form input`)
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

		function handleClick(event) {
			if (!fieldRef.current || !fieldRef.current.contains(event.target)) {
				for (let i = 0; i < fields.length; i++) {
					if (fields[i].value == '') {
						fields[i].parentNode.classList.remove('selected');
					}
				}
			}
		}
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	})

	useEffect(() => {
		var body = document.getElementsByTagName("body")[0];
		var section = document.getElementById("contact_form")
		var para = section.getElementsByTagName('p')[0];
		
		(para?.innerText)?.replace(" ' ", "&apos;")
		setTimeout(() => {
			// if ((!body.classList.contains("homepage"))) {
				var pattern = section.getElementsByClassName(Styles.pattern)[0]
			var largeHeading = section?.getElementsByTagName('h2')[0];
			
			var heading = (props?.data?.attributes?.field_title)?.split(" ")
		
			if(heading?.length >2){
				var text = largeHeading?.innerHTML
				var smallHeading = document.createElement('h4')
				smallHeading.innerHTML = title;
				(largeHeading?.parentNode)?.replaceChild(smallHeading, largeHeading);
				pattern.style.display = 'none';
			} else {
					var largeHeading = section?.getElementsByTagName('h4')[0];
				var text = largeHeading?.innerHTML
				var smallHeading = document.createElement('h2')
				smallHeading.innerHTML = title;
				(largeHeading?.parentNode)?.replaceChild(smallHeading, largeHeading);
				pattern.style.display = 'block';
			}
			//}

		
		}, "1000");


		setTimeout(() => {
			const inputElements = document.querySelectorAll('.form_items input');
			document.addEventListener('click', (event) => {
				const isClickInsideForm = event.target.closest('form');
				if (!isClickInsideForm) {
					inputElements.forEach(otherInput => {
						const parentDiv = otherInput.closest('.form_items');
						if (otherInput.value.trim() === '') {
							parentDiv.classList.remove('selected');
						}
					});
				}
			});

			inputElements.forEach(input => {
				input.addEventListener('click', () => {
					inputElements.forEach(otherInput => {
						const parentDiv = otherInput.closest('.form_items');
						if (otherInput.value.trim() === '') {
							parentDiv.classList.remove('selected');
						}
					});

					const parentDiv = input.closest('.form_items');
					if (input.value.trim() !== '') {
						parentDiv.classList.add('selected');
					} else {
						parentDiv.classList.toggle('selected');
					}
				});
			});
		}, "500");
	})

	return (
		<>
			<section
				ref={formSection}
				data-aos=''
				id='contact_form'
				className={Styles.contact_form}
			>
				<div className="container">
					<div className={Styles.col_two_wrapper}>
						<div className={Styles.col_left}>
							<div ref={fieldRef} className="dynamicForm">

							</div>
						</div>
						<div className={Styles.col_right}>
							<div className={Styles.title}>
								<h2>{title !== '' ? (title) : `Let's Talk`}</h2>
								<div className={Styles.pattern}>
									<svg
										ref={magicSectionRef}
										className={
											magicSectionIsVisible ? `${Styles.anim} animation` : ''
										}
										width="300"
										height="95"
										viewBox="0 0 60 100"
										preserveAspectRatio="xMinYMax meet"
									>
										<g>
											<ellipse
												className={`${Styles.fadein} fadein`}
												stroke="#000000"
												stroke-opacity="0"
												ry="10.38844"
												rx="10.38844"
												id="svg_1"
												cy="10.87229"
												cx="11.20144"
												stroke-linecap="null"
												stroke-linejoin="null"
												stroke-dasharray="null"
												stroke-width="5"
												fill="#95d141"
											/>
											<line
												className={`${Styles.go_anim} go_anim`}
												stroke="#95d141"
												id="svg_4"
												y2="79.52631"
												x2="61.33694"
												y1="10.42062"
												x1="10.2981"
												fill-opacity="0"
												stroke-linecap="null"
												stroke-linejoin="null"
												stroke-dasharray="null"
												stroke-width="3"
												fill="none"
											/>
											<line
												className={`${Styles.go_anim} ${Styles.line_2} go_anim`}
												id="svg_16"
												y2="78.75869"
												x2="295.79588"
												y1="78.75869"
												x1="59.57142"
												fill-opacity="0"
												stroke-linecap="null"
												stroke-linejoin="null"
												stroke-dasharray="null"
												stroke-width="3"
												stroke="#95d141"
												fill="none"
											/>
											<g
												className={`${Styles.fadein} ${Styles.cross} fadein`}
												id="svg_44"
											>
												<line
													id="svg_23"
													stroke="#000000"
													y2="88.7075"
													x2="143.89322"
													y1="65.65554"
													x1="120.84127"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="5"
													fill="none"
												/>
												<line
													id="svg_24"
													stroke="#ffffff"
													y2="88.31272"
													x2="143.49845"
													y1="66.10722"
													x1="121.29294"
													fill-opacity="0"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													fill="none"
												/>
												<line
													transform="rotate(90 132.3587799072266,77.66943359375001) "
													id="svg_25"
													stroke="#000000"
													y2="88.96957"
													x2="143.65903"
													y1="66.36929"
													x1="121.05875"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="5"
													fill="none"
												/>
												<line
													id="svg_26"
													y2="88.46843"
													x2="121.51528"
													y1="66.55889"
													x1="143.42483"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													stroke="#ffffff"
													fill="none"
												/>
												<line
													id="svg_27"
													stroke-width="4"
													y2="82.36738"
													x2="137.10143"
													y1="70.62393"
													x1="125.35798"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke="#ffffff"
													fill="none"
												/>
												<line
													id="svg_28"
													stroke="#000000"
													y2="88.7075"
													x2="143.89322"
													y1="65.65554"
													x1="120.84127"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="5"
													fill="none"
												/>
												<line
													id="svg_29"
													stroke="#ffffff"
													y2="88.31272"
													x2="143.49845"
													y1="66.10722"
													x1="121.29294"
													fill-opacity="0"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													fill="none"
												/>
												<line
													transform="rotate(90 132.3587799072266,77.66943359375001) "
													id="svg_30"
													stroke="#000000"
													y2="88.96957"
													x2="143.65903"
													y1="66.36929"
													x1="121.05875"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="5"
													fill="none"
												/>
												<line
													id="svg_31"
													y2="88.46843"
													x2="121.51528"
													y1="66.55889"
													x1="143.42483"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													stroke="#ffffff"
													fill="none"
												/>
												<line
													id="svg_32"
													stroke-width="4"
													y2="81.91571"
													x2="137.10143"
													y1="70.17226"
													x1="125.35798"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke="#ffffff"
													fill="none"
												/>
												<line
													id="svg_33"
													y2="88.46843"
													x2="121.51528"
													y1="66.55889"
													x1="143.42483"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													stroke="#ffffff"
													fill="none"
												/>
											</g>
											<g
												className={`${Styles.fadein} ${Styles.cross} fadein`}
												id="svg_46"
											>
												<line
													stroke-width="4"
													id="svg_15"
													y2="81.333"
													x2="104.8153"
													y1="69.58955"
													x1="93.07185"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke="#ffffff"
													fill="none"
												/>
												<line
													stroke="#ffffff"
													id="svg_21"
													stroke-width="4"
													y2="81.333"
													x2="104.8153"
													y1="69.58955"
													x1="93.07185"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													fill="none"
												/>
												<line
													stroke="#000000"
													id="svg_7"
													y2="88.12479"
													x2="111.60709"
													y1="65.07283"
													x1="88.55514"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="5"
													fill="none"
												/>
												<line
													stroke="#ffffff"
													id="svg_10"
													y2="87.73001"
													x2="111.21231"
													y1="65.52451"
													x1="89.0068"
													fill-opacity="0"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													fill="none"
												/>
												<line
													stroke="#000000"
													transform="rotate(90 100.07266235351562,77.08672332763673) "
													id="svg_12"
													y2="88.38686"
													x2="111.37289"
													y1="65.78658"
													x1="88.77261"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="5"
													fill="none"
												/>
												<line
													id="svg_13"
													y2="87.88572"
													x2="89.22915"
													y1="65.97618"
													x1="111.13869"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													stroke="#ffffff"
													fill="none"
												/>
												<line
													id="svg_17"
													stroke="#000000"
													y2="88.12479"
													x2="111.60709"
													y1="65.07283"
													x1="88.55514"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="5"
													fill="none"
												/>
												<line
													id="svg_18"
													stroke="#ffffff"
													y2="87.73001"
													x2="111.21231"
													y1="65.52451"
													x1="89.0068"
													fill-opacity="0"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													fill="none"
												/>
												<line
													id="svg_19"
													stroke="#000000"
													transform="rotate(90 100.07266235351562,77.08672332763673) "
													y2="88.38686"
													x2="111.37289"
													y1="65.78658"
													x1="88.77261"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="5"
													fill="none"
												/>
												<line
													id="svg_20"
													y2="87.88572"
													x2="89.22915"
													y1="65.97618"
													x1="111.13869"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													stroke="#ffffff"
													fill="none"
												/>
												<line
													id="svg_22"
													y2="87.88572"
													x2="89.22915"
													y1="65.97618"
													x1="111.13869"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													stroke="#ffffff"
													fill="none"
												/>
												<line
													id="svg_45"
													y2="81.71097"
													x2="105.24909"
													y1="70.58997"
													x1="94.1281"
													stroke-linecap="null"
													stroke-linejoin="null"
													stroke-dasharray="null"
													stroke-width="4"
													stroke="#ffffff"
													fill="none"
												/>
											</g>
										</g>
									</svg>
								</div>
							</div>
							{
								blurb !== '' ? (<div dangerouslySetInnerHTML={{ __html: blurb }} />) : (<p>Want to take your digital marketing further? Give us a few details and we&apos;ll talk about the best path for your company to get real results from your online presence.</p>)
							}
							{/* <p>{blurb !== '' ? (blurb) : `Want to take your digital marketing further? Give us a few details and we'll talk about the best path for your company to get real results from your online presence.`}</p> */}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

