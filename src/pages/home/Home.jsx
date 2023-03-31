import React, { useEffect, useState } from 'react'
import ClassBox from '../../components/classBox/ClassBox'
import SideBar from '../../components/sideBar/SideBar'
import './home.scss'
import { Button } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Papa from 'papaparse'
import { useDispatch, useSelector } from 'react-redux'
import { addClass, getClasses } from '../../store/slice/classSlice'

const Home = () => {

    const [state, setState] = useState(false);


    const [classArray, setClassArray] = useState([]);


    const [classData, setClassData] = useState({
        name: "",
        sem: "",
        students: []
    });

    const handleChange = (e) => {
        setClassData({ ...classData, [e.target.name]: e.target.value });
    }


    const handleFile = (e) => {
        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                setClassData({ ...classData, "students": result.data });
            }
        });
    }


    ////////////////////// redux //////////////////////////////
    const { isloading, classes } = useSelector(state => state.classSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getClasses());
    }, []);

    useEffect(() => {
        if (classes) {
            setClassArray(classes);
        }
    }, [classes]);

    const addNewClass = () => {
        dispatch(addClass(classData));
        setState(false);
        setClassData({
            name: "",
            sem: "",
            students: []
        })
    }


    return (
        <>
            <div className='home'>

                {state ? <div className='addClassForm'>
                    <div className='innerClassForm'>
                        <button className='btn' onClick={() => setState(false)}><ClearIcon /></button>
                        <section>Add New Class</section>

                        <div className="form-group">
                            <label>Class Name</label>
                            <input type="text" className="form-control" name='name' placeholder="Enter class name" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Semester</label>
                            <input type="text" className="form-control" name='sem' placeholder="Enter semester" onChange={handleChange} />
                        </div>

                        <div className='fileBox' id={classData.students.length > 0 ? "color" : ""}>
                            <CloudUploadIcon fontSize='large' />
                            <input type="file" accept='.csv' name='file' id='file' onChange={handleFile} />
                        </div>

                        <div className='formBtnBox'>
                            <Button variant='contained' className='addBt' onClick={addNewClass}>Add New Class</Button>
                        </div>

                    </div>
                </div> : null}

                <div className='homeLeft'>
                    <SideBar />
                </div>
                <div className='homeRight'>

                    <div className='headerHome'>
                        <h4>Attandance WebApp</h4>
                        <div className='btnBox'>
                            <Button variant='contained' className='bt' onClick={() => setState(true)}>Add Class</Button>
                        </div>
                    </div>

                    <div className='allClass'>All Classes</div>

                    <div className='classCon'>

                        {classArray.map((val, index) => {
                            return <ClassBox data={val} key={index} />
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home