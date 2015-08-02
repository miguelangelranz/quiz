var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, 
                              null, 
                              null, 
                              {dialect: "sqlite", 
                               storage: "quiz.sqlite"}
                    );

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Exportar definición de tabla Quiz
exports.Quiz = Quiz;

// Arranque de la BBDD
sequelize.sync().then(function() {
   //Si la tabla Quiz está vacía, la inicializaremos.
   Quiz.count().then(function (count){
      if(count === 0) {
         Quiz.create({ pregunta: 'Capital de Italia',
      	               respuesta: 'Roma'
      	             })
      .then(function(){console.log('Base de datos inicializada')});
      };
   });
});