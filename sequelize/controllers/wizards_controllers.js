const { wizards } = require("../models/index.js");

exports.createWizard = (req, res) => {
  // Validação do request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!",
  //   });
  //   return;
  // }
  // Criar o usuário
  const wizard = {
    id: req.body.id,
    name: req.body.name,
    knowHow: req.body.knowHow ? req.body.knowHow : false,
    corporeal_id: req.body.createdAt ? req.body.createdAt : null,
    createdAt: req.body.createdAt ? req.body.createdAt : null
  };
  // Salvar usuário no database
  wizards
    .create(wizard)
    .then((data) => {
      res.send(data);
      console.log("Enviado")
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao criar o usuário.",
      });
    });
};

exports.findAll = (req, res) => {
  wizards 
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao trazer os dados.",
      });
    });
};
