const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).send({ message: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req.user = decoded.userId;
      next();
    } catch (error) {
      res.status(401).send({ message: 'Token is not valid' });
    }
  };
  