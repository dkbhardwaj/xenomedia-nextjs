import {React,useState, useEffect,} from 'react'
import Image from 'next/image';
import Styles from '../../styles/imageGallery.module.scss';
import Aos from 'aos';
import 'aos/dist/aos.css';

function ImageGallery(props) {
    const sectionData = props.data
    const imgData = sectionData?.relationships?.field_image_column?.links?.related?.href
    const [memberData, setMemberData] = useState([]);


    //fetching image path
	async function findImagePath(url) {
		const response = await fetch(url);
		const img = await response.json();
		return img;
	}
	const init = async () => {
		const file = await findImagePath(imgData);
        const idArr = file.data;
		const promises = idArr.map(async (item,index) => {
			let imgId = item.relationships.field_image.data.id;
			let imgUrl ='https://dev-xenomedia-nextjs.pantheonsite.io/en/jsonapi/media/image/' +`${imgId}` +'/thumbnail';
			const path = await findImagePath(imgUrl);

            const imgPath = {
                "path": path.data.attributes.uri.url,
                "name":idArr[index].attributes?.field_title,
                "designation":idArr[index].attributes?.field_subtitle
            };
			return imgPath;
		});
        const images = await Promise.all(promises);
		//pushing image path into pathArr
		setMemberData((current) => [...current, images]);
	};

    useEffect(() => {
        init();
        
	}, []);
    return (
        <section className={Styles.image_gallery}>
            <div className="container">
                <div className={Styles.intro}>
                    <h2>{sectionData.attributes?.field_title }</h2>
                </div>
                <div className={Styles.row}>
                    {memberData[0]?.map((item, index) => {
                        return (
                            <div className={Styles.card_wrap} key={index}>
                                <div className={Styles.card}>
                                    <div className={Styles.img_wrap}>
                                        <Image
                                            layout='fill'
                                            objectFit='cover'
                                            //    loader={myLoader}
                                            src={item.path}
                                            alt="team"
                                            // width={300}
                                            // height={300}
                                            // quality={50}
                                            priority
                                            unoptimization='false'
                                        />
                                    </div>
                                    <div className={Styles.text_wrap}>
                                        <h5 className={Styles.member_name}>{ item.name}</h5>
                                        <p className={Styles.designation}> { item.designation}</p>
                                    </div>
                                 </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ImageGallery
