import React from 'react';
import Styles from '../../styles/blogDetail.module.scss';
import StylesTwo from '../../styles/contentWithList.module.scss';

export default function ServiceThreeCards() {
    return (
        <section
            className={`${Styles.content} ${Styles.body_content} ${StylesTwo.content_with_list} ${StylesTwo.service_three_cards} padding-top-xs`}
        >
            <div className="container">
                <div
                    className={`${StylesTwo.specs} ${StylesTwo.col_left} padding-bottom-m `}
                >
                    <div className={StylesTwo.heading_wrap}>
                        <div className={StylesTwo.heading}>
                            <h3 className={StylesTwo.bg_white_arrow}>Our Process</h3>
                        </div>
                    </div>
                    <div className={StylesTwo.col_two}>
                        <div className={StylesTwo.card}>
                            <div className={StylesTwo.title}>
                                <h3>Collect Data</h3>
                            </div>
                            <div className={StylesTwo.text}>
                                <p>
                                    We analyze your key pages and those of your competitors to find points of friction &minus; elements that are making it less likely that your visitors will convert to customers.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={StylesTwo.col_two}>
                        <div className={StylesTwo.card}>
                            <div className={StylesTwo.title}>
                                <h3>Experiment</h3>
                            </div>
                            <div className={StylesTwo.text}>
                                <p>
                                    From the data we collected&#44; we&#39;ll create multivariate experiments &minus; changes to the page that we expect will improve the rate at which visitors become customers. A percentage of your traffic will see a variant&#44; and we&#39;ll be closely tracking the results.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={StylesTwo.col_two}>
                        <div className={StylesTwo.card}>
                            <div className={StylesTwo.title}>
                                <h3>Optimize</h3>
                            </div>
                            <div className={StylesTwo.text}>
                                <p>We&#39;ll pick the variant that had the greatest success&#44; and then collect more data to start the process anew - until your page is performing at it&#39;s very best!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
