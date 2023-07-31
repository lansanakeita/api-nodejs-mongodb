import Product from '../../models/product/product.model.js';
import get from 'lodash/get.js';
import isNull from 'lodash/isNull.js';
import isUndefined from 'lodash/isUndefined.js';

/**
 * Crée un nouveau produit.
 * @param {Object} req - L'objet de requête contenant les détails du produit.
 * @param {Object} res - L'objet de réponse.
 * @returns {Object} L'objet du produit créé si réussi, ou un objet d'erreur si échec.
 */
export async function createProduct(req, res) {
  try {
    const product = new Product(req.body);
    await product
      .save()
      .then((result) => {
        return res.status(201).json({
          message: 'product created successfully!',
          product: result,
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.toString() });
      });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}

/**
 * Récupère tous les produits.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @returns {Array} Un tableau de tous les produits, ou un objet d'erreur si échec.
 */
export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Met à jour un produit existant par ID.
 * @param {Object} req - L'objet de requête contenant l'ID du produit et les champs à mettre à jour.
 * @param {Object} res - L'objet de réponse.
 * @returns {Object} L'objet du produit mis à jour si réussi, ou un objet d'erreur si échec.
 */
export async function updateProduct(req, res) {
  const updatedInfo = Object.keys(req.body);
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (isNull(product) || isUndefined(product)) {
      return res.status(404).json({ error: 'product not found' });
    }

    updatedInfo.forEach((update) => (product[update] = req.body[update]));
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
}

/**
 * Supprime un produit par ID.
 * @param {Object} req - L'objet de requête contenant l'ID du produit.
 * @param {Object} res - L'objet de réponse.
 * @returns {Object} Un message de succès si réussi, ou un objet d'erreur si échec.
 */
export async function deleteProduct(req, res) {
  try {
    const id = get(req.params, 'id');
    const product = await Product.findByIdAndRemove(id);
    if (isNull(product) || isUndefined(product)) {
      return res.status(404).json({ error: 'product not found' });
    }
    return res.status(200).json({ message: 'product deleted' });
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
}

/**
 * Récupère un seul produit par ID.
 * @param {Object} req - L'objet de requête contenant l'ID du produit.
 * @param {Object} res - L'objet de réponse.
 * @returns {Object} L'objet du produit récupéré si trouvé, ou un objet d'erreur si échec.
 */
export async function getProduct(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (isNull(product) || isUndefined(product)) {
      return res.status(404).json({ error: 'product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
