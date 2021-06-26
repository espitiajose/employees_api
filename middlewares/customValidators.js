const textValidatorRequire = async (value) => {
    if(value == null) throw new Error(`El campo es requerido`);
    if(!(/^[a-zA-Z\u00E9]{1,20}]*$/.test(value))) throw new Error(`${value} no es válido`);
}

const textValidatorNotRequire = async (value) => {
    if(!(/^[a-zA-Z\u00E9]{1,20}]*$/.test(value))) throw new Error(`${value} no es válido`);
}


module.exports = {
    textValidatorRequire,
    textValidatorNotRequire
}