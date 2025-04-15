import { useEffect, useState } from 'react';
import React from 'react';
import Image from 'next/image';
import Styles from '../../styles/blogBanner.module.scss';
import { clearConfig } from 'dompurify';


export default function Banner_second(props) {

  const sectionData = props.data
    const [imgPath, setImgPath] = useState();
    const [alt,setAlt] = useState("image")
  const imgData = sectionData.relationships.hasOwnProperty('field_image') ? (sectionData?.relationships.field_image?.links?.related?.href) : (sectionData?.relationships?.field_video?.links?.related?.href);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  
    async function findImagePath(url) {
		const response = await fetch(url);
		const img = await response.json();
		return img;
    } 
    
    const init = async () => {
        const file = await findImagePath(imgData);
      const idArr = file.data;
      if (idArr?.relationships?.hasOwnProperty('field_media_image')) {
        let imgUrl = idArr?.relationships?.field_media_image?.links?.related?.href;
        setAlt(idArr.relationships.field_media_image.data.meta.alt)
        const path = await findImagePath(imgUrl);
        setImgPath(path?.data?.attributes?.uri?.url);
      } else {
        const value = idArr?.attributes?.uri.url
        setImgPath(value);
      }
        
    };

	useEffect(() => {
		init();
  });
  
  useEffect(() => {
    if (sectionData.relationships.hasOwnProperty('field_video')) {
      if (imgPath) {
      // initialize video player
      const video = document.getElementById("myVideo");
      video.src = imgPath;
      }
    }
  }, [imgPath]);
  
  return (
    <section className={Styles.banner}>
      <div className={Styles.bg_img}>
        {sectionData.relationships.hasOwnProperty('field_image') ? (<Image src={imgPath!=undefined?imgPath:'/banner/banner_poster.png'} alt={alt} width={1700} quality={50}  height={500} priority async />) : (
          <video id="myVideo" autoPlay  loop muted playsInline>
				</video>
        )}
        
      </div>
    <div className="container">
        <div className={Styles.text_wrap}>
                  <h1>{sectionData?.attributes?.field_title }</h1>
        </div>
    </div>
</section>
  )
}
