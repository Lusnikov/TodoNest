import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, UnauthorizedException, } from '@nestjs/common';

const CUSTOM_ERRORS = {
    1: {
        title: 'Вы ввели некорректные данные',
        details: 'Детали ошибки'
    },
    2: {
        title: 'Вы ввели некорректные данные',
        details: 'Детали ошибки'
    }
}


@Catch()
export class ErrorFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status =
          exception instanceof HttpException
            ? exception.getStatus()
            :  HttpStatus.INTERNAL_SERVER_ERROR;
      
        const message =
          exception instanceof HttpException
            ?  exception.getResponse() 
            : { message: 'Internal server error' };
        
        if (typeof message === 'object' && 'code' in message) {
            const code = typeof message.code === 'number' ? message.code : undefined
            console.log(CUSTOM_ERRORS[code])
            message['message'] = CUSTOM_ERRORS[code] ?? 'Неизвестная  ошибка'
        } 

        response.status(status).json(message);
       
      }
}
