import isEmpty from 'lodash/isEmpty.js';
import jwt from 'jsonwebtoken';

export async function authorize(req, res, next) {
  try {
    // on récupère le token du header d'autorisation
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (isEmpty(token)) {
      return res
        .status(403)
        .send({ auth: false, message: 'No token provided.' });
    }

    // On vérifie le token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res
            .status(401)
            .send({ auth: false, message: 'Token has expired.' });
        } else {
          // Pour toutes les autres erreurs JWT, on lance une erreur générique
          throw new Error('Failed to authenticate token.');
        }
      }

      // Si le token est valide, on passe à la requête suivante
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.error('Error in authorization:', err.message);

    return res.status(500).send({
      auth: false,
      message: 'An error occurred during authorization. Please try again.',
    });
  }
}
