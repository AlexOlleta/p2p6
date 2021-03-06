var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.find(quizId).then(function(quiz){
		if(quiz){req.quiz = quiz; next();}
		else{ next(new Error('No existe quizId = ' + quizId));}
	}).catch(function(error){next(error);});
};

// GET /quizes
exports.index = function(req,res){
	module.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{quizes:quizes, errors: []});
	}).catch(function(error){next(error);});
};

//GET /quizes/question
exports.show = function(req,res){
	res.render('quizes/show',{quiz: req.quiz, errors: []});
};

//GET /quizes/answer
exports.answer = function(req,res){
	var resultado = 'Incorrecto';
	if(req.query.p1.replace(/r/,'R') === quiz.respuesta){resultado = 'Correcto';}
	res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, errors: []});
};

//GET /quizes/new
exports.new = function(reg,res){
	var quiz = models.Quiz.build({pregunta: 'Pregunta', respuesta: 'Respuesta', tema: 'Tema'});
	res.render('quizes/new', {quiz:quiz, errors: []});
};

//POST /quizes/create
exports.create = function(req,res){
	var quiz = models.Quiz.build(req.body.quiz);

	//guarda en DB los campos pregunta y respuesta de quiz
	quiz
	.validate().then(function(err){if (err){
		res.render('quizes/new', {quiz: quiz,error: err.errors});
	} else {
		quiz.save({fields: ["pregunta","respuesta","tema"]}).then(function(){
		res.redirect('/quizes');});
	}});
};

//PUT /quizes/update
exports.update=function(req,res){
	req.quiz.pregunta=req.body.quiz.pregunta;
	req.quiz.respuesta=req.body.quiz.respuesta;
	req.quiz.tema=req.body.quiz.tema;
	req.quiz.validate().then(function(err){if(err){
		res.render('quizes/edit',{quiz:req.quiz,errors:err.errors});
	}else{
		req.quiz.save({fields:["pregunta","respuesta","tema"]}).then(function(){
			res.redirect('/quizes');});
		}
	});
};

//DELETE /quizes/destroy
exports.destroy=function(req,res){
	req.quiz.destroy().then(function(){res.redirect('/quizes');
	}).catch(function(error){next(error)});
};

