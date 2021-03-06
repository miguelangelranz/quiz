// Autorización de accesos HTTP restringidos
// Simplemente revisa si el usuario está en sesión (ha pasado por login, ha
// sido autenticado y por consiguiente, tenemos req.session.user)
// Lo invocaremos en cualquier acceso restringido, y si no está en sesión,
// redirigirá al usuario a login.
// Como login vuelve a la página en la que estaba cuando fué llamado... tras
// autenticarse el usuario continuará la navegación allí donde estaba.
exports.loginRequired = function(req, res, next) {
   if (req.session.user) 
   {
      next();
   } 
   else 
   {
      res.redirect('/login');
   }
};

// Get /login   -- Formulario de login
exports.new = function(req, res) {
   var errors = req.session.errors || {};
   req.session.errors = {};

   res.render('sessions/new', {errors: errors});
};

// POST /login   -- Crear sesion
exports.create = function(req, res) {
   var login = req.body.login;
   var password = req.body.password;

   var userController = require('./user_controller');
   userController.autenticar(login, password, function(error, user) {
      // Si hay error retornamos mensajes de error de sesión
      if (error) {
         req.session.errors = [{"message": 'Se ha producido un error: '+error}];
         res.redirect("/login");        
         return;
      }

      // Crear req.session.user y guardar campos id y username
      // La sesión se define por la existencia de: req.session.user
      req.session.user = {id:user.id, username:user.username};
      // Redirección a path anterior a login
      res.redirect(req.session.redir.toString());
   });
};

// DELETE /logout   -- Destruir sesion 
exports.destroy = function(req, res) {
   delete req.session.user;
   res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};