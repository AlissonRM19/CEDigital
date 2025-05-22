// CONEXIÓN CEDigital
use CEDigital;

// Colección estudiantes (M1)
db.createCollection("estudiantes", { validator: { $jsonSchema: { /* ... */ } } });

// Colección profesores (M2)
db.createCollection("profesores", { validator: { $jsonSchema: { /* ... */ } } });
