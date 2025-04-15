import React,{useEffect} from 'react'
import Image from 'next/image'
import Styles from '../styles/serviceCards.module.scss'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify';
import Aos from 'aos';




export default function ServiceCards(props) {
    const serviceData = props?.data;
    const multiLanguage = props.lang
    useEffect(() => {
		Aos.init({ offset: 300, duration: 2000, once: true });
	}, []);
    return (

        <section  data-aos="fade-up" className={Styles.col_three_cards}>
            <div className="container">
                <h2>browse our services and see how we can help you</h2>
                <div className="wrapper">
                    {
                        serviceData?.map((post, i) => {
                            const blurb = DOMPurify.sanitize(
                                post.description.processed,
                                { ALLOWED_TAGS: [] },
                            )
                            return (
                                <div className={Styles.col_three} key={i}>
                                    <Link className="empty_link" passHref href={`${multiLanguage ? `/${post?.path.langcode || locale}` : ''}${post?.path?.alias}`}>
                                                {' '}
                                                .{' '}
                                            </Link>
                                    <div className={Styles.img_wrap}>
                                        <Image src={post.field_icon_image.thumbnail.uri.url} alt='image' width={100} height={100} quality={75} />
                                    </div>
                                    <div className={Styles.content_wrap}>
                                        <h5>{post.name}</h5>
                                        <p dangerouslySetInnerHTML={{ __html: blurb }} />
                                    </div>
                                </div>
                            );
                        })
                    }
                    {/* {serviceCards} */}
                </div>
            </div>
        </section>

    )
}
