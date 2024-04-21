import React from 'react'
import ClassComponent from './ClassComponent'


const Comment = (props) => {
    const { discussionId } = props;
    console.log("discussionId in comment", discussionId);
  return (
    <div className='example-div'>
      {/* <div className='head-title'>Demo Examples</div> */}
      {/* <hr style={{ borderTop: '1px solid', width: '100%' }} /> */}
      <div className='example-row'>
        {/* <DefaultComponent /> */}
        <ClassComponent discussionId={discussionId}/>
      </div>
      <div className='example-row'>
        {/* <CustomComponent /> */}
        {/* <LogInComponent /> */}
      </div>
      <div className='example-row'>
        {/* <AdvancedComponent /> */}
      </div>
    </div>
  )
}

export default Comment;