from flask import Flask
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Employer(db.Model):
    __tablename__ = 'employers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    phone_number = db.Column(db.String(20))
    employees = db.relationship('Employee', backref='employer', lazy=True)
    jobs = db.relationship('Job', backref='employer', lazy=True)


class Employee(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    job_title = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))
    employer_id = db.Column(db.Integer, db.ForeignKey('employers.id'))
    jobs = db.relationship('Job', secondary='employee_job_association', backref='applicants', lazy='subquery')


class Job(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100))
    job_title = db.Column(db.String(100))
    location = db.Column(db.String(100))
    paye = db.Column(db.Integer)
    description = db.Column(db.Text)
    responsibility = db.Column(db.Text)
    qualification = db.Column(db.Text)
    employer_id = db.Column(db.Integer, db.ForeignKey('employers.id'))


employee_job_association = db.Table('employee_job_association',
                                    db.Column('employee_id', db.Integer, db.ForeignKey('employees.id'),
                                              primary_key=True),
                                    db.Column('job_id', db.Integer, db.ForeignKey('jobs.id'), primary_key=True)
                                    )




# Establish the relationship between the tables:
# 1.employer  can have many employees
# 2.employers can post many jobs
# 3.employee can aapply to many jobs
