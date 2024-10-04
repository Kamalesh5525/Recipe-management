


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({ title: '', dep: '', int: '', cuisine: '', cooking: '' });

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('course')) || [];
        const currentCourse = data.find(val => val.id === parseInt(id));
        if (currentCourse) {
            setCourse(currentCourse);
        }
    }, [id]);

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('course')) || [];
        const updatedData = data.map(val => (val.id === parseInt(id) ? course : val));
        localStorage.setItem('course', JSON.stringify(updatedData));
        toast.success("Record updated successfully!");
        navigate('/view'); // Redirect to view page
    };

    return (
        <div className="container">
            <h1>Edit Course</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={course.title} onChange={handleChange} placeholder="Title" required />
                <input type="text" name="dep" value={course.dep} onChange={handleChange} placeholder="Ingredient" required />
                <input type="text" name="int" value={course.int} onChange={handleChange} placeholder="Interaction" required />
                <input type="text" name="cuisine" value={course.cuisine} onChange={handleChange} placeholder="Type" required />
                <input type="text" name="cooking" value={course.cooking} onChange={handleChange} placeholder="Time" required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Edit;
