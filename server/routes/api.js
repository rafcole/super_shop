const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const CartItem = require("../models/cartItem");

// retreive all products from mongo
router.get("/products", (req, res, next) => {
  Product.find({})
    .then((products) => {
      // console.log("inside api products", { products });
      res.json(products);
    })
    .catch(next);
});

// add a product to mongo
router.post("/products", (req, res, next) => {
  const { title, price, quantity } = req.body;
  Product.create({ title, price, quantity })
    .then((product) => res.json(product))
    .catch((err) => next(err));
});

// edit a product that exists in mongo
router.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  const { title, price, quantity } = req.body;
  Product.findById(productId)
    .then((product) => {
      return Product.findByIdAndUpdate(
        productId,
        {
          title: title || product.title,
          price: price === undefined ? product.price : price,
          quantity: quantity === undefined ? product.quantity : quantity,
        },
        { new: true }
      );
    })
    .then((updatedProduct) => {
      res.json(updatedProduct);
    });
});

router.delete("/products/:id", (req, res, next) => {
  const productId = req.params.id;
  Product.findByIdAndRemove(productId)
    .then(() => {
      res.json();
    })
    .catch((err) => next(err));
});

//
router.post("/add-to-cart", (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId)
    .then((product) => {
      // decrement if avaliable
      if (product.quantity === 0) {
        product.error =
          "Out of inventory for selected product, cannot add to cart";
        return product;
      }
      return Product.findByIdAndUpdate(
        productId,
        {
          quantity: product.quantity - 1,
        },
        { new: true } // don't try to make sense of this
      );
    })
    .then((updatedProduct) => {
      CartItem.findOne({
        productId,
      })
        .then((item) => {
          if (updatedProduct.error) {
            return item;
          }
          if (!item) {
            return CartItem.create({
              title: updatedProduct.title,
              price: updatedProduct.price,
              quantity: 1,
              productId,
            });
          } else {
            return CartItem.findOneAndUpdate(
              { productId },
              {
                quantity: item.quantity + 1,
              },
              { new: true }
            );
          }
        })
        .then((item) => {
          const { error, ...product } = updatedProduct.toObject();
          res.json({ product, item });
        });
    });
});

router.post("/checkout", (req, res) => {
  CartItem.deleteMany({}).then(() => {
    res.json();
  });
});

router.get("/cart", (req, res, next) => {
  CartItem.find({})
    .then((cartItems) => {
      res.json(cartItems);
    })
    .catch(next);
});

module.exports = router;
