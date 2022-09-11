import React from 'react';
import Slider from 'react-slick';

const marketing = [
    "https://img.pikbest.com/png-images/flash-sale-banner-promotion-template-design-vector-graphic-element_1508800.png!bw700",
    "https://media.istockphoto.com/vectors/bundle-offer-special-offer-flash-sale-banner-design-vector-id1174933158",
    "https://previews.123rf.com/images/igorvkv/igorvkv1804/igorvkv180400038/99074520-flash-sale-banner-template-design.jpg",
    "https://previews.123rf.com/images/igorvkv/igorvkv1609/igorvkv160900428/63017398-flash-sale-banner-template-design.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3lPSJzYi48C4T99dxQ6dP8zPkV5qUA5Y10A&usqp=CAU",
    "https://previews.123rf.com/images/lumyaisweet/lumyaisweet1907/lumyaisweet190700093/128050611-flash-sale-banner-template-design-vector-illustration.jpg"
]

const ProductSlice = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    return (
        <Slider className='slider' {...settings}>
            {marketing.map((mar => (
                <img alt='' className='img' src={mar}/>
            )))}
        </Slider>
    )
}

export default ProductSlice