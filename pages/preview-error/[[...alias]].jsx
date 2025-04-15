import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

import {
	getCurrentLocaleStore,
	globalDrupalStateStores,
} from '../../lib/stores';

export default function PreviewError({ footerMenu, preview }) {
	const {
		query: { error, message},
	} = useRouter();
	return (
		<Layout footerMenu={footerMenu} preview={true}>
			<div className="container">
			<div className="error-wrap flex flex-col mx-auto prose-xl mt-20 w-1/2">
				<h2 className="text-center">
					🛑 {error ? error : 'There was an error on the server'} 🛑
				</h2>
				<p className="text-center">{message}</p>
				<Link href="/" className="underline">
					Go Home
				</Link>
			</div>
			<style jsx>
				{`
				.error-wrap{
					margin-top: 60px;
					margin-bottom: 60px;
				}
				`}
			</style>
			</div>
			
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { locale } = context;
	const lang = context.preview ? context.previewData.previewLang : locale;
	const store = getCurrentLocaleStore(lang, globalDrupalStateStores);

	const footerMenu = await store.getObject({
		objectName: 'menu_items--main',
		refresh: true,
		res: context.res,
		anon: true,
	});

	return {
		props: {
			footerMenu,
		},
	};
}
