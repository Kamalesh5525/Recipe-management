
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function Add() {
    const [title, setTitle] = useState("");
    const [dep, setDep] = useState("");
    const [int, setInt] = useState(""); 
    const [cuisine, setCuisine] = useState(""); 
    const [cooking, setCooking] = useState("");  
    const [record, setRecord] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('course')) || [];
        setRecord(data);
    }, []);

    const handle = (e) => {
        e.preventDefault();

        if (!title || !dep || !int || !cuisine || !cooking) {
            toast.error("All fields are required");
            return;
        }

        const obj = {
            id: Math.floor(Math.random() * 10000),
            title,
            dep,
            int,
            cuisine,
            cooking,
        };

        const newrecord = [...record, obj];
        localStorage.setItem('course', JSON.stringify(newrecord));
        setRecord(newrecord);
        toast.success("Successfully added...");

        setTitle("");
        setDep("");
        setInt("");
        setCuisine("");
        setCooking("");
        navigate('/view');
    };

    return (
        <div>
            <Header />
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>ADD RECIPE</h2>
            <div className="container" style={{ textAlign: "center", color: "white" }}>
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <form onSubmit={handle} className='p-3 mt-2 shadow' style={{ border: "8px double #2E0249", borderRadius: "15px", background: "#8BBCCC" }}>
                            <div className="my-2">
                                <input 
                                    type="text" 
                                    className="form-control mt-3" 
                                    style={{ border: "2px solid black" }} 
                                    placeholder='Enter Title' 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    value={title} 
                                />
                            </div>
                            <div className="my-2">
                                <input 
                                    type="text" 
                                    style={{ border: "2px solid black" }} 
                                    className="form-control py-4" 
                                    placeholder='Ingredient' 
                                    onChange={(e) => setDep(e.target.value)} 
                                    value={dep} 
                                />
                            </div>
                            <div className="my-2">
                                <input 
                                    type="text" 
                                    style={{ border: "2px solid black" }} 
                                    className="form-control py-4" 
                                    placeholder='Interuction' 
                                    onChange={(e) => setInt(e.target.value)} 
                                    value={int} 
                                />
                            </div>

                            <div className="my-2">
    <select 
        id="cuisine" 
        className='py-2' 
        name="cuisine" 
        style={{ width: "100%", borderRadius: "5px", border: "2px solid black" }} 
        onChange={(e) => setCuisine(e.target.value)} // Set state
        value={cuisine} // Controlled component
    >
        <option value="">Select Cuisine</option> {/* Default option */}
        <option value="italian">Italian</option>
        <option value="mexican">Mexican</option>
        <option value="chinese">Chinese</option>
        <option value="indian">Indian</option>
        <option value="japanese">Japanese</option>
        <option value="mediterranean">Mediterranean</option>
        <option value="thai">Thai</option>
    </select>
</div>


                            <div className="my-2">
                                <input 
                                    type="time" 
                                    style={{ border: "2px solid black" }} 
                                    className="form-control" 
                                    placeholder='Cooking time' 
                                    onChange={(e) => setCooking(e.target.value)} 
                                    value={cooking} 
                                />
                            </div>

                            <button type="submit" className="btn mx-auto d-block btn-primary mt-5">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Add;
