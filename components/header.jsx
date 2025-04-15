import React, { useState, useEffect, useRef } from 'react';
import Styles from '../styles/header.module.scss';
import Link from 'next/link';
import $ from 'jquery'
import Image from 'next/image';

export default function Header(props) {
	const [selected, setselected] = useState(0);
	const [scroll, setScroll] = useState(false);
	const [isHovered, setIsHovered] = useState(99);
	const [menuItems, setMenuItems] = useState();
	const menuRef = useRef();
	const dropLink = useRef();
	const buttonRef = useRef();
	useEffect(() => {
		window.scrollTo(0, 0);
		const handleRefresh = () => {
			window.scrollTo(0, 0);
		};
		window.addEventListener('beforeunload', handleRefresh);
		const sidenav = document.getElementById('sidebar');
		sidenav.style.display = 'block';
		window.addEventListener('scroll', () => {
			if (window.scrollY > 10) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		});

		function handleClick(event) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target)
			) {
				menuRef.current.classList.remove(Styles.show);
				let allsubList = dropLink.current.querySelectorAll(".parentList")
				allsubList.forEach(element => {
					element.classList.remove(Styles.active)
				});
			}
		}
		document.addEventListener('click', handleClick);
		return () => {
			window.removeEventListener('beforeunload', handleRefresh);
			document.removeEventListener('click', handleClick);
		};
	}, []);

	function toggleMenu() {
		menuRef.current.classList.toggle(Styles.show);
	}
	function hideNav() {
		menuRef.current.classList.remove(Styles.show);
		let allsubList = dropLink.current.querySelectorAll(".parentList")
		allsubList.forEach(element => {
			element.classList.remove(Styles.active)
		});
	}






	const handleMouseEnter = (index) => {
		
		setIsHovered(index);
	};

	const handleMouseLeave = () => {

		setIsHovered(100);
	};

	function toggleDropdown(e,index) {
		let list = e.target
		if(list.classList.contains(Styles.active)){
			list.classList.remove(Styles.active)
		}else{
			let allsubList = dropLink.current.querySelectorAll(".parentList")
			allsubList.forEach(element => {
				element.classList.remove(Styles.active)
			});
			setTimeout(() => {
				list.classList.add(Styles.active)
			}, 300);
			
		}
		if (window.innerWidth > 991) {
			hideNav();
		}
	}
//   var forSubMenu
	var menuItemsHtml = (props?.navItems)?.map((item, index) => {
		if (item.parent == "") {
			var temp 
			if (item.expanded == true) {
				
				return (
					<li key={index}  className={`${isHovered == index ? `${Styles.sub} ${Styles.active}` : Styles.sub} parentList`} onMouseLeave={()=>handleMouseLeave(index)} onClick={(e)=>toggleDropdown(e, index)}>
						<Link href={item.url} prefetch={false} onMouseEnter={()=>handleMouseEnter(index)} >
							{item.title}
							<div className={Styles.arrow_icon}></div>
						</Link>
						{item.expanded == false ? '' : (<div className={Styles.sub_menu}><ul>{setSubMenu(item)}</ul></div>)}
					</li>
				)
			} else {
				return (
					<li key={index}>
						<Link  href={item.url} prefetch={false} onClick={hideNav} >
							{item.title}
						</Link>
					</li>
				)
			}
			
		}
	})
	
  //setSubmenu
	function setSubMenu(element) {
		var temp = props.navItems.map((itm, indx) => {
			
			if (itm.parent == element.id) {
				return (
					<li key={indx} className={Styles.mobile}>
						<Link href={itm.url} className={Styles.mobile} prefetch={false} onClick={hideNav}>{itm.title}</Link>
					</li>
				)
			}
		})

		return temp
	}

	return (
		<header
			className={
				scroll === true ? `${Styles.header} ${Styles.scrolling}` : Styles.header
			}
		>
			<div className="container">
				<div className={Styles.main_row}>
					<div className={Styles.logo_wrap}>
						<Link href="/" className="empty_link">
							.
						</Link>
						<Image src="/xeno_logo.png" alt="logo" width={300} height={100} quality={100}/>
					</div>
					<div
						ref={buttonRef}
						onClick={toggleMenu}
						className={Styles.hamburger}
					>
						<span className={Styles.cheese_line}></span>
					</div>
				</div>
				<div
					ref={menuRef}
					id="sidebar"
					className={
						selected === 1 ? `${Styles.sidebar} ${Styles.show}` : Styles.sidebar
					}
				>
					<div className={Styles.content}>
						<div className={Styles.cross} onClick={hideNav}>
							<span></span>
						</div>
						<ul ref={dropLink} className={Styles.menu}>
							{menuItemsHtml}
							
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
}
