import React from 'react';
import Styles from '../styles/introWithCounter.module.scss';

export default function IntroWithCounter() {
	return (
		<section className={Styles.intro_with_counter}>
			<div className="container">
				<div className={Styles.intro}>
					<h2>we started with web design now we&#39;re here...</h2>
				</div>
				<div className={`${Styles.col_three_wrapper} ${['shadow-bostonBlue']}`}>
					<div className={Styles.col_three}>
						<div className={Styles.counter_wrap}>
							<h3>100</h3>
							<span>+</span>
						</div>
						<h6>clients served</h6>
					</div>
					<div className={Styles.col_three}>
						<div className={Styles.counter_wrap}>
							<h3>50</h3>
							<span>+</span>
						</div>
						<h6>campaign&#39;s launched</h6>
					</div>
					<div className={Styles.col_three}>
						<div className={Styles.counter_wrap}>
							<h3>200</h3>
							<span>+</span>
						</div>
						<h6>digital ads completed</h6>
					</div>
					<div className={Styles.col_three}>
						<div className={Styles.counter_wrap}>
							<h3>150</h3>
							<span>+</span>
						</div>
						<h6>websites created</h6>
					</div>
					<div className={Styles.col_three}>
						<div className={Styles.counter_wrap}>
							<h3>25</h3>
							<span>+</span>
						</div>
						<h6>videos produced</h6>
					</div>
					<div className={Styles.col_three}>
						<div className={Styles.counter_wrap}>
							<h3>500</h3>
							<span>+</span>
						</div>
						<h6>social media posts created</h6>
					</div>
				</div>
			</div>
		</section>
	);
}
