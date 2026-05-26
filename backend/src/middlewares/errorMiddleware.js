module.exports = (err, req, res, next) => {
  console.error('🔥 Erro Capturado pelo Middleware:', err.stack || err.message || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ocorreu um erro interno no servidor.';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};
