

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './view.css';

const View = () => {
    const [record, setRecord] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedIds, setSelectedIds] = useState(new Set());
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('course')) || [];
        setRecord(data);
    }, []);

    const filteredRecords = record
        .filter(val => 
            Object.values(val).some(field => 
                String(field).toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        .sort((a, b) => {
            const comparison = sortOrder === 'asc' 
                ? a[sortField].localeCompare(b[sortField])
                : b[sortField].localeCompare(a[sortField]);
            return comparison;
        });

    const handleEdit = (val) => {
        navigate(`/edit/${val.id}`); // Navigate to edit page with course ID
    };

    const deleteCourse = (id) => {
        const updatedRecords = record.filter(val => val.id !== id);
        setRecord(updatedRecords);
        localStorage.setItem('course', JSON.stringify(updatedRecords));
        toast.success("Record deleted successfully!");
    };

    const allDelete = () => {
        const updatedRecords = record.filter(val => !selectedIds.has(val.id));
        setRecord(updatedRecords);
        localStorage.setItem('course', JSON.stringify(updatedRecords));
        setSelectedIds(new Set());
        toast.success("Selected records deleted successfully!");
    };

    const handleCheckboxChange = (id) => {
        const updatedSelection = new Set(selectedIds);
        if (updatedSelection.has(id)) {
            updatedSelection.delete(id);
        } else {
            updatedSelection.add(id);
        }
        setSelectedIds(updatedSelection);
    };

    return (
        <div className='mx-auto container-fluid'>
            <h1 style={{ textAlign: "center" }}>VIEW PAGE</h1>
            <button style={{ width: "120px", display: "flex", textAlign: "center", padding: "5px", margin: "0 40%", color: "black" }}>
                <Link to="/" style={{ textAlign: "center", margin: "0 auto", textDecoration: "none", color: 'black', fontWeight: "800" }}>Add Page</Link>
            </button>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <h2 style={{ fontWeight: "bold", color: "black", marginBottom: "30px", textDecoration: "underline" }}>VIEW</h2>
                        
                        <div className="mb-3">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                className="form-control" 
                            />
                        </div>
                        <div className="mb-3">
                            <select 
                                value={sortField} 
                                onChange={(e) => setSortField(e.target.value)} 
                                className="form-control"
                            >
                                <option value="title">Sort by Title</option>
                                <option value="dep">Sort by Ingredient</option>
                                <option value="int">Sort by Interaction</option>
                            </select>
                            <select 
                                value={sortOrder} 
                                onChange={(e) => setSortOrder(e.target.value)} 
                                className="form-control"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        
                        <div className="row mt-5">
                            {filteredRecords.map(val => (
                                <div key={val.id} className="col-md-4 mb-4">
                                    <div className="card" style={{ background: "black", border: "5px solid #180A0A", borderRadius: "20px", color: "white" }}>
                                        <div className="card-body text-center">
                                            <h5 className="card-title">Title: {val.title}</h5>
                                            <p className="card-text">Ingredient: {val.dep}</p>
                                            <p className="card-text">Interaction: {val.int}</p>
                                            <p className="card-text">Type: {val.cuisine}</p>
                                            <p className="card-text">Time: {val.cooking}</p>
                                            <button className='btn' onClick={() => handleEdit(val)} style={{ fontSize: "30px", color: "#FCFAEE" }}>
                                                <FaEdit />
                                            </button>
                                            <button className='btn' onClick={() => deleteCourse(val.id)} style={{ fontSize: "30px", color: "red" }}>
                                                <MdDelete />
                                            </button>
                                            <div className="form-check mt-2">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    checked={selectedIds.has(val.id)} 
                                                    onChange={() => handleCheckboxChange(val.id)} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className='btn btn-danger' onClick={allDelete}>Delete Selected</button>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
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

export default View;
