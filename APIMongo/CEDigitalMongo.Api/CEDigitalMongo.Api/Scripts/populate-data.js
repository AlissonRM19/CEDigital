// Scripts/populate-data.js
// Se ejecuta con: mongo <populate-data.js>

use CEDigital;

// ——— Inserción de ESTUDIANTES ———
db.estudiantes.insertMany([
    {
        carnet: "2022057940",
        cedula: "3-0567-0975",
        nombre: "Joseph Piedra Montero",
        correo: "jose.piedra@estudiantec.cr",
        telefono: "506-8888-0001",
        password: "5f4dcc3b5aa765d61d8327deb882cf99" // MD5("password")
    },
    {
        carnet: "2022057941",
        cedula: "1-1234-5679",
        nombre: "María González Pérez",
        correo: "maria.gonzalez@estudiantec.cr",
        telefono: "506-8888-0002",
        password: "202cb962ac59075b964b07152d234b70" // MD5("123")
    },
    {
        carnet: "2022057942",
        cedula: "1-1234-5680",
        nombre: "Carlos Vargas Hernández",
        correo: "carlos.vargas@estudiantec.cr",
        telefono: "506-8888-0003",
        password: "098f6bcd4621d373cade4e832627b4f6" // MD5("test")
    },
    {
        carnet: "2022057943",
        cedula: "1-1234-5681",
        nombre: "Ana López Quesada",
        correo: "ana.lopez@estudiantec.cr",
        telefono: "506-8888-0004",
        password: "5ebe2294ecd0e0f08eab7690d2a6ee69" // MD5("secret")
    },
    {
        carnet: "2022057944",
        cedula: "1-1234-5682",
        nombre: "Luis Ramírez Soto",
        correo: "luis.ramirez@estudiantec.cr",
        telefono: "506-8888-0005",
        password: "6cb75f652a9b52798eb6cf2201057c73" // MD5("password1")
    },
    {
        carnet: "2022057945",
        cedula: "1-1234-5683",
        nombre: "María Fernández Mora",
        correo: "maria.fernandez@estudiantec.cr",
        telefono: "506-8888-0006",
        password: "d8578edf8458ce06fbc5bb76a58c5ca4" // MD5("qwerty")
    },
    {
        carnet: "2022057946",
        cedula: "1-1234-5684",
        nombre: "Juan Camacho Salazar",
        correo: "juan.camacho@estudiantec.cr",
        telefono: "506-8888-0007",
        password: "5f4dcc3b5aa765d61d8327deb882cf99" // MD5("password")
    },
    {
        carnet: "2022057947",
        cedula: "1-1234-5685",
        nombre: "Laura Méndez Castro",
        correo: "laura.mendez@estudiantec.cr",
        telefono: "506-8888-0008",
        password: "098f6bcd4621d373cade4e832627b4f6" // MD5("test")
    }
]);

// ——— Inserción de PROFESORES ———
db.profesores.insertMany([
    {
        cedula: "1-2345-6789",
        nombre: "Ricardo Chacón Villalobos",
        correo: "ricardo.chacon@tec.ac.cr",
        password: "5f4dcc3b5aa765d61d8327deb882cf99" // MD5("password")
    },
    {
        cedula: "1-2345-6790",
        nombre: "Sofía Salazar Herrera",
        correo: "sofia.salazar@tec.ac.cr",
        password: "202cb962ac59075b964b07152d234b70" // MD5("123")
    },
    {
        cedula: "1-2345-6791",
        nombre: "Mónica Castro Quesada",
        correo: "monica.castro@tec.ac.cr",
        password: "6cb75f652a9b52798eb6cf2201057c73" // MD5("password1")
    },
    {
        cedula: "1-2345-6792",
        nombre: "Fernando Gómez Ramírez",
        correo: "fernando.gomez@tec.ac.cr",
        password: "d8578edf8458ce06fbc5bb76a58c5ca4" // MD5("qwerty")
    },
    {
        cedula: "1-2345-6793",
        nombre: "Patricia Vargas Mora",
        correo: "patricia.vargas@tec.ac.cr",
        password: "5ebe2294ecd0e0f08eab7690d2a6ee69" // MD5("secret")
    }
]);

// ——— Inserción de ADMINISTRADORES ———
if (!db.getCollectionNames().includes("admins")) {
    db.createCollection("admins");
}
db.admins.insertOne({
    username: "admin",
    correo: "admin@tec.ac.cr",
    password: "5f4dcc3b5aa765d61d8327deb882cf99", // MD5("password")
    role: "superadmin"
});

print("Población inicial ampliada completada: 8 estudiantes, 5 profesores y admin.");
