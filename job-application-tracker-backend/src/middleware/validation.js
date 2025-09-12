/**
 * Validation Middleware
 * Request validation rules using express-validator
 */

const { body } = require('express-validator');

// User registration validation
const validateRegister = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),

  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('Password must be between 6 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Profile update validation
const validateProfileUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),

  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array')
    .custom((skills) => {
      if (skills.length > 50) {
        throw new Error('Maximum 50 skills allowed');
      }
      for (const skill of skills) {
        if (typeof skill !== 'string' || skill.trim().length === 0) {
          throw new Error('Each skill must be a non-empty string');
        }
        if (skill.length > 100) {
          throw new Error('Each skill must not exceed 100 characters');
        }
      }
      return true;
    })
];

// Password change validation
const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),

  body('newPassword')
    .isLength({ min: 6, max: 128 })
    .withMessage('New password must be between 6 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
];

// Job application validation
const validateJobApplication = [
  body('jobUrl')
    .isURL()
    .withMessage('Please provide a valid job URL')
    .isLength({ max: 2000 })
    .withMessage('Job URL must not exceed 2000 characters'),

  body('company')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Company name is required and must not exceed 255 characters'),

  body('position')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Position is required and must not exceed 255 characters'),

  body('jobDescription')
    .optional()
    .isLength({ max: 10000 })
    .withMessage('Job description must not exceed 10000 characters'),

  body('skillsMatched')
    .optional()
    .isArray()
    .withMessage('Skills matched must be an array'),

  body('matchPercentage')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Match percentage must be between 0 and 100'),

  body('status')
    .optional()
    .isIn(['applied', 'interview', 'rejected', 'accepted', 'withdrawn'])
    .withMessage('Status must be one of: applied, interview, rejected, accepted, withdrawn'),

  body('salaryRange')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Salary range must not exceed 100 characters'),

  body('location')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Location must not exceed 255 characters'),

  body('workType')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Work type must not exceed 50 characters'),

  body('notes')
    .optional()
    .isLength({ max: 5000 })
    .withMessage('Notes must not exceed 5000 characters')
];

// Recruiter contact validation
const validateRecruiterContact = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Name is required and must not exceed 255 characters'),

  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),

  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number')
    .isLength({ max: 50 })
    .withMessage('Phone number must not exceed 50 characters'),

  body('company')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Company must not exceed 255 characters'),

  body('position')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Position must not exceed 255 characters'),

  body('linkedinUrl')
    .optional()
    .isURL()
    .withMessage('Please provide a valid LinkedIn URL'),

  body('notes')
    .optional()
    .isLength({ max: 5000 })
    .withMessage('Notes must not exceed 5000 characters'),

  body('status')
    .optional()
    .isIn(['active', 'inactive', 'responded'])
    .withMessage('Status must be one of: active, inactive, responded')
];

module.exports = {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validatePasswordChange,
  validateJobApplication,
  validateRecruiterContact
};