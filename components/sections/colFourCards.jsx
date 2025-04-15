import {React,useState, useEffect,}  from 'react'
import { useInView } from 'react-intersection-observer';
import Styles from '../../styles/colFourCards.module.scss';
import Image from 'next/image';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';


export default function ColFourCards(props) {
    const sectionData = props.data
  
    const imgData = sectionData?.relationships?.field_team_items?.links?.related?.href
    const [memberData, setMemberData] = useState([]);

     //fetching image path
	async function fetchData(url) {
		const response = await fetch(url);
		const img = await response.json();
		return img;
	}
	const init = async () => {
		const file = await fetchData(imgData);
        const CardsData = file.data;
        
		const promises = CardsData.map(async (item,index) => {
			let imgId = item.relationships?.field_image?.data?.id;
			let imgUrl ='https://dev-xenomedia-nextjs.pantheonsite.io/en/jsonapi/media/image/' +`${imgId}` +'/thumbnail';
			const path = await fetchData(imgUrl);
            const imgPath = {
                "imagePath": path?.data?.attributes?.uri?.url,
                "imageAlt": path?.data?.attributes?.filename,
                "name":CardsData[index].attributes?.field_title,
                "designation":CardsData[index].attributes?.field_subtitle
            };
			return imgPath;
		});
        const cards = await Promise.all(promises);
		setMemberData((current) => [...current, cards]);
	};

    useEffect(() => {
        init();
        
	}, []);
   

    const { ref: magicSectionRef, inView: magicSectionIsVisible } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});
  return (
    <section className={`ColFourCards ${Styles.Col_Four_cards}`}>
        <div className="container">
            <div className={Styles.row}>
               
            {memberData[0]?.map((item, index) => {
                 return (
                    <div key={`${item.imageAlt}_${index}`} className={Styles.card_wrap}>
                        <div className={Styles.img_wrap}>
                            <Image
                                src={item?.imagePath}
                                alt={item.imageAlt}
                                width={200}
                                height={300}
                                quality={100}
                            />
                        </div>
                        <div className={Styles.text_wrap}>
                            <h5 className={Styles.heading} > {item?.name}</h5>
                            {item?.designation && (<p className={Styles.blurb}> {item?.designation}</p>)}  
                        </div>
                    </div>
                    
                 )
            })}
          </div>
          {(sectionData?.attributes?.field_cta !== null && memberData.length !=0 )?
          <div className={Styles.btn_wrap}>
						 <Link href={sectionData?.attributes?.field_cta?.uri.replace('internal:', '')} className="right_arrow_btn">
							{sectionData?.attributes?.field_cta?.title}
						</Link>
						
					</div>
                    : ''}
        </div>
    </section>
  )
}
