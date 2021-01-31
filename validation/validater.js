const Joi = require('joi');
const schema=Joi.object({   
 customerId:Joi.number().required(),
 requesterId:Joi.string().required(),
 notEventName:Joi.string().required(),
 requestItemId:Joi.number().required(),
 srcModuleName:Joi.string().required(),
 pccData:Joi.array().items({
     itemData:Joi.object()
 })
})
module.exports={schema:schema}