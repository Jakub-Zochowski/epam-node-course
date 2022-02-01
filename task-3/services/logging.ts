class LoggingService {
  scope: string;

  constructor(scope: string) {
    this.scope = scope;
  }

  routeLogger = (req: any, res: any, next: any) => {
    console.log(
      `[${this.scope}] - route: ${req.originalUrl}, params: ${JSON.stringify(
        req.params
      )}, body: ${JSON.stringify(req.body)}`
    );
    next();
  };

  serviceLogger = (method: string, ...args: any[]) => {
    console.log(
      `[${this.scope}] - method: ${method}, arguments: ${JSON.stringify(args)}`
    );
  };

  unhandledExceptionLogger = (req: any, res: any, next: any) => {
    console.log(`[${this.scope}], Something went wrong`);
  };
}

export default LoggingService;
