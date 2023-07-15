// 1. Affichez l’identifiant et le nom des salles qui sont des SMAC.
db.salles.find({ smac: true }, { _id: 1, nom: 1 });

// 2. Affichez le nom des salles qui possèdent une capacité d’accueil strictement supérieure à 1000 places.
db.salles.find({ capacite: { $gt: 1000 } }, { _id: 0, nom: 1 });

// 3. Affichez l’identifiant des salles pour lesquelles le champ adresse ne comporte pas de numéro.
db.salles.find({ 'adresse.numero': { $exists: false } }, { _id: 1 });

// 4. Affichez l’identifiant puis le nom des salles qui ont exactement un avis.
db.salles.find({ avis: { $size: 1 } }, { _id: 1, nom: 1 });

// 5. Affichez tous les styles musicaux des salles qui programment notamment du blues.
db.salles.find({ styles: { $in: ['blues'] } }, { _id: 0, styles: 1 });

// 6. Affichez tous les styles musicaux des salles qui ont le style « blues » en première position dans leur tableau styles.
db.salles.find({ 'styles.0': 'blues' }, { _id: 0, styles: 1 });
