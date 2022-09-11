import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { User } from '../../interface/Auth';
import { Avaluate, Product } from '../../interface/Product';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const Review = ({users, product}: {users: User[], product: Product}) => {
  const [reviewUser, setReviewUser] = useState<Avaluate[]>([]);

  useEffect(() => {
    if(product){
      setReviewUser(product['avaluate']);
    }
  }, [product])

  return (
    <div className='avaluates'>
      {reviewUser.map((r: Avaluate) => {
        for(let i = 0; i < users.length; i++){
          if(users[i]._id===r.userId){
            return (
              <div>
                 <Card className='cat'>
                    <Card.Header style={{display: "flex",backgroundColor: "black", color: "white", fontWeight: "bold"}}>
                    {[1, 2, 3, 4, 5].map((c: number) => {
                            if(r.starAvaluate===1){
                              if(c===1){
                                return(
                                  <div className='star'
                                  >
                                    <StarIcon/>
                                  </div>
                                )
                              }
                            }
                            else if(r.starAvaluate===2){
                              if(c===1||c===2){
                                return (
                                  <div className='star'
                                  >
                                    <StarIcon/>
                                  </div>
                                )
                              }
                            }
                            else if(r.starAvaluate===3){
                              if(c===1||c===2||c===3){
                                return (
                                  <div className='star'
                                  >
                                    <StarIcon/>
                                  </div>
                                )
                              }
                            }
                            else if(r.starAvaluate===4){
                              if(c===1||c===2||c===3||c===4){
                                return (
                                  <div className='star'
                                  >
                                    <StarIcon/>
                                  </div>
                                )
                              }
                            }
                            else if(r.starAvaluate===5){
                              return (
                                <div className='star'
                                >
                                  <StarIcon/>
                                </div>
                              )
                            }
                            return(
                              <div className='star'
                              >
                                <StarOutlineIcon/>
                              </div>
                            )
                          })}
                    </Card.Header>
                    <Card.Body className='as' style={{display: "flex"}}>
                      <img style={{width: "3rem", height: "3rem", borderRadius: "50%"}} alt='' src={users[i].avatar}/>
                      <Form.Control
                        type="text"
                        placeholder={r.contentComment}
                        aria-label="Disabled input example"
                        disabled
                        readOnly
                      />
                    </Card.Body>
                  </Card>
              </div>
            )
          }
        }
      })}
    </div>
  )
}

export default Review