import React, { useState, useEffect } from 'react';
import Style from '../styles/search.module.scss';
export default function Filtercards(props) {
	
	const data = props.data;
	// const sval = this.props.sval
	// console.log(sval);
	return (
		<section className={Style.search_filter}>
			<div className="container">
				<div className={Style.row}>
					
				

					{
						data.length==0?(		<h3> Oops Nothing Found....</h3>):(data.map((item, index) => {
							return (
								<div key={index} className={Style.card}>
									<div className={Style.image_wrap}>
										<img src={item.image} width="100%" alt="game image" />
									</div>
									<div className={Style.content}>
										<span className={Style.category}>{item.category}</span>
										<h6 className={Style.price}>{item.price}</h6>
										<p className={Style.title}>{item.title}</p>
										<h6 className={Style.description}>{item.description}</h6>
									</div>
								</div>
							);
						}))
					}
				</div>
			</div>
		</section>
	);
}
