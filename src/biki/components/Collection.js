import React, {useState, useRef, useEffect} from 'react'
import '../css/home.scss'
import { FiShoppingBag, FiHeart, FiStar } from "react-icons/fi";
import {Col, Container} from 'react-bootstrap'
import {Parallax, Background } from 'react-parallax'

function Collection(props){

    const [imgHeight, setimgHeight] = useState(0)
    const imgRef = useRef(null)

    useEffect(()=>{
        const height = imgRef;
        setimgHeight(height)
        console.log(imgRef.current.clientHeight)
    },[])


    return(
    <>
        <div className={
            props.theme === 'white' ? "bk-collection mt-5 " + props.theme : "bk-collection " + props.theme
        }>
            <div className="bottom">
                <Parallax strength={400} bgImage={props.bg} style={{height: '100%'}}>
                </Parallax>
            </div>
            
            <Parallax 
            style={{height: '100%'}}
            strength={200}
            bgImage={' '}
            renderLayer={percentage=>{
                return(
                    <Container style={{height: '100%'}}>

                        <div className='bk-collection-content'>
                            <div className="collection-titles" 
                            style={{transform: `translateY(${percentage*100}%)`}}
                            >
                                <h1>{props.title}</h1>
                                <h4>{props.titleCn}</h4>
                            </div>
                            <div className="content-bottom"
                            style={{transform: `translateY(-${percentage*100}%)`}}
                            >
                                <div className="collection-info">
                                    {props.info}
                                </div>
                                <div className="collection-button">
                                    <button>瀏覽更多</button>
                                </div>
                            </div>
                            <div className="collection-img"
                            style={{
                                top: '70%',
                                marginTop: `-${imgHeight/2}px`,
                                transform: `translate(-50%, -${percentage*160}%)`
                            }}
                            >
                                <img src={props.img} ref={imgRef} />
                            </div>
                        </div>
                    </Container>
                )
            }}
            >
            </Parallax>
        </div>
    </>
    )
}

export default Collection