import React, {useState, ChangeEvent, useEffect} from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Product, updateProduct } from '../../interface/Product';
import { Shop } from '../../interface/Shop';
import { createProduct, patchProduct } from '../../redux/feature/shopSlice';
import { useAppDispatch } from '../../redux/hooks';

const AddEditPage = ({shop, products}: {shop: Shop, products: Product[]}) => {
    const initObject = {
        brand: shop.brand,
        title: "",
        description: "",
        price: 0,
        image: [] as string[],
        video: "",
        amount: 0,
        type: [] as string[]
    }
    const id = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [len, setLen] = useState("");
    const [formValue, setFormValue] = useState(initObject)
    const {title, description, price, image, video, amount, type} = formValue;

    useEffect(() => {
        if(id['*'] !== ""){
            const value: Product | undefined = products.find((c: Product) => c._id===id['*']);

            if(value){
                setFormValue({
                    brand: value?.brand,
                    title: value?.title,
                    description: value?.description,
                    price: value?.price.cost,
                    image: value?.review.image!,
                    video: value?.review?.url!, 
                    amount: value.amount.total,
                    type: value.typeProduct
                })  
            }
            setLen("Update");
        }
        else {
            setLen("Post");
        }
    }, [id])

    const handleChange = (
    e: ChangeEvent<{ value: string, name: string }>
    ) => setFormValue({...formValue, [e.currentTarget.name]: e.currentTarget.value}); 

    return (
        <div>
            <div style={{width: "63rem"}} className='post'>
                <Card className='load' style={{margin: "0rem", height: "50rem"}}>
                    <Card.Header style={{backgroundColor: "black", color: "white", fontWeight: "bold"}}>
                    {"Post Product"} 
                    </Card.Header>
                    <Card.Body style={{height: "26rem"}}>
                    <Form.Group style={{width: "40rem", margin: "0"}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Title
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control onChange={handleChange} name='title' value={title} type="text" placeholder="Title" />
                        </Col>
                    </Form.Group>
                    <Form.Group style={{width: "40rem", margin: "0", marginTop: "-15rem"}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Description
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control onChange={handleChange} name='description' value={description} type="text" placeholder="Description" />
                        </Col>
                    </Form.Group>
                    <Form.Group style={{width: "40rem", margin: "0", marginTop: "-15rem"}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Price
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control onChange={handleChange} name='price' value={price} type="number" placeholder="Price" />
                        </Col>
                    </Form.Group>
                    <Form.Group style={{width: "40rem", margin: "0", marginTop: "-15rem"}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Image
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control value={image} onChange={(e) => setFormValue({...formValue, image: e.target.value.split(",")})} type="text" placeholder="Image" />
                        </Col>
                    </Form.Group>
                    <Form.Group style={{width: "40rem", margin: "0", marginTop: "-15rem"}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Video
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control onChange={handleChange} name='video' value={video} type="text" placeholder="Video"/>
                        </Col>
                    </Form.Group>
                    <Form.Group style={{width: "40rem", margin: "0", marginTop: "-15rem"}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Amount
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control onChange={handleChange} name='amount' value={amount} type="number" placeholder="Amount" />
                        </Col>
                    </Form.Group>
                    <Form.Group style={{width: "40rem", margin: "0", marginTop: "-15rem"}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Type
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control value={type} onChange={(e) => setFormValue({...formValue, type: e.target.value.split(",")})} type="text" placeholder="Type" />
                        </Col>
                    </Form.Group>
                    </Card.Body>    
                    <Button onClick={() => {
                        if(id['*'] !== ""){
                            const formValue1: updateProduct = {
                                title: formValue.title,
                                description: formValue.description,
                                review: {
                                    image: formValue.image,
                                    url: formValue.video
                                },
                                price: formValue.price,
                                amount: formValue.amount,
                                type: formValue.type  
                            }
                            dispatch(patchProduct({id: id['*']!, formValue1}));
                        }
                        else {
                            const formValue1 = {
                                brand: formValue.brand,
                                title: formValue.title,
                                description: formValue.description,
                                review: {
                                    image: formValue.image,
                                    url: formValue.video
                                },
                                price: formValue.price,
                                amount: formValue.amount,
                                type: formValue.type
                            }
                            dispatch(createProduct(formValue1));
                        }
                        setFormValue(initObject)
                        navigate('/account/dashboard')
                    }} variant='warning' style={{position: "absolute", top: "3.5rem", right: "3rem", width: "8rem"}}>{len}</Button>
                </Card>
            </div>
        </div>
    )
}

export default AddEditPage