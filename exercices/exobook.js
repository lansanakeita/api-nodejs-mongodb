// 1. Trouver tous les documents dans la collection "employees"
db.employees.find({});

// 2. Trouver tous les documents où l'âge est supérieur à 33.
db.employees.find({ age: { $gt: 33 } });

// 3. Trier les documents dans la collection "employees" par salaire décroissant.
db.employees.find({}).sort({ salary: -1 });
