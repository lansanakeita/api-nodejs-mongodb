// 1. Trouver tous les documents dans la collection "employees"
db.employees.find({});

// 2. Trouver tous les documents où l'âge est supérieur à 33.
db.employees.find({ age: { $gt: 33 } });

// 3. Trier les documents dans la collection "employees" par salaire décroissant.
db.employees.find({}).sort({ salary: -1 });

// 4. Sélectionner uniquement le nom et le job de chaque document.
db.employees.find({}, { name: 1, job: 1, _id: 0 });

// 5. Compter le nombre d'employés par poste.
db.employees.aggregate([{ $group: { _id: '$job', count: { $sum: 1 } } }]);
