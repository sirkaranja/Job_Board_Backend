import React, { useState } from 'react';
import './PostJobs.css';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const PostJobs = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    job_title: '',
    location: '',
    paye: '',
    description: '',
    responsibility: '',
    qualification: '',
    employer_id: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5509/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Job created successfully');
        // Reset the form data
        setFormData({
          company_name: '',
          job_title: '',
          location: '',
          paye: '',
          description: '',
          responsibility: '',
          qualification: '',
          employer_id: ''
        });
      } else {
        console.log('Job creation failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {/* <h2>Add New Job</h2> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="company_name">Company Name</label>
        <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} required/>
        <label htmlFor="job_title">Job Title</label>
        <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} required />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="paye">Paye</label>
        <input
          type="number"
          name="paye"
          value={formData.paye}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="responsibility">Responsibility</label>
        <textarea
          name="responsibility"
          value={formData.responsibility}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="qualification">Qualification</label>
        <textarea
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="employer_id">Employer ID</label>
        <input
          type="number"
          name="employer_id"
          value={formData.employer_id}
          onChange={handleChange}
          
          required
        /><br></br>
       
       <Button className="btn" variant="primary" type="submit">Create Job</Button>
      </form>
     
    </div>
  );
};

export default PostJobs;
