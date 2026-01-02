import React, { useState, useEffect } from 'react';
import Styles from '../../styles/pricing.module.scss';

export default function Pricing({ data }) {
    const [items, setItems] = useState([]);
    const itemUrl = data.relationships?.field_add_price?.links?.related?.href;

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error("Error fetching pricing data:", error);
            return null;
        }
    };

    const init = async () => {
        if (!itemUrl) return;
        const result = await fetchData(itemUrl);
        setItems(result?.data || []);
    };

    useEffect(() => {
        init();
    }, [itemUrl]);

    return (
        <section className={Styles.pricing}>
            <div className="container">
                <div className={Styles.intro}>
                    {data.attributes?.field_title && <h2>{data.attributes.field_title}</h2>}
                    {data.attributes?.field_blurb?.processed && (
                        <div
                            className={Styles.blurb}
                            dangerouslySetInnerHTML={{ __html: data.attributes.field_blurb.processed }}
                        />
                    )}
                </div>

                <div className={Styles.grid}>
                    {items.map((item, index) => (
                        <div key={index} className={Styles.card}>
                            {item.attributes?.field_blurb?.processed && (
                                <div
                                    dangerouslySetInnerHTML={{ __html: item.attributes.field_blurb.processed }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
