// 1. Trouver tous les documents dans la collection "employees"
db.employees.find({});

// 2. Trouver tous les documents où l'âge est supérieur à 33.
db.employees.find({ age: { $gt: 33 } });
