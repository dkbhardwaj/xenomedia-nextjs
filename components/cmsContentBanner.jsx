import React from 'react';
import { DRUPAL_URL } from '../lib/constants';
import Styles from '../styles/banner.module.scss';


export default function CmsContentBanner(props) {
   const heroBanner = props.banner
  const imgSrc = heroBanner[0]?.field_video?.uri?.url || '';
  const bannerDetail = heroBanner.map((getval,index) => {
    return (
      <div className={Styles.intro} key={index}>
      <h3> {getval.field_subtitle}</h3>
        <h1>{getval.field_title}</h1>
        </div>
    )
  });
  return (
    <section className={Styles.banner}>
      <div className={Styles.bg_video}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%' }}>
          <source src={DRUPAL_URL + imgSrc} />
        </video>
      </div>
      <div className="container">
        {bannerDetail}
      </div>
    </section>
  )
}








// const heroBanner = await store.getObject({
//   objectName: 'paragraph--hero_banner',
//   params: 'include=field_video',
//         refresh: true,
//         res: context.res,
//         anon: true,
// });