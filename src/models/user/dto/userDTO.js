import get from 'lodash/get.js';

/**
 * Transforme un objet utilisateur en un objet de transfert de données (DTO).
 *
 * @param {Object} user - L'objet utilisateur qui doit être transformé.
 * @param {string} user._id - L'identifiant unique de l'utilisateur.
 * @param {string} user.userName - Le nom d'utilisateur.
 * @param {string} user.firstName - Le prénom de l'utilisateur.
 * @param {string} user.lastName - Le nom de famille de l'utilisateur.
 * @param {string} user.email - L'adresse e-mail de l'utilisateur.
 * @param {string} user.arrivedAt - La date et l'heure d'arrivée de l'utilisateur.
 *
 * @returns {Object} Retourne un DTO utilisateur contenant id, userName, firstName, lastName, email et arrivedAt.
 */
export function userDTO(user) {
  const id = get(user, '_id');
  const userName = get(user, 'userName');
  const firstName = get(user, 'firstName');
  const lastName = get(user, 'lastName');
  const email = get(user, 'email');
  const arrivedAt = get(user, 'arrivedAt');
  return { id, userName, firstName, lastName, email, arrivedAt };
}
