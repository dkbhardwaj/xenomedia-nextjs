import Link from 'next/link';
import { DRUPAL_URL } from '../../lib/constants';
import React from 'react';
import Styles from '../../styles/blogFilter.module.scss';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
// import { DateTime } from 'luxon';


const GradientPlaceholder = () => (
	<div className={Styles.no_img}>
		<h4>no image</h4>
	</div>
);

export default function BlogItem({ data, multiLanguage, locale }) {
	const imgSrc = data?.field_featured_image[0]?.thumbnail?.uri?.url || '';

	const WHITELISTED_TAGS = ['h1','h2','h3','h4','h5','p','a','h6']
	DOMPurify.setConfig({
		IN_PLACE: true, // In place mode for faster sanitization,
		ALLOWED_TAGS: WHITELISTED_TAGS, // Only allow tags specified in the whitelist above
		ADD_ATTR: ['target'] // Allow elements with the target attribute
	})
	const teaser = DOMPurify.sanitize(data?.field_teaser?.processed);
	var service;
	if (data.type === 'node--project') {
		if (data.field_service.length != 0) {
			let tempp = data.field_service;
			getList(tempp);
		}
	}
	function getList(val) {
		const services = val?.map((serve, i) => {
			return (
				<li key={i}>
					<Link href={serve?.path?.alias == undefined?'':serve?.path?.alias}>{serve.name}</Link>
				</li>
			);
		});
		service = services;
	}

	let createdData = data?.created.split('T')[0];
	let month = createdData.split('-')[1];
	let date = createdData.split('-')[2];
	let year = createdData.split('-')[0];

	const monthName = getName();
	function getName() {
		switch (month) {
			case '01':
				return 'Jan';
			case '02':
				return 'Feb';
			case '03':
				return 'Mar';
			case '04':
				return 'Apr';
			case '05':
				return 'May';
			case '06':
				return 'Jun';
			case '07':
				return 'Jul';
			case '08':
				return 'Aug';
			case '09':
				return 'Sep';
			case '10':
				return 'Oct';
			case '11':
				return 'Nov';
			case '12':
				return 'Dec';
			default:
				return 'foo';
		}
	}
	const actualDate = `${date} ${monthName}, ${year}`;
	// const formatted = DateTime.fromISO(createdData).toFormat('MMM dd, yyyy');

	const myLoader = ({ src, width, quality }) => {
		return `${src}?w=${width}&q=${quality || 75}`
	  }

	return (
		<div className={Styles.card_wrap}>
			
			<div className={Styles.card}>
				<div className={Styles.img_wrap}>
					{imgSrc !== '' ? (
						<Image
							layout='fill'
							objectFit='cover'
							//    loader={myLoader} 
							src={imgSrc}
							alt={data?.field_featured_image[0]?.thumbnail.filename}
							// width={300}
							// height={300}
							// quality={50}
							priority
							unoptimization='false'
						/>
					) : (
						<GradientPlaceholder />
					)}
				</div>
				<div className={Styles.text_wrap}>
					<h6 className={Styles.type}>
						{data?.type.replace('node--', '').charAt(0).toUpperCase() +
							data?.type.replace('node--', '').slice(1)}
					</h6>
					<p className={Styles.heading}>{data?.title}</p>
					{data.type === 'node--blog' ? (
						<span>{actualDate}</span>
					) : (
						<span>Read More</span>
					)}

					<div className={Styles.short_detail_wrap}>
						<Link className="empty_link" passHref href={`${multiLanguage ? `/${data?.path.langcode || locale}` : ''}${data?.path.alias}`}>
							{' '}
							.{' '}
						</Link>
						{data.type === 'node--blog' ? (
							<div dangerouslySetInnerHTML={{ __html: teaser }} />
						) : (
							<ul className={Styles.services}>{service}</ul>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
