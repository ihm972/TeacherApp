const { validationResult } = require('express-validator');
//const { getAdminById } = require("../models/admin.model");
const { getTeacherById } = require("../models/teacher.model");
//const Student = require('../models/student.model');

const newAdmin = {
    name: {
        exists: true,
        trim: true,
        errorMessage: "The name field is required"
    },
    surname: {
        exists: true,
        trim: true,
        errorMessage: "The surname field is required"
    },
    email: {
        exists: {
            errorMessage: "The email field is required",
        },
        trim: true,
        isEmail: {
            errorMessage: "The email must be valid",
        }
    },
    password: {
        exists: {
            errorMessage: "The password field is required",
        },
        trim: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars long'
        }
        // isStrongPassword: {
        //     minLength: 8,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1,
        // },
        // errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    },
    role_id: {
        exists: {
            errorMessage: "The role_id field is required",
        },
        isInt: true,
        errorMessage: "The role field must be a number"
    }

}

const updateAdmin = {
    name: {
        optional: true,
        trim: true,
    },
    surname: {
        optional: true,
        trim: true,
    },
    email: {
        optional: true,
        trim: true,
        isEmail: {
            errorMessage: "The email must be valid",
        }
    },
    password: {
        optional: true,
        trim: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars long'
        }
        // isStrongPassword: {
        //     minLength: 8,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1,
        // },
        // errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    },
    role_id: {
        optional: true,
        isInt: true,
        errorMessage: "The role field must be a number"
    }

}

const newStudent = {
    name: {
        exists: true,
        trim: true,
        errorMessage: "The name field is required"
    },
    surname: {
        exists: true,
        trim: true,
        errorMessage: "The surname field is required"
    },
    email: {
        exists: {
            errorMessage: "The email field is required",
        },
        trim: true,
        isEmail: {
            errorMessage: "The email must be valid",
        }
    },
    password: {
        exists: {
            errorMessage: "The password field is required",
        },
        trim: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars long'
        }
        // isStrongPassword: {
        //     minLength: 8,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1,
        // },
        // errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    },
    role_id: {
        exists: {
            errorMessage: "The role field is required",
        },
        isInt: true,
        errorMessage: "The role field must be a number"
    },
    phone: {
        exists: {
            errorMessage: "The phone field is required"
        },
        trim: true,
        isLength: {
            options: { max: 12 },
            errorMessage: 'The maximum length of the phone number is 12'
        }
    },
    avatar: {
        exists: true,
        trim: true,
        errorMessage: "The avatar field is required"
    },
    latitude: {
        optional: true,
        trim: true,
        isDecimal: {
            errorMessage: "The latitude field should be a decimal number"
        }
    },
    longitude: {
        optional: true,
        trim: true,
        isDecimal: {
            errorMessage: "The longitude field should be a decimal number"
        }
    },
    city_id: {
        exists: true,
        trim: true,
        errorMessage: "The city_id field is required"
    },
    address: {
        optional: true,
        trim: true
    }
}

/**
 * It checks if there are errors in the validation, if there are, it returns a 400 status code and the
 * errors
 * @param req - The request object.
 * @param res - The response object.
 * @param next - A function that is used to pass control to the next middleware function.
 * @returns a 400 status code and the errors.
 */
const checkError = (req, res, next) => {
    /* Checking if there are errors in the validation, if there are, it returns a 400 status code and the
    errors. */
    const errors = validationResult(req);
    /* Checking if there are errors in the validation, if there are, it returns a 400 status code and the
    errors. */
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    /* A function that is used to pass control to the next middleware function. */
    next();
};

/**
 * It checks if the admin id exists in the database.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - A function that is used to pass control to the next middleware function.
 */
const checkAdmin = async (req, res, next) => {
    const { adminid } = req.params;
    /* Checking if the admin id exists. */
    if (await getAdminById(adminid)) {
        /* A function that is used to pass control to the next middleware function. */
        next();
    } else {
        res.status(404).json({ Message: 'That admin user does not exist' });
    }
};

/**
 * This function checks if the teacher id exists in the database. If it does, it passes control to the
 * next middleware function. If it doesn't, it returns a 404 status code with a message
 * @param req - The request object.
 * @param res - The response object.
 * @param next - A function that is used to pass control to the next middleware function.
 */
const checkTeacher = async (req, res, next) => {
    const { teacherid } = req.params;
    /* Checking if the teacher id exists. */
    if (await getTeacherById(teacherid)) {
        /* A function that is used to pass control to the next middleware function. */
        next();
    } else {
        res.status(404).json({ Message: 'That teacher user does not exist' });
    }
};

/**
 * It checks if the student id exists in the database.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - A function that is used to pass control to the next middleware function.
 */
const checkStudent = async (req, res, next) => {
    const { studentId } = req.params;
    /* Checking if the student id exists. */
    if (await Student.getById(studentId)) {
        /* A function that is used to pass control to the next middleware function. */
        next();
    } else {
        res.status(404).json({ Message: 'That student does not exist' });
    }
};

module.exports = {
    newAdmin, updateAdmin, newStudent, checkError, checkAdmin, checkTeacher, checkStudent
}