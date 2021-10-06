const { Router } = require('express');
const { check } = require('express-validator');
const { textValidatorRequire, textValidatorNotRequire } = require('../middlewares/customValidators');
const controller = require('../controllers/employee');
const { inputValidator } = require('../middlewares/input-validator');

const router = Router();

router.get('/list', [], controller.employeeListPagination);
router.get('/list/inactives', [], controller.employeeDeletedListPagination);

router.post('/create', [
    check('surname').custom(textValidatorRequire),
    check('secondSurname').custom(textValidatorRequire),
    check('first_name').custom(textValidatorRequire),
    check('second_name').custom(textValidatorRequire),
    check('country', 'El campo es requerido').not().isEmpty(),
    check('documentType', 'El campo es requerido').not().isEmpty(),
    check('document', 'El campo es requerido').not().isEmpty(),
    check('document').custom(controller.existDocumentValidator),
    check('dateOfAdmission', 'El campo es requerido').not().isEmpty(),
    check('area', 'El campo es requerido').not().isEmpty(),
    inputValidator
], controller.employeeCreate);

router.put('/update/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(controller.existEmployeeValidator),
    check('surname').custom(textValidatorNotRequire),
    check('secondSurname').custom(textValidatorNotRequire),
    check('first_name').custom(textValidatorNotRequire),
    check('second_name').custom(textValidatorNotRequire),
    inputValidator
], controller.employeeUpdate);

router.delete('/:id', [ 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(controller.existEmployeeValidator),
    inputValidator
], controller.employeeDelete);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(controller.existEmployeeValidator),
    inputValidator
], controller.employeeActive);


module.exports = router;