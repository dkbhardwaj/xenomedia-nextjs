import Link from 'next/link';

export default function Custom500() {
	// Possible TODO: display error from the global store if one exists
	return (
		<div className='container'>
		<div className="flex flex-col mx-auto prose-xl mt-20 w-fit">
			<h2 className="text-center">🛑 There was an error on the server.<br/>The page is not present  🛑</h2>
			<Link href="/" className="underline">
					<h2 className='home'>Go Home</h2>
			</Link>
			</div>
			<style jsx>{`
			.flex{
				text-align:center;
			}
			 .home {
				margin-top: 50px;
				display:inline-block;
				
				color:#95d141;
			}
      `}</style>
		</div>
	);
}
