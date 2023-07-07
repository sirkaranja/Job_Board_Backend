from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, Employer, Employee, Job


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Enable CORS
CORS(app)

@app.route('/')
def index():
    return "<h1>Job Board</h1>"


@app.route('/employers', methods=['GET'])
def get_employers():
    employers = Employer.query.all()
    employers_data = [{'id': employer.id, 'name': employer.name, 'email': employer.email,
                       'phone_number': employer.phone_number} for employer in employers]
    return jsonify(employers_data)


@app.route('/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    employees_data = [{'id': employee.id, 'name': employee.name, 'email': employee.email,
                       'job_title': employee.job_title, 'phone_number': employee.phone_number,
                       'employer_id': employee.employer_id} for employee in employees]
    return jsonify(employees_data)


@app.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    jobs_data = [{'id': job.id, 'company_name': job.company_name, 'job_title': job.job_title,
                  'location': job.location, 'paye': job.paye, 'description': job.description,
                  'responsibility': job.responsibility, 'qualification': job.qualification,
                  'employer_id': job.employer_id} for job in jobs]
    return jsonify(jobs_data)

#patch methods for updating employer details
@app.route('/employers/<int:employer_id>', methods=['PATCH'])
def update_employer(employer_id):
    employer = Employer.query.get(employer_id)
    if not employer:
        return jsonify({'error': 'Employer not found'})
    if request.is_json:
        data = request.get_json()

        # Update the employer's information
        if 'name' in data:
            employer.name = data['name']
        if 'email' in data:
            employer.email = data['email']
        if 'phone_number' in data:
            employer.phone_number = data['phone_number']
        db.session.commit()
        return jsonify({'message': 'Employer updated successfully'})
    else:
        return jsonify({'error': 'Invalid JSON data'})

#update method for jobs
@app.route('/jobs/<int:job_id>', methods=['PATCH'])
def update_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({'error': 'Job details not found'})

    if request.is_json:
        data = request.get_json()

        # Update the job details
        if 'company_name' in data:
            job.company_name = data['company_name']
        if 'job_title' in data:
            job.job_title = data['job_title']
        if 'location' in data:
            job.location = data['location']
        if 'paye' in data:
            job.paye = data['paye']
        if 'description' in data:
            job.description = data['description']
        if 'responsibility' in data:
            job.responsibility = data['responsibility']
        if 'qualification' in data:
            job.qualification = data['qualification']

        db.session.commit()

        return jsonify({'message': 'Job updated successfully'})
    else:
        return jsonify({'error': 'Invalid JSON data'})


#delete method for job
@app.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({'error': 'Job not found'})
    db.session.delete(job)
    db.session.commit()
    return jsonify({'message': 'Job deleted successfully'})

#delete method for EMPLOYEES
@app.route('/employees/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    employee = Employee.query.get(employee_id)
    if not employee:
        return jsonify({'error':'Employee not found'})
    db.session.delete(employee)
    db.session.commit() 
    return jsonify({'message': 'Employee deleted successfully'})


#login and sign up methods


#Post methods for jobs and employees
@app.route('/jobs', methods=['POST'])
def create_job():
    if request.method == 'POST':
        data = request.json
        # Assuming 'data' is a JSON object with the required job information
        company_name = data.get('company_name')
        job_title = data.get('job_title')
        location = data.get('location')
        paye = data.get('paye')
        description = data.get('description')
        responsibility = data.get('responsibility')
        qualification = data.get('qualification')
        employer_id = data.get('employer_id')

        # Validate the data (you can add more validation checks here if needed)
        if not all([company_name, job_title, location, paye, employer_id]):
            return jsonify({'message': 'Incomplete job information'}), 400

        # Create the job entry and save it to the database
        job = Job(company_name=company_name, job_title=job_title, location=location, paye=paye,
                  description=description, responsibility=responsibility, qualification=qualification,
                  employer_id=employer_id)
        db.session.add(job)
        db.session.commit()

        return jsonify({'message': 'Job created successfully'}), 201

#Post method for employees






if __name__ == '__main__':
    app.run(port=5509)
