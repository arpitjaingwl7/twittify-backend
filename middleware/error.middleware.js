const errorMiddleware = (err,req,res,next)=>{

    const statusCode = err.statusCode || 500
    const message = err.message || "something went wrong"

    return res.status(statusCode).json({
        statusCode,
        message,
        success:false
    })

}

export default errorMiddleware