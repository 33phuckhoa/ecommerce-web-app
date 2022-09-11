/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Product } from '../../interface/Product';

interface props {
    product: Product
}

const Detail = ({product}: props) => {
    const [review, setReview] = useState<string>("");
    const [pro, setPro] = useState<Product>();
    const [amount, setAmount] = useState<number>(1);  

    useEffect(() => {
        if(product){
          setPro(product);
          setReview(pro?.review?.image[0]!);
        }
      }, [product]);  
    return (
        <div className='detail'>
            {pro ? (
            <>
                <div className='cover' onClick={() => setReview(pro.review.url)}></div> 
                <div className='review'>
                <iframe name='review' title='' height="500" width="500" src={review}/>
                <div style={{display: "flex"}}>
                    <iframe 
                    style={{marginRight: "1rem"}}
                    src={pro.review.url} 
                    height="80" 
                    width="100" 
                    title="description"
                    ></iframe> 
                    {pro?.review?.image?.map((img: string) => (
                    <img 
                        style={{marginRight: "1rem"}}   
                        className='img1' 
                        alt='' 
                        src={img}
                        onClick={() => setReview(img)}
                    />
                    ))}
                </div>
                </div>
                <Card className='infor' >
                    <Card.Body>
                        <Card.Title style={{color: "black", fontSize: "23px"}}>{product['title']}</Card.Title>
                        <Card.Title className='price'>
                        {pro.price.cost > pro.price.discountPrice!&&
                            <span style={{color: "black", textDecoration: "line-through"}}>{`${product['price']['cost']}.000vnd`}</span>
                        }
                            {` ${product['price']['discountPrice']}.000vnd`}
                        {pro.sale && <span className='sale1'>{`${pro.sale}%`}</span>}
                        </Card.Title>
                        <Card.Text style={{marginTop: "1rem"}}><span style={{color: "red", fontSize: "2rem"}}>Description:  </span>{product['description']}</Card.Text>
                        <div>
                        <span  style={{color: "red", fontSize: "1.4rem"}}>Amount: </span>
                        <input 
                            value={amount}
                            style={{width: "4rem"}} 
                            type='number' 
                            min='1' 
                            max={product['amount']['total']} 
                        />
                        </div>
                        <div style={{display: "flex", marginTop: "2rem"}}>
                        <Button style={{width: "10rem", border: "0.5px solid orange", marginRight: "1rem"}} variant="light">Add to Cart</Button>
                        <Button style={{width: "10rem"}} variant="warning">Buy</Button>
                        </div>
                    </Card.Body>
                </Card>
            </>
            ): null}
            
        </div>
    )
}

export default Detail