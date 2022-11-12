const router = require('express').Router();

const { checkSchema } = require('express-validator');

const { getAllTeachers, getById, getTeachersByPage, create, update, deleteById } = require('../../models/teacher.model');

/**TODO: Conflicto con nombres de métodos iguales entre users y teachers por eso lo comenté para ver qué necesito y renombré un par mios*/
//const { getAll, getById, getByPage, create, update, deleteById } = require('../../models/user.model');

/**TODO: Validators Teachers*/
const { teacherData, checkValidationErrors, checkTeacher } = require('../../helpers/validators');

/* GET - READ */
router.get('/', async (req, res) => {
 
    let teachers;

    try {

        if (Object.keys(req.query).length !== 0) {            
            const { page , limit } = req.query;
            teachers = await getTeachersByPage(parseInt(page), parseInt(limit));
        }
        else {            
            teachers = await getAllTeachers();
        }
        
        res.status(200).json(teachers);
        
    } catch (error) {
        res.status(400).json({ error: "GET Error " + error.errno + ": " + error.message});
    }
});

router.get('/:teacherId', async (req, res) => {
    const { teacherId } = req.params;

    try {
        const teacher = await getById(teacherId);

        if (teacher) {
            res.status(200).json(teacher);
        } else {
            res.status(400).json({ error: 'No existe el profesor con Id ' + teacherId });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Error " + error.errno + ": " + error.message});
    }   
});


/* POST - INSERT*/ 
router.post('/',     
   // checkSchema(teacherData),
   //checkValidationErrors,
    async (req, res) => {

        try {
            
            const result = await create(req.body);            
            const teacher = await getById(result.insertId);
            res.status(200).json(teacher);
        } 
        catch (error) {
            console.log(error);
            if (error.code === 'ECONNREFUSED') {
                res.status(503);
            }
            else {
                res.status(400);
            }
            res.json({ error: "POST Error " + error.errno + ": " + error.message});
        }
    }
);


/* PUT - UPDATE*/
router.put('/:teacherId', 
    //checkTeacher,
    //checkSchema(teacherData),
    //checkValidationErrors,
    async (req, res) => {

        const { teacherId } = req.params;

        try {            
            const result = await update(teacherId, req.body);
            res.status(200).json(result);
        } 
        catch (error) {      
           
           res.status(400).json({ error: "PUT Error " + error.errno + ": " + error.message,
                                   result: "No se pudo actualizar el profesor " + teacherId
                                });
        }
    }
);

/* DELETE */
router.delete('/:teacherId',
    //checkTeacher,
    async (req, res) => {

        const { teacherId } = req.params;

        try {      
            const result = await deleteById(teacherId);
            res.status(200).json(result);
        } 
        catch (error) {        
            res.status(400).json({ error: "DELETE Error " + error.errno + ": " + error.message,
                                   result: "No se pudo eliminar el profesor " + teacherId
                                });
        }
    }
);


module.exports = router;