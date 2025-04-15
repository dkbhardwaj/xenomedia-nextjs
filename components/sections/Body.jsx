import React from 'react'
import DOMPurify from 'isomorphic-dompurify';
import Styles from '../../styles/blogDetail.module.scss';

export default function Body({data}) {
    
    const WHITELISTED_TAGS = ['ul', 'h1', 'h2', 'h3', 'h4', 'h5', 'p', 'a', 'h6', 'img', 'b','i','u','strong', 'ol', 'li', 'div', 'form', 'input', 'label', 'select', 'option', 'button','tr','td','th','thead','tfoot','table','tbody','span','blockquote','q','figure','figcaption','hr','code','picture','video','textarea','canvas','caption','aside','audio','sub','sup','s','hr','style','font',]
	DOMPurify.setConfig({
		IN_PLACE: true,
		ALLOWED_TAGS: WHITELISTED_TAGS, 
		ADD_ATTR: ['target'] 
	})

   const body = data.attributes?.field_blurb?.processed

  return (
    <section className='body'>
        <div className="container">
            <div
		  		dangerouslySetInnerHTML={{
				 __html: DOMPurify.sanitize(body),
				}}
				className={`body_text ${Styles.body_text}`}
			/>
        </div>
      
    </section>
  )
}
