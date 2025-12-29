import Product from "../models/Product.js"

const SingleProduct = async (req, res) => {
    // Access Public
    try {
       const product = await Product.findById(req.params.id) 

       if(product) {
        return res.send(product)
       } else {
        res.status(404).send({msg: "Product not found."})
       }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error")
    }
}

export default SingleProduct