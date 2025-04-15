import { Footer, Header, PreviewRibbon } from '@pantheon-systems/nextjs-kit';
import Navbar from "./header.jsx";
import Foot from './footer.jsx'
export default function Layout({ children, footerMenu,headerMenu, preview = false }) {
	// const navItems = [
	// 	{ linkText: '🏠 Home', href: '/' },
	// 	{ linkText: '📰 Articles', href: '/articles' },
	// 	{ linkText: '📑 Pages', href: '/pages' },
	// 	{ linkText: '⚛️ Examples', href: '/examples' },
	// ];
	const footerMenuItems = footerMenu?.map(({ title, url, parent }) => ({
		linkText: title,
		href: url,
		parent: parent,
	}));
	return (
		<div className="min-h-screen max-h-screen min-w-screen max-w-screen flex flex-col overflow-x-hidden">
			<div className='preview-ribbon relative mt-[300px]'>
				<div className="container">
				{preview && <PreviewRibbon />}
				</div>
			</div>
			{/* <Header navItems={navItems} /> */}
			<Navbar navItems={ headerMenu} />
			<main className="mb-auto">{children}</main>
			<Foot/>
		</div>
	);
}
