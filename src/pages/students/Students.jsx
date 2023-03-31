import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sideBar/SideBar'
import './students.scss'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addStudent, getStudents, takeAttendance } from '../../store/slice/studentSlice'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/api'

const Students = () => {

    const { id } = useParams();
    const navigate = useNavigate();


    const [Array, setArray] = useState([]);

    const { students } = useSelector(state => state.studentSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudents(id));
    }, []);

    useEffect(() => {
        if (students) {
            const stu = students.map((obj) => {
                return { ...obj, present: false };
            })
            setArray(stu);
        }
    }, [students]);

    const handleAttendance = (e, id) => {
        const stu = Array.map((obj) => {
            if (e.target.checked) {
                if (obj._id == id) {
                    return { ...obj, present: true };
                }
            } else {
                if (obj._id == id) {
                    return { ...obj, present: false };
                }
            }
            return obj;
        })
        setArray(stu);
    }

    ////////////////////////// add student ///////////////////////////////
    const [state, setState] = useState(false);

    const [stuData, setStuData] = useState({
        classId: id,
        name: "",
        roll: "",
        count: ""
    });

    const handleChange = (e) => {
        setStuData({ ...stuData, [e.target.name]: e.target.value });
    }

    const addNewStudent = () => {
        dispatch(addStudent(stuData));
        setState(false);
    }

    const takeAttend = () => {
        const newData = Array.filter((obj) => {
            return obj.present
        })
        dispatch(takeAttendance({ studentArray: newData, classId: id }));
        navigate("/");
    }

    ///////////////////////////////////////// get count /////////////////////////
    const [total, setTotal] = useState(0);

    const getCount = async () => {
        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.post("/get_class_count", { _id: id }, config);
            setTotal(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCount();
    }, []);

    var today = new Date();
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = `${today.getDate()}-${month[today.getMonth()]}-${today.getFullYear()} `


    return (
        <>


            <div className='studentClass'>

                <div className='classLeft'>
                    <SideBar />
                </div>


                {state ? <div className='addStudentForm' onClick={() => setState(false)}>
                    <div className='studentCon' onClick={(e) => e.stopPropagation()}>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name='name' val={stuData.name} placeholder="Enter class name" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Roll No.</label>
                            <input type="text" className="form-control" name='roll' value={stuData.roll} placeholder="Enter class name" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Total Attendance</label>
                            <input type="text" className="form-control" name='count' value={stuData.count} placeholder="Enter class name" onChange={handleChange} />
                        </div>

                        <div className='stuBt'>
                            <Button variant='contained' className='bt' onClick={addNewStudent}>Add Student</Button>
                        </div>

                    </div>
                </div> : null}


                <div className='classRight'>

                    <div className='headerClass'>
                        Class Name
                        <div className='date'>
                            {date}
                        </div>
                    </div>


                    <div className='inner'>

                        <div className='totalClasses'>Total Classes : {total}</div>

                        <div className='studentData'>
                            Student Data
                            <Button variant='outlined' className='addBt1' onClick={() => setState(true)}>Add Student</Button>
                        </div>

                        <div className='tableBox'>
                            <div className='tableHeader'>
                                <div>Sr. No.</div>
                                <div>Name</div>
                                <div>Enrollment Number</div>
                                <div>Total Present</div>
                                <div>Percentage</div>
                                <div>Present/Absent</div>
                            </div>

                            <div className='tableResposive'>
                                {Array.map((val, index) => {
                                    return (
                                        <div className='tableBody' key={index}>
                                            <div> {index + 1} </div>
                                            <div> {val.name} </div>
                                            <div> {val.roll} </div>
                                            <div> {val.count} </div>
                                            <div> {(val.count * 100 / total).toFixed(2)}% </div>
                                            <div style={{ display: "grid", placeContent: "center", padding: "0px" }}> <input type="checkbox" checked={val.present} onChange={(e) => handleAttendance(e, val._id)} /> </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="saveBtBox"><Button variant='contained' className='saveBt' onClick={takeAttend}>save</Button></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Students