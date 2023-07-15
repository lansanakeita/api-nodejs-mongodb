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

// 7. Affichez la ville des salles dont le code postal commence par 84 et qui ont une capacité strictement inférieure à 500 places (pensez à utiliser une expression régulière).
db.salles.find(
  { 'adresse.codePostal': { $regex: '^84' }, capacite: { $lt: 500 } },
  { _id: 0, 'adresse.ville': 1 }
);

// 8. Affichez l’identifiant pour les salles dont l’identifiant est pair ou le champ avis est absent.
db.salles.find(
  { $or: [{ _id: { $mod: [2, 0] } }, { avis: { $exists: false } }] },
  { _id: 1 }
);

// 9. Affichez le nom des salles dont au moins un des avis comporte une note comprise entre 8 et 10 (tous deux inclus).
db.salles.find(
  { avis: { $elemMatch: { note: { $gte: 8, $lte: 10 } } } },
  { _id: 0, nom: 1 }
);

// 10. Affichez le nom des salles dont au moins un des avis comporte une date postérieure au 15/11/2019 (pensez à utiliser le type JavaScript Date).
db.salles.find(
  { avis: { $elemMatch: { date: { $gt: new Date('2019-11-15') } } } },
  { _id: 0, nom: 1 }
);

// 11. Affichez le nom ainsi que la capacité des salles dont le produit de la valeur de l’identifiant par 100 est strictement supérieur à la capacité.
db.salles.find(
  { $expr: { $gt: [{ $multiply: ['$_id', 100] }, '$capacite'] } },
  { _id: 0, nom: 1, capacite: 1 }
);

// 12. Affichez le nom des salles de type SMAC programmant plus de deux styles de musiques différents en utilisant l’opérateur $where qui permet de faire usage de JavaScript.
db.salles.find(
  {
    $where: function () {
      return this.smac === true && this.styles && this.styles.length > 2;
    },
  },
  { _id: 0, nom: 1 }
);

// 13. Affichez les différents codes postaux présents dans les documents de la collection salles.
db.salles.distinct('adresse.codePostal');
