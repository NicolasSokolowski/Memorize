import ApiError from "../errors/api.error.js";

const validateInput = (sourceProperty, schema) => async (request, _, next) => {
  try {
    await schema.validateAsync(request[sourceProperty]);
    next();
  } catch (error) {
    next(new ApiError(error.details[0].message, { httpStatus: 400 }));
  }
};

export default validateInput;
