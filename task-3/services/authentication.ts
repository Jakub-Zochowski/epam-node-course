import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import LoggingService from './logging';

const logger = new LoggingService('Authentication');


class AuthService {
  static generateAccessToken = (data: any) => {
    return jwt.sign(data, process.env.TOKEN_SECRET as string, {
      expiresIn: "1800s",
    });
  };

  static authenticateToken(req: any, res: any, next: any) {
    try {
			logger.serviceLogger('Authenticate Token', req.headers["authorization"]);
			const authHeader = req.headers["authorization"];
    	const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
				return res.sendStatus(StatusCodes.UNAUTHORIZED);
      }
      const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
      req.user = verified;
      next();
    } catch (err) {
			logger.serviceLogger('Invalid Token', 'Token is invalid');
      return res.sendStatus(StatusCodes.FORBIDDEN);
    }
  }
}

export { AuthService };
