import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export default class ErroFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): void;
}
