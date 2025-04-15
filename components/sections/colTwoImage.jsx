import React from 'react';
import { useState, useEffect , useRouter} from 'react';
import Styles from '../../styles/colTwoImage.module.scss';
import { DRUPAL_URL } from '../../lib/constants';
import Image from 'next/image';
export default function ColTwoImage(props) {
    const sectionData = props.data
    const title = sectionData.attributes?.field_title
    const blurb = sectionData.attributes?.field_blurb?.processed
    const [imgPath, setImgPath] = useState();

    const imageId = sectionData.relationships?.field_image?.data?.id
    const urlForImage = `${DRUPAL_URL}/en/jsonapi/media/image/${imageId}/thumbnail`


    async function findCtaPath(url) {
		const response = await fetch(url);
    const img = await response.json();
		return img;
	}

  const init = async () => {
    const file = await findCtaPath(urlForImage);
    setImgPath(file.data?.attributes?.uri?.url)
   
  };
    useEffect(()=>{
        init()
    })

    return (
        <section className={Styles.colTwoImage}>
            <div className="container">
                <div className={Styles.row}>
                    <div className={Styles.colTwo}>
                        <div className={Styles.content}>
                            <h2>{title}</h2>
                            <div class={Styles.content} dangerouslySetInnerHTML={{ __html: blurb }}/>
                        </div>
                    </div>
                    <div className={Styles.colTwo}>
                        <div className={Styles.imageWrap}>
                           <Image src={imgPath}  width={100} height={100} quality={75} alt="nubu_page"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
