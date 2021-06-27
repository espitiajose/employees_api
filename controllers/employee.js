const { response, request } = require('express')
const Employee = require('../models/employee');

const employeeCreate = async (req = request, res = response) => {

    const {surname, first_name, country} = req.body; 
    const count = await Employee.countDocuments({email: { $regex: '.*' + `${first_name}.${surname}`.toLowerCase() + '.*' }, country });
    let email = '';
    if(count > 0) email = `${first_name}.${surname}.${count}@cidenet.com.${country}`.toLowerCase();
    else email = `${first_name}.${surname}@cidenet.com.${country}`.toLowerCase();
    req.body['email'] = email;
    const employee = new Employee(req.body);

    employee.save();

    res.status(201).json({
        msg: 'Empleado creado creado exitosamente',
        data: employee
    })
}

const employeeListPagination = async (req = request, res = response) => {

    const { from = 0, limit = 10 } = req.query;

    const [total, data] = await Promise.all([
        Employee.countDocuments({status: true}),
        Employee.find({status: true}).sort({createdDate: 'desc'})
        .skip(+from)
        .limit(+limit)
    ]);        

    res.status(200).json({
        total,
        data
    });
}

const employeeDeletedListPagination = async (req = request, res = response) => {

    const { from = 0, limit = 10 } = req.query;

    const [total, data] = await Promise.all([
        Employee.countDocuments({status: false}),
        Employee.find({status: false}).sort({createdDate: 'desc'})
        .skip(+from)
        .limit(+limit)
    ]);        

    res.status(200).json({
        total,
        data
    });
}



const employeeUpdate = async (req = request, res = response) => {

    const { id } = req.params;
    const {email, _id, status, createdDate, ...all} = req.body; 
    const employee = await Employee.findByIdAndUpdate(id, all);

    res.status(200).json({
        msg: 'Empleado actualizado exitosamente',
        data: employee
    })
}


const employeeDelete = async (req = request, res = response) => {

    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, {status: false});

    res.status(200).json({
        msg: 'Empleado eliminado exitosamente',
    })
}

const employeeActive = async (req = request, res = response) => {

    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, {status: true});

    res.status(200).json({
        msg: 'Empleado activado exitosamente',
    })
}

const existEmailValidator = async (email = '') => {
    const exist = await Employee.findOne({email});
    if(exist) throw new Error(`El email ${email} ya se encuentra registrado`);
}

const existDocumentValidator = async (document = '') => {
    const exist = await Employee.findOne({document});
    if(exist) throw new Error(`El documento ${document} ya se encuentra registrado`);
}

const existEmployeeValidator = async (id) => {
    const exist = await Employee.findById(id);
    if(!exist) throw new Error(`El id ${id} no se encuentra registrado`);
}

module.exports = {
    employeeCreate,
    employeeListPagination,
    employeeDeletedListPagination,
    employeeUpdate,
    employeeDelete,
    employeeActive,
    existEmailValidator,
    existEmployeeValidator,
    existDocumentValidator
}