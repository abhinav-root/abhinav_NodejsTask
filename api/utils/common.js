const isValidCountryCode = (dialCode) => {
    return dialCode.startsWith('+');
};

const hasPhoneNumberTenDigits = (phoneNumber) => {
    return phoneNumber.length === 10;
};

export const isValidPhone = (phone) => {
    const [dialCode, phoneNumber] = phone.split('-');
    if (!isValidCountryCode(dialCode)) {
        throw new Error('Invalid country code');
    }
    if (!hasPhoneNumberTenDigits(phoneNumber)) {
        throw new Error('phone number must be 10 digits');
    }
    return true;
};

export const hospitals = [
    'Apollo Hospitals',
    'Jawaharlal Nehru Medical College and Hospital',
    'Indira Gandhi Institute of Medical Sciences (IGIMS)',
    'AIIMS - All India Institute Of Medical Science',
];

// API response format
export const apiResponse = (
    res,
    code,
    success,
    msg = null,
    data = null,
    errors = null
) => {
    const response = { success, msg };
    if (data) {
        response.data = data;
    }
    if (errors) {
        response.error = errors;
    }
    return res.status(code).json(response);
};

export const InternalServerError = (res, msg) => {
    return apiResponse(res, 500, false, msg, null, 'Internal server error');
};

export const isValidData = (errors) => {
    return errors.isEmpty();
};

export const JWT_SECRET = process.env.JWT_SECRET;
