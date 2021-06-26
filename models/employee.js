const { Schema, model } = require('mongoose');

const EmployeeSchema = Schema({
    surname: {
        type: String,
        required: [true, 'El primer apellido es requerido']
    },
    secondSurname: {
        type: String,
        required: [true, 'El segundo apellido es requerido']
    },
    first_name: {
        type: String,
        required: [true, 'El primer nomnbre es requerido']
    },
    second_name: {
        type: String,
        required: [true, 'El segundo nombre es requerido']
    },
    country: {
        type: String,
        required: [true, 'El pais es requerido'],
        enum: ['CO', 'US']
    },
    documentType: {
        type: String,
        required: [true, 'El tipo de identidad es requerido'],
        enum: ['CC', 'CE', 'PP', 'PE']
    },
    document: {
        type: String,
        required: [true, 'El documento de identidad es requerido'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true
    },
    dateOfAdmission: {
        type: Number,
        required: [true, 'La fecha de ingreso es requerida'],
    },
    area: {
        type: String,
        required: [true, 'El area es requerida'],
        enum: ['ADMIN', 'FINANCIAL', 'SHOPPING', 'INFRASTRUCTURE', 'OPERATION', 'HUMANTALENT', 'SERVICES', 'OTHER']
    },
    status: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Number,
        default: Date.now()
    },
});

EmployeeSchema.methods.toJSON = function() {
    const {__v, ...model} = this.toObject();
    return model;
}

module.exports = model('employee', EmployeeSchema);