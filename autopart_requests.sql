-- SQL script to create the autopart_requests table in PostgreSQL
CREATE TABLE autopart_requests (
    id SERIAL PRIMARY KEY,
    nombre_apellido VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    numero_parte VARCHAR(100),
    marca VARCHAR(100),
    modelo VARCHAR(100),
    anio VARCHAR(10),
    placa VARCHAR(50),
    vin VARCHAR(50),
    imagen_url TEXT,
    correo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
