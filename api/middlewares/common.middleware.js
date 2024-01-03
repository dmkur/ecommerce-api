const { statusCodeENUM } = require('../constants');
const { CustomErrorHandler } = require('../errors');

module.exports = {
  checkIsBodyValid: (validatorType) => (req, res, next) => {
    try {
      const validate = validatorType.validate(req.body);

      if (validate.error) {
        return next(
          new CustomErrorHandler(
            validate.error.message,
            statusCodeENUM.BAD_REQUEST,
          ),
        );
      }

      req.body = validate.value;

      next();
    } catch (e) {
      next(e);
    }
  },
};
