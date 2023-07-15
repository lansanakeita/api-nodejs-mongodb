// 1. Affichez l’identifiant et le nom des salles qui sont des SMAC.
db.salles.find({ smac: true }, { _id: 1, nom: 1 });

// 2. Affichez le nom des salles qui possèdent une capacité d’accueil strictement supérieure à 1000 places.
db.salles.find({ capacite: { $gt: 1000 } }, { _id: 0, nom: 1 });

// 3. Affichez l’identifiant des salles pour lesquelles le champ adresse ne comporte pas de numéro.
db.salles.find({ 'adresse.numero': { $exists: false } }, { _id: 1 });
