// import React,{ useState, useEffect } from 'react';
import { useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import BlogItem from './sections/blogs';
import Styles from '../styles/blogFilter.module.scss';  
import { IMAGES_MANIFEST } from 'next/dist/shared/lib/constants';

export default function PortfolioBlogs(props) {
    const { locale } = useRouter();
    const projects = props.projects
   projects.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
   });
    const multiLanguage = props.lang;
    const hrefLang = props.hrefLang;
    const [cd, setCd] = useState(projects);
    const [sectors, setSectors] = useState([]);
    const [plarformType, setPlarformType] = useState([]);
    const [listState, setListState] = useState(0);
    const [typeState, setTypeState] = useState(0);
    const [selectedSector, setSelectedSector] = useState([]);
    const [platformTypeArr, setPlaformTypeArr] = useState([]);
    const [category, setCategory] = useState([]);
    const [forPlatform, setForPlatform] = useState(cd);
    
   //checkbox filters
    // get sector categories
    function printSectors(data) {
        data.map((one) => {
		if (one.hasOwnProperty('field_sector')) {
            if (one.field_sector.length != 0) {
                 getSectors(one.field_sector)
			}
		} else {
			console.log('ns');
		}
     })
    }
    printSectors(cd);
    function getSectors(sectorval) {
        sectorval.map(sec => {
             let type = sec.name;
            if (sectors.indexOf(type) === -1) {
                setSectors([...sectors, type]);
				}
        }

        )
    }
    
    
//setPlarformType
    function printPlatform(data) {
        data.map((one) => {
		if (one.hasOwnProperty('field_project_type')) {
            if (one.field_project_type.length != 0) {
                getPlatform(one.field_project_type)
			}
		} else {
			console.log('ns');
		}
     })
    }
    function getPlatform(Platformval) {
        Platformval.map(sec => {
            let type = sec.name;
            if (plarformType.indexOf(type) === -1) {
                setPlarformType([...plarformType, type]);
            }
        })
    }
    printPlatform(cd);

    useEffect(() => {
        printPlatform(cd);
    },[selectedSector])

   
  

    //pagination
    
	const [selected, setselected] = useState(0);
	const [pgValue, setPgValue] = useState(1);
	const [rows, setRows] = useState(12);
	let arr = [];

	let pageBtn;
	const trimStart = (pgValue - 1) * rows;
	const trimEnd = trimStart + rows;
	let trimData = cd.slice(trimStart, trimEnd);
    const pages = Math.ceil(cd?.length / rows);

	for (let i = 1; i <= pages; i++) {
		arr.push(i);
	}
	//show page Btn List
	pageBtn = arr && arr.map((item, index) => (
			<li className={selected === index ? 'paginationBtn active_btn' : 'paginationBtn'} onClick={() => clickHandler(item, index)} key={index}>
				{item}
			</li>
		));
	//clickHandler
	function clickHandler(item, index) {
		if (selected === index) {
			setselected(null);
		}
		setselected(index);
		paginationContent(item);
	}
	//paginationContent
	function paginationContent(pgNumber) {
		setPgValue(pgNumber);
    }
    
    const categoryBox = () => {
		if (listState == 0) {
			setListState(1);
		} else {
			setListState(0);
		}
    };
    const projectTypeBox = () => {
		if (typeState == 0) {
			setTypeState(1);
		} else {
			setTypeState(0);
		}
    };
   
    //get value onchange platform types val
    const getVal = (e) => {
		const value = e.target.value;
		const checked = e.target.checked;
		if (checked) {
            setCategory((current) => [...current, value]);
            setSelectedSector((current) => [...current, value])
		} else {
			setCategory((oldValues) => {
				return oldValues.filter((fruit) => fruit !== value);
            });
            setSelectedSector((oldValues) => {
				return oldValues.filter((fruit) => fruit !== value);
			});
		}
    };

    const getPlaformVal = (e) => {
		const value = e.target.value;
		const checked = e.target.checked;
		if (checked) {
            setCategory((current) => [...current, value]);
            setPlaformTypeArr((current) => [...current, value])
		} else {
			setCategory((oldValues) => {
				return oldValues.filter((fruit) => fruit !== value);
            });
            setPlaformTypeArr((oldValues) => {
				return oldValues.filter((fruit) => fruit !== value);
			});
		}
    };

    const haveCategoryName = projects.filter(
        		(one) => one.field_sector.length != 0 && one.field_project_type.length != 0
            )
    //filters

    function filterBySectors(categoryArr) {
        let platforms = []
        let arr = [];
        let sectorsVal = []
        if (categoryArr.length == 0    && platformTypeArr.length == 0) {
            setCd(projects)
            setselected(0)
                setPgValue(1)
        } else {
            
            if (platformTypeArr.length == 0) {
                categoryArr.map((sectorName) => {
                    for (let item of haveCategoryName) {
                        let sector = item.field_sector
                        for (let i = 0; i < sector.length; i++) {
                            if (sector[i].hasOwnProperty('name')) {
                                if (sector[i].name == sectorName) {
                                    arr.push(item)
                                    for (let j = 0; j < item.field_project_type.length; j++) {
                                        if (item.field_project_type[j].hasOwnProperty('name')) {
                                            if (platforms.indexOf(item.field_project_type[j].name) == -1) {
                                                platforms.push(item.field_project_type[j].name)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
                setCd(arr)
                setselected(0)
                setPgValue(1)
                plarformType.map(item => {
                    for (let i = 0; i < platforms.length; i++) {
                        if (item !== platforms[i]) {
                            setPlarformType(plarformType.filter((item) => item == platforms[i]))
                        } else {
                            if (plarformType.indexOf(platforms[i]) == -1) {
                                setPlarformType([...plarformType, platforms[i]])
                            }
                        }
                    }
                })
             } else {
                 let temp = [];
                arr = []
                platformTypeArr?.map(platformName => {
                    for (let item of haveCategoryName) {
                        let platform = item.field_project_type
                        for (let i = 0; i < platform.length; i++) {
                            if (platform[i].hasOwnProperty('name')) {
                                if (platform[i].name == platformName) {
                                    temp.push(item)
                                    for (let j = 0; j < item.field_project_type.length; j++) {
                                        if (item.field_project_type[j].hasOwnProperty('name')) {
                                            if (sectorsVal.indexOf(item.field_project_type[j].name) == -1) {
                                                sectorsVal.push(item.field_project_type[j].name)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
                categoryArr?.map((sectorName) => {
                    for (let item of temp) {
                        let sector = item.field_sector
                        for (let i = 0; i < sector.length; i++) {
                            if (sector[i].hasOwnProperty('name')) {
                                if (sector[i].name == sectorName) {
                                    arr.push(item)
                                    for (let j = 0; j < item.field_project_type.length; j++) {
                                        if (item.field_project_type[j].hasOwnProperty('name')) {
                                            if (platforms.indexOf(item.field_project_type[j].name) == -1) {
                                                platforms.push(item.field_project_type[j].name)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
               
                
                if (categoryArr.length == 0) {
                    setCd(temp)
                } else {
                    setCd(arr)
                }
                setselected(0)
                setPgValue(1)
                // setForPlatform(projects)
            }
            
        }
     
    }
    
    //platform
    function filteringByPlatform(platformArr) {
        let platforms = []
        let arr = [];
        let sectorsVal=[]

        if (platformArr.length == 0 && selectedSector.length ==0) {
            setCd(projects); 
            setselected(0)
                setPgValue(1)
	    } else {
            if (selectedSector.length == 0) {
                platformArr.map(platformName => {
                    for (let item of haveCategoryName) {
                        let platform = item.field_project_type
                        for (let i = 0; i < platform.length; i++) {
                            if (platform[i].hasOwnProperty('name')) {
                                if (platform[i].name == platformName) {
                                    arr.push(item)
                                    for (let j = 0; j < item.field_project_type.length; j++) {
                                        if (item.field_project_type[j].hasOwnProperty('name')) {
                                            if (sectorsVal.indexOf(item.field_project_type[j].name) == -1) {
                                                sectorsVal.push(item.field_project_type[j].name)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
                setCd(arr)
                sectors.map(item => {
                    for (let i = 0; i < sectorsVal.length; i++){
                        if (item !== sectorsVal[i]) {
                            setSectors(sectors.filter((item) => item == sectorsVal[i]))
                        } else {
                            if (sectors.indexOf(sectorsVal[i]) == -1) {
                                setSectors([...plarformType,sectorsVal[i]])
                            }
                        }
                    }
                })
                
            }
            else {
                let temp = []
                arr = []
                selectedSector?.map((sectorName) => {
                    for (let item of haveCategoryName) {
                        let sector = item.field_sector
                        for (let i = 0; i < sector.length; i++) {
                            if (sector[i].hasOwnProperty('name')) {
                                if (sector[i].name == sectorName) {
                                    temp.push(item)
                                    for (let j = 0; j < item.field_project_type.length; j++) {
                                        if (item.field_project_type[j].hasOwnProperty('name')) {
                                            if (platforms.indexOf(item.field_project_type[j].name) == -1) {
                                                platforms.push(item.field_project_type[j].name)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
                platformArr?.map(platformName => {
                    for (let item of temp) {
                        let platform = item.field_project_type
                        for (let i = 0; i < platform.length; i++) {
                            if (platform[i].hasOwnProperty('name')) {
                                if (platform[i].name == platformName) {
                                    arr.push(item)
                                    for (let j = 0; j < item.field_project_type.length; j++) {
                                        if (item.field_project_type[j].hasOwnProperty('name')) {
                                            if (sectorsVal.indexOf(item.field_project_type[j].name) == -1) {
                                                sectorsVal.push(item.field_project_type[j].name)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
                if (platformArr.length == 0) {
                    setCd(temp)
                } else {
                    setCd(arr)
               }
               
                
            }
            setselected(0)
                setPgValue(1)
		}
    }
	
    useEffect(() => {
        filterBySectors(selectedSector);
    }, [selectedSector]);
    
    useEffect(()=>{
        filteringByPlatform(platformTypeArr)
    },[platformTypeArr])
   
    //uncheck category and remove
    const removeCategoty = (val) => {
        var selectedCat = document.querySelectorAll(".filtered_by label input");
        
		selectedCat.forEach((category) => {
			category.value === val ?(category.checked = false):''
		})
		
        setCategory((prev) => {
			return prev.filter((s) => s != val);
        });
        setSelectedSector((prev) => {
			return prev.filter((s) => s != val);
        });
        setPlaformTypeArr((prev) => {
			return prev.filter((s) => s != val);
        });
        
    setPgValue(1);
    setselected(0);
	};

    //outside click
    let categoryref = useRef();
    let Pltfrmref = useRef();
    useEffect(() => {
            function handleClickOutside(event) {
                if (
                    (categoryref.current &&
                    !categoryref.current.contains(event.target) ) 
                ) {
                    // setTypeState(0);
                    setListState(0);
                }
            }
            function handleClickOutsideforPlatform(event) {
                if (
                    (Pltfrmref.current &&
                    !Pltfrmref.current.contains(event.target) ) 
                ) {
                    setTypeState(0)
                }
            }
        
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('click', handleClickOutsideforPlatform);
            return () => {
                document.removeEventListener('click', handleClickOutside);
                document.removeEventListener('click', handleClickOutsideforPlatform);
            };
	},[listState]);

    return (
        <section className={Styles.project_filter}>
            <div className="container">
                <div className={Styles.filter_wrapper}>
                    <div className={Styles.title}>
                        <h6>Filter Projects By:</h6>
                    </div>
                    <div className={Styles.filter_wrap}>
                        <div className={listState == 0 ? ` ${Styles.category_wrap} sector_list` : `${Styles.category_wrap} sector_list ${Styles.active}`} ref={categoryref}>
                            <input
                                type="text"
                                value={selectedSector.length == 0 ? 'Sector' : `${selectedSector.length} Sectors selected`}
                                readOnly
                                className={Styles.selected_val}
                                onClick={() => categoryBox()}
                            />
                            <ul>
                                {sectors.map((cat, index) => {
                                    return (
                                        <li key={index} className="filtered_by" >
                                            <label htmlFor={index}>
                                            <input
                                                type="checkbox"
                                                id={index}
                                                name={cat}
                                                value={cat}
												onChange={getVal}	
                                            />
                                                {cat}
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className={typeState == 0 ? `${Styles.category_wrap} pltform` : `${Styles.category_wrap} pltform ${Styles.active}`} ref={Pltfrmref}>
                            <input
                                type="text"
                                value={ platformTypeArr.length == 0 ? 'Platform' : `${platformTypeArr.length} Platform selected`}
                                placeholder='Platform'
                                readOnly
                                className={Styles.selected_val}
                                onClick={() => projectTypeBox()}
                            />
                            <ul >
                                {plarformType.map((cat, index) => {
                                    return (
                                        <li key={index+1} className="filtered_by">
                                            <label htmlFor={cat.created}>
                                            <input
                                                type="checkbox"
                                                id={cat.created}
                                                name={cat}
                                                value={cat}
												onChange={getPlaformVal}		
                                            />
                                                {cat}
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    
                </div>
                {category.length != 0 ? (
                    <div className={Styles.filters}>
                        <h6>Filtered By :-</h6>
                        {category?.map((c, i) => {
                            return (
                                <p key={i} onClick={() => removeCategoty(c)}>
                                    {c} <span>x</span>
                                </p>
                            );
                        })}
                    </div>
                ) : ""}
                
                <div className="wrapper">
                    {trimData.map((card, index) => {
                        return (
                            <BlogItem
                                data={card}
                                contentType="blogs"
                                multiLanguage={multiLanguage}
                                locale={locale}
                                key={index}
                            />
                        )
                    })
                    }
                </div>

                <div className="pagination" style={{ marginTop: '50px' }}>
                    <ul style={{ display: 'flex', justifyContent: 'center' }}>
                        {pageBtn}
                    </ul>
                </div>
            </div>
            
        </section>
    );
}


//  locale={locale}