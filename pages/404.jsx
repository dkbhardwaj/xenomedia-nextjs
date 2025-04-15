import Layout from '../components/layout';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

export default function Custom404() {
	
	const [menudata, setmenudata] = useState(null);

	// async function findImagePath(url) {
	// 	const response = await fetch(url);
	// 	const img = await response.json();
	// 	return img;
	// }
	// const init = async () => {
	// 	const file = await findImagePath('https://dev-xenomedia-nextjs.pantheonsite.io/en/jsonapi/taxonomy_term/services');
	// 	const idArr = file.data;
	// 	setmenudata(idArr)
	// };
	// useEffect(() => {
	// 	init()
	// }, []);

	// console.log(menudata);
	

	return (
		<Layout headerMenu={menudata}>
			<section  style={{ minHeight: '100px', backgroundColor: '#349fb6' }}>
				
			</section>
			<section style={{ display: 'flex',height: 'calc(100vh - 401px)', alignItems: 'center'}}>
				<div className="container">
					<div className="prose text-center" >
						<h2 style={{ margin:'0 0 20px' ,color:'#575757'}} >Page Not Found</h2>
						<p style={{ color: '#575757',margin:'0 auto 20px',maxWidth:'600px' }}>Sorry we couldn&#39;t find this page. But don&#39;t worry, you can find plenty of other things on our <Link href="/" style={{ color: '#95d141',fontWeight:'500',fontSize:'16px' }}>Homepage</Link></p>
						
					</div>
				</div>
				
			</section>
			
		</Layout>
	);
}


