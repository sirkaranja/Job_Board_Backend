import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewJobs.css';

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const apiUrl = 'http://127.0.0.1:5509/jobs';

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id) => {
    console.log(`Update job with ID: ${id}`);
 

    try {
      const updatedJobData = {
        // Provide the updated job details here
        // For example:
        // company_name: 'Updated Company Name',
        // job_title: 'Updated Job Title',
        // location: 'Updated Location',
        // paye: 10000,
        // description: 'Updated Description',
        // responsibility: 'Updated Responsibility',
        // qualification: 'Updated Qualification',
      };

      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJobData),
      });

      const data = await response.json();
      console.log(data.message);
      // Refresh the job list after successful update
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    // Perform delete action for the job with the specified ID
    console.log(`Delete job with ID: ${id}`);
    // Replace the console.log statement with your delete logic

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data.message);
      // Refresh the job list after successful deletion
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Table striped hover className="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Company Name</th>
          <th>Location</th>
          <th>Salary</th>
          <th>Description</th>
          <th>Responsibility</th>
          <th>Qualification</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map(job => (
          <tr key={job.id}>
            <td>{job.id}</td>
            <td>{job.company_name}</td>
            <td>{job.location}</td>
            <td>{job.paye}</td>
            <td>{job.description}</td>
            <td>{job.responsibility}</td>
            <td>{job.qualification}</td>
            <td>
              <div className="custom-buttons-container">
                <Button
                  className="btn"
                  variant="primary"
                  onClick={() => handleUpdate(job.id)}
                >
                  Update
                </Button>
                <Button
                  className="btn"
                  variant="danger"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ViewJobs;
