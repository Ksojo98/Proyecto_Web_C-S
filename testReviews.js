const db = require('./config/db'); // Asegúrate que la ruta es correcta

async function insertSingleReview() {
  try {
    // Datos del review a insertar
    const reviewData = {
      user_id: 1,       
      comment: "Excelente pagina, la recomiendo",
      rating: 5
    };

    // Insertar el review
    const [result] = await db.query(
      'INSERT INTO Reviews (user_id, comment, rating) VALUES (?, ?, ?)',
      [reviewData.user_id, reviewData.comment, reviewData.rating]
    );

    console.log(`✅ Review insertado correctamente con ID: ${result.insertId}`);

  } catch (error) {
    console.error('❌ Error al insertar el review:', error);
  } finally {
    // Cierra la conexión a la base de datos
    db.end();
  }
}

// Ejecutar la función
insertSingleReview();