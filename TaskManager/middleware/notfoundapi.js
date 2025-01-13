const notFound = (req,res)=>{
    res.status(400).json({"message":"route path not found"})
}

module.exports= notFound;