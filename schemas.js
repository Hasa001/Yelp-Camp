const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = function (joi) {
    return {
    type: 'string',
    base: joi.string(),
    messages: {

        'string.round': '{{#label}} must be a round number',
    },

    rules: {

        round: {

            validate(value, helpers, args, options) {

                const clean = sanitizeHtml(value, {
                                        allowedTags: [],
                                        allowedAttributes: {},
                                    });
                                    if (clean !== value) {
                                        console.log(clean)
                                        return helpers.error('string.escapeHTML', { value })}
                                    return clean;
            }
        }
  }
    }
}
const Joi = BaseJoi.extend(extension)

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().round(),
        price: Joi.number().required().min(0),
        image: Joi.string(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})

