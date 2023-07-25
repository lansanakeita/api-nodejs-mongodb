import Order from '../../models/order/orderModel.js';
import get from 'lodash/get.js';
import isNull from 'lodash/isNull.js';
import isUndefined from 'lodash/isUndefined.js';

/**
 * création d'une commande
 */
export async function createOrder(req, res) {
  try {
    const order = new Order(req.body);
    await order
      .save()
      .then((result) => {
        return res.status(201).json({
          message: 'order created successfully!',
          order: result,
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
 * récupération de l'ensemble des commandes
 */
export async function getOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

/**
 * Récupérer une seule commande
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
    res.status(500).json({ error: error.toString() });
  }
}

/**  *
 * Mettre à jour un produit
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
    res.status(400).json({ error: error.toString() });
  }
}

/**
 * Suppression d'une commande
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
    return res.status(400).json({ error: error.toString() });
  }
}
