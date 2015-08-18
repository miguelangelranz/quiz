var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(
                        null, 
                        null, 
                        null, 
                        {  dialect: "sqlite", 
                           storage: "quiz.sqlite"
                        }
                    );

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

// Relacion entre ambas tablas
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Exportar definición de las tablas Quiz y Comment
exports.Quiz = Quiz;
exports.Comment = Comment;

// Arranque de la BBDD
sequelize.sync().then(function() {
   //Si la tabla Quiz está vacía, la inicializaremos.
   Quiz.count().then(function (count){
      if(count === 0) {
         Quiz.create({pregunta: 'Capital de Italia',
      	             respuesta: 'Roma',
      	             tema: 'Otro'
      	            });
      	Quiz.create({pregunta: 'Capital de Portugal',
      	             respuesta: 'Lisboa',
      	             tema: 'Otro'
      	            })
      .then(function(){console.log('Base de datos inicializada')});
      };
   });
});