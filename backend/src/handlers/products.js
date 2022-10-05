const ProductModel = require('../models/product');

//Transforma o retorno do banco em um json que pode ser utilizado nos outros métodos.
const transform = product => ({
    type: 'products',
    id: product.id,
    attributes: {
        name: product.name,
        email: product.email,
        passwd: product.passwd,
        question: product.question,
        answer: product.answer,
    },
    links: {
        self: `/api/v1/products/${product.id}`
    }
});

//get products all.
const getAll = async (request, h) => {
    const products = await ProductModel.find({});
    return { data: products.map(transform) };
};
//get 1 product por id.
const find = async (req) => {
    const product = await ProductModel.findById(req.params.id);
    return { data: transform(product) };
}

//post products.
const save = async (req, h) => {
    const { name, email, passwd, question, answer } = req.payload;

    const product = new ProductModel;
    product.name = name;
    product.email = email;
    product.passwd = passwd;
    product.question = question;
    product.answer = answer;

    await product.save();

    const prod = {
        type: 'products',
        id: product.id,
        attributes: {
            name: product.name,
            email: product.email,
            passwd: product.passwd,
            question: product.question,
            answer: product.answer,
        },
        links: {
            self: `/api/v1/products/${product.id}`
        }
    };

    return h.response(transform(product)).code(201);

};

//Deleta um produto
const remove = async (req, h) => {
    await ProductModel.findByIdAndDelete({ _id: req.params.id });
    return h.response().code(204);
}

//exportando métodos
module.exports = {
    getAll,
    find,
    save,
    remove
};