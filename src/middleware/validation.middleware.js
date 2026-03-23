export const validate = (schema) => (req,res,next)=>{
    const {error,value}=schema.validate(req.body,{
        abortEarly:false,
        stripUnknown:true,
    });

    if(error){
        const errors = error.details.map((err)=>err.message);

        return next({statusCode:400,
            message:"Validation failed",
            errors,
        });
    }

    req.body = value;
    next();
}