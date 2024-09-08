const Quote = require("../models/quote");

exports.getQuote = async (req, res) => {
    try {
    
      const count = await Quote.countDocuments();
  

      if (count === 0) {
        return res.status(404).json({
          success: false,
          message: "No quotes found",
        });
      }
  
      const random = Math.floor(Math.random() * count);
  
    
      const response = await Quote.findOne().skip(random);
  
      if (!response) {
        return res.status(404).json({
          success: false,
          message: "Quote not found",
        });
      }
  
      res.status(200).json({
        success: true,
        data: response,
        message: "Data Fetched Successfully",
      });
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({
        success: false,
        message: "Not Fetched",
      });
    }
  };
  

  exports.getAuthor = async (req, res) => {
    try {
      const { author } = req.query;
  
      if (!author) {
        return res.status(400).json({
          success: false,
          message: "Author query parameter is required"
        });
      }
      
      const response = await Quote.find({ author: new RegExp(author, 'i') });
      
      res.status(200).json({
        success: true,
        data: response,
        message: "Author Fetched Successfully"
      });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({
        success: false,
        message: "Error Fetching Author"
      });
    }
  };
  
  
exports.createQuote= async(req,res)=>{
    try{
    const {text,author} = req.body;
    const response= await Quote.create({text,author});
    res.status(200).json(
        {
            success:true,
            data:response,
            message:"Entry created Successfully"
        }
    
    )
}catch(error)
{
    console.log("Error",error)
    res.status(500).json(
        {
            success:false,
            message:"Internal server Error"
        }
    
    )

}


}