import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {Provider, UpdownButton} from '@lyket/react';


function Comment ({data, id, user, setComments}){

    console.log(user)

    function handleDelete(event){

        console.log(data.id)
        fetch(`/del_patch_post_get_comment/${data.id}`, {
          method: 'DELETE',
          headers: {'Content-Type':'application/json'}
        })
          .then(resp => resp.json())
          setComments(prev => prev.filter(item => {
            return(item.id !== data.id)
          }))
      }

    return(
        <>
            <div className='comment-bubble' key={data.id}>
                        <div>{data.comment}</div>
                        <div>
                          <h5>{data.user !== null ? data.user.username: "Unregistered  User"}</h5>
                          <div className='updown-button-container'>
                            <Provider
                              apiKey='pt_06995f6822f19f436ad8c3101f32d2'
                              theme={{
                                colors: {
                                  background: "#b8fff3",
                                  text: "violet",
                                  primary: "rgba(255, 224, 138, 0.4)"
                                }
                              }} >
                              <UpdownButton/>
                            </Provider>
                          </div>
                          { data.user_id == user.id ? <Button className='delete-button' onClick={handleDelete}>
                            Delete
                          </Button> : null}
                        </div>
                      </div>
        </>
    )
}

export default Comment;

