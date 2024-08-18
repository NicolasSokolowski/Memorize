import { fileURLToPath } from "url";
import { basename } from "path";
import debugLogger from "../utils/debugLogger.util.js";

const __fileName = basename(fileURLToPath(import.meta.url));
const logger = debugLogger(__fileName);

const handleErrors = (error, _, res, next) => {
  logger(`
    An error occured. Code: ${error.errorCode}. 
    Message: ${error.message}. 
    Details: ${error.details}
  `);
  res.status(error.httpStatus)
    .json({ 
      code: error.errorCode, 
      message: error.message, 
      details: error.details  
    });
  next();
};

export default handleErrors;
