import React from 'react'
import { useNavigate } from 'react-router-dom'
import './classBox.scss'

const ClassBox = ({ data }) => {

  const navigate = useNavigate();

  return (
    <>
      <div className='classBox' onClick={() => navigate(`/class/${data._id}`)}>
        <div className='innerBox'>
          <div className='cover'></div>

          <div className='className'> {data.name} </div>
          <section> {data.sem} Semester</section>

        </div>
      </div>
    </>
  )
}

export default ClassBox