import React from 'react';
import Styles from '../../styles/introWithCounter.module.scss';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Statistics(props) {
	// console.log(props.data)
	const [count, setCount] = useState(false);
	const [counters, setCounters] = useState();
	async function findImagePath(url) {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	}

	const init = async () => {
		const file = await findImagePath(
			props.data.relationships.field_statistics_items.links.related.href,
		);
		setCounters(file.data);
	};
	useEffect(() => {
		Aos.init({ offset: 300, duration: 2000, once: true });
		init();
	}, []);

	const field_title = props.data.attributes.field_title;
	const counterBlocks = counters?.map((counter, index) => {
		return (
			<ScrollTrigger
				onEnter={() => setCount(true)}
				key={index}
				className={Styles.col_three}
			>
				<div className={Styles.counter_wrap}>
					<h3>
						{count && (
							<CountUp
								start={0}
								end={counter.attributes.field_number}
								duration={2}
								delay={0}
							/>
						)}
					</h3>
					<span>{counter.attributes.field_suffix}</span>
				</div>
				<h6>{counter.attributes.field_subtitle}</h6>
			</ScrollTrigger>
		);
	});

	return (
		<section data-aos="fade-up" className={Styles.intro_with_counter}>
			<div className="container">
				<div className={Styles.intro}>
					<h2>{field_title}</h2>
				</div>
				<div className={`${Styles.col_three_wrapper} ${['shadow-bostonBlue']}`}>
					{counterBlocks}
				</div>
			</div>
		</section>
	);
}
