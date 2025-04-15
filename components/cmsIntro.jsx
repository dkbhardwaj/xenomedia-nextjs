import React from 'react';
import { DRUPAL_URL } from '../lib/constants';
import Styles from '../styles/intro.module.scss';
import Link from 'next/link';


export default function Cmsintro(props) {
   const intro = props.introduction
  const introDetail = intro.map((getval,index) => {
    return (
          <div className={Styles.col_two_wrapper} key={index}>
          <div className={Styles.col_left}>
            <h2>{getval.field_title}</h2>
          </div>
          <div className={Styles.col_right}>
            <p>{getval.field_blurb.processed}</p>
            <div className={Styles.btn_wrap}>
              <Link href="#" className='right_arrow_btn'></Link>
            </div>
          </div>
        </div>
    )
  // console.log()
  });
  return (
    <section className={Styles.col_two_card}>
    <div className="container">
    {introDetail[1]}
    </div>
  </section>
  )
}