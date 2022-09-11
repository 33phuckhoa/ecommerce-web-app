import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Product } from '../../interface/Product';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useAppDispatch } from '../../redux/hooks';
import { avaluatePro } from '../../redux/feature/authSlice';


const Avaluate = ({avaluate, products}: {avaluate: string[], products: Product[]}) => {
  const [star, setStar] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [convert, setConvert] = useState<boolean>(false);
  const [formValue, setFormValue] = useState({
    image: "",
    comment: "",
    star: star
  });

  const {image, comment} = formValue;

  const [scroll, setScroll] = useState({
    check: false,
    pos: ""
  });

  useEffect(() => {
    console.log("HHH")
  }, [convert])

  const {check, pos} = scroll;

  const handleChange = (
    e: ChangeEvent<{ value: string, name: string }>
  ) => setFormValue({...formValue, [e.currentTarget.name]: e.currentTarget.value}); 

  return (
    <div className='a crash'>
      <div className='home'>
        <h1 style={{color: "black"}}>Avaluate</h1>
        <hr style={{width: "56rem", fontWeight: "bold"}}/>
        <div>
          {avaluate.map((a: string) => {
            for(let i = 0; i < products.length; i++){
              if(products[i]._id===a){
                return (
                  <Card className='cat'>
                    <Card.Header style={{backgroundColor: "black", color: "white", fontWeight: "bold"}}>{products[i].title}</Card.Header>
                    <Card.Body className='as' style={{}}>
                      {check&&pos===a&&(
                        <div style={{display: "flex"}}>
                          {[1, 2, 3, 4, 5].map((c: number) => {
                            if(star===1){
                              if(c===1){
                                return(
                                  <div className='star'
                                  onClick={() => setStar(c)}
                                  >
                                    <StarIcon/>
                                  </div>
                                )
                              }
                            }
                            else if(star===2){
                              if(c===1||c===2){
                                return (
                                  <div className='star'
                                  onClick={() => setStar(c)}
                                  >
                                    <StarIcon/>
                                  </div>
                                )
                              }
                            }
                            else if(star===3){
                              if(c===1||c===2||c===3){
                                return (
                                  <div className='star'
                                  onClick={() => setStar(c)}
                                  >
                                    <StarIcon/>
                                  </div>
                                )
                              }
                            }
                            else if(star===4){
                              if(c===1||c===2||c===3||c===4){
                                return (
                                  <div className='star'
                                  onClick={() => setStar(c)}
                                  >
                                    <StarIcon/>
                                  </div>
                                )
                              }
                            }
                            else if(star===5){
                              return (
                                <div className='star'
                                onClick={() => setStar(c)}
                                >
                                  <StarIcon/>
                                </div>
                              )
                            }
                            return(
                              <div className='star'
                                
                                onClick={() => setStar(c)}
                              >
                                <StarOutlineIcon/>
                              </div>
                            )
                          })}
                          <Form style={{marginLeft: "2rem"}}>
                            <Form.Group className="mb-3" style={{width: "30rem"}} controlId="formBasicEmail">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control 
                                type="text" 
                                placeholder="Enter Comment" 
                                value={comment}
                                onChange={handleChange}
                                name='comment'
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Review</Form.Label>
                              <Form.Control 
                                style={{height: "4rem"}} 
                                type="text" 
                                placeholder="Enter review" 
                                value={image}
                                name='image'
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Form>
                        </div>
                      )}
                     <>
                      {convert&&pos===a?(
                        <>
                          <Button
                            style={{width: "6rem", height: "2.6rem", position: "absolute", right: "2rem", top: "1rem"}}
                            onClick={() => {
                              setScroll({check: false, pos: ``});
                              setConvert(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            style={{width: "6rem", height: "2.6rem", position: "absolute", left: "1rem", top: "12.3rem"}}
                            onClick={() => {
                              const formValue1 ={
                                image: formValue.image,
                                comment: formValue.comment,
                                star,
                                idShop: products[i].brand
                              }

                              dispatch(avaluatePro({formValue1, id: `${a}`}));
                            }}
                            variant='danger'
                          >
                            Send
                          </Button>
                        </>
                      ): (
                        <Button
                          style={{width: "6rem", height: "2.6rem", position: "absolute", right: "2rem", top: "1rem"}}
                          onClick={() => {
                            setScroll({check: true, pos: `${a}`});
                            setConvert(true);
                          }}
                        >
                          Avaluate
                        </Button>
                      )}
                     </>

                    </Card.Body>
                  </Card>
                )
              }
            }
            return (
              <div></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Avaluate