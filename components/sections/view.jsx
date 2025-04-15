import React from 'react';
import BlogLanding from './blogLanding';
import Portfolio from '../portfolioBlogs';
import Services from '../serviceCards'
import LatestBlogs from './latestBlogs';

export default function View(props) {
	const bladeType = props.sectiondata?.attributes?.field_view

	let sections 

	if (bladeType === 'blog') {
		sections = (<BlogLanding data={props.data} lang={props.lang}/>)
	} else if(bladeType === 'portfolio'){
		sections = (<Portfolio projects={props.project} lang={props.lang} hrefLang={ props.hrefLang}/>)
	} else if(bladeType === 'latest-blog'){
		sections =  (<LatestBlogs data={props.data}/>)
	} else {
		sections = (<Services data={props.serviceList} lang={props.lang} hrefLang={ props.hrefLang}/>)
	}


	return (
		<>
			{sections}
			  
		</>
	);
}


