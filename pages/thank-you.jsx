import Layout from '../components/layout';
import Link from 'next/link';
import React, { useState } from 'react';

export default function ThankYou() {
  const [menudata, setmenudata] = useState(null);

  return (
    <Layout headerMenu={menudata}>
      <section style={{ minHeight: '100px', backgroundColor: '#95d141' }}>
      </section>
      <section style={{ display: 'flex', height: 'calc(100vh - 401px)', alignItems: 'center' }}>
        <div className="container">
          <div className="prose text-center">
            <h2 style={{ margin: '0 0 20px', color: '#575757' }}>Thank You!</h2>
            <p style={{ color: '#575757', margin: '0 auto 20px', maxWidth: '600px' }}>
              Your message has been received. We appreciate you reaching out and will get back to you as soon as possible.<br />
              Return to the <Link href="/" style={{ color: '#349fb6', fontWeight: '500', fontSize: '16px' }}>Homepage</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
