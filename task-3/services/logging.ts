import { StatusCodes } from "http-status-codes";

class LoggingService {
	static logger = (method: string, ...args: any[]) => {
		console.log(`${method} - Arguments: ${JSON.stringify(args)}`);
	};

	static unhandledExceptionLogger = (req: any, res: any, next: any) => {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		res.end('Oops, something went wrong.')
	}
}



export default LoggingService;