const db = require('./config/db'); // Asegúrate de que la ruta es correcta
const bcrypt = require('bcryptjs');

async function testUserInsertion() {
  try {
    const testUser = {
      name: 'UsuarioPrueba',
      lastname: 'ApellidoPrueba',
      email: 'prueba@test.com',
      password: '123456',
      phone: '1234567890'
    };

    // 1. Hash de la contraseña
    const hashedPassword = bcrypt.hashSync(testUser.password, 10);

    // 2. Llamar al procedimiento almacenado
    const result = await db.query('CALL nuevoUsuario(?, ?, ?, ?, ?)', [
      testUser.name,
      testUser.lastname,
      testUser.email,
      hashedPassword,
      testUser.phone
    ]);

    console.log('✅ Inserción exitosa. Resultado:', result);

    // 3. Verificar que el usuario se insertó
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [testUser.email]);
    console.log('Usuario insertado:', users[0]);

  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  } finally {
    // Cierra la conexión a la base de datos
    db.end();
  }
}

// Ejecutar la prueba
testUserInsertion();