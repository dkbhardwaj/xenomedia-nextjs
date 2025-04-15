import React from 'react'
import { useRouter } from 'next/router';
import BlogItem from '../sections/blogs';
import Styles from '../../styles/blogFilter.module.scss';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function latestBlogs({data}) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { locale } = router;
    const sortedAsc = data.sort((a, b) => new Date(b.created) - new Date(a.created));
    var latestThreeBlogs =  sortedAsc.slice(0,3)
    
  return (
    <section  className={Styles.blog_filter}>
		<div className="container">
            <div className={Styles.title}>
             <h1>Latest Blogs</h1>
            </div>
            <div className="wrapper">
                {
                   latestThreeBlogs && latestThreeBlogs.map((card, index) => {
                        return (
                            <BlogItem
                                data={card}
                                contentType="blogs"
                                locale={locale}
                                key={index}
                            />
                        );
                    })
                }

            </div>
      </div>
    </section>
  )
}
