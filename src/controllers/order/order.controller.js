import Order from '../../models/order/order.model.js';
import Product from '../../models/product/product.model.js';
import get from 'lodash/get.js';
import isNull from 'lodash/isNull.js';
import isUndefined from 'lodash/isUndefined.js';

/**
 * Crée une nouvelle commande.
 * @param {Object} req - L'objet de requête contenant les détails de la commande.
 * @param {Object} res - L'objet de réponse.
 * @returns {Object} L'objet de commande créé si réussi, ou un objet d'erreur si échec.
 */
export async function createOrder(req, res) {
  try {
    const order = new Order(req.body);

    if (!Array.isArray(req.body.products)) {
      return res.status(400).json({
        error: "Invalid 'products' format. It should be an array of objects.",
      });
    }

    for (const item of req.body.products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with ID ${item.productId} not found.` });
      }

      if (item.quantity > product.quantity) {
        return res.status(400).json({
          error: `Ordered quantity exceeds available quantity for product with ID ${item.productId}.`,
        });
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    const savedOrder = await order.save();

    return res.status(201).json({
      message: 'Order created successfully!',
      order: savedOrder,
    });
  } catch (error) {
    logger.error(`Error creating order: ${error}`);
    return res.status(500).json({ error: error.toString() });
  }
}

/**
 * Récupère toutes les commandes.
 * @param {Object} req - L'objet de requête.
 * @param {Object} res - L'objet de réponse.
 * @returns {Array} Un tableau de toutes les commandes, ou un objet d'erreur si échec.
 */
export async function getOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    logger.error(`Error fetching orders: ${error}`);
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Récupère une seule commande par ID.
 * @param {Object} req - L'objet de requête contenant l'ID de la commande.
 * @param {Object} res - L'objet de réponse.
 * @returns {Object} L'objet de commande récupéré si trouvé, ou un objet d'erreur si échec.
 */
export async function getOrder(req, res) {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (isNull(order) || isUndefined(order)) {
      return res.status(404).json({ error: 'order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    logger.error(`Error fetching order with ID ${id}: ${error}`);
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Met à jour une commande existante par ID.
 * @param {Object} req - L'objet de requête contenant l'ID de la commande et les champs à mettre à jour.
 * @param {Object} res - L'objet de réponse.
 * @returns {Object} L'objet de commande mis à jour si réussi, ou un objet d'erreur si échec.
 */
export async function updateOrder(req, res) {
  const updatedInfo = Object.keys(req.body);
  const id = req.params.id;

  try {
    const order = await Order.findById(id);
    if (isNull(order) || isUndefined(order)) {
      return res.status(404).json({ error: 'order not found' });
    }

    updatedInfo.forEach((update) => (order[update] = req.body[update]));
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    logger.error(`Error updating order with ID ${id}: ${error}`);
    res.status(400).json({ error: error.toString() });
  }
}

/**
 * Supprime une commande par ID.
 * @param {Object} req - L'objet de requête contenant l'ID de la commande.
 * @param {Object} res - L'objet de réponse.
 * @returns {Object} Un message de succès si réussi, ou un objet d'erreur si échec.
 */
export async function deleteOrder(req, res) {
  try {
    const id = get(req.params, 'id');
    const order = await Order.findByIdAndRemove(id);
    if (isNull(order) || isUndefined(order)) {
      return res.status(404).json({ error: 'order not found' });
    }
    return res.status(200).json({ message: 'order deleted' });
  } catch (error) {
    logger.error(`Error deleting order with ID ${id}: ${error}`);
    return res.status(400).json({ error: error.toString() });
  }
}
