import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

import { TaskService } from './services/task.service';
import { TaskDto, TasksValidator, TaskValidatorForUpdate, TittleValidator, UuidValidator } from './dto/task.validation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}


    @Post()
    @HttpCode(HttpStatus.CREATED)
    // --- DECORATORS DE DOCUMENTAÇÃO PARA ESTA ROTA --- \\
    @ApiOperation({summary: 'Criar uma nova Task/Tarefa'})
    @ApiBody({description: 'Dados recebidos para ciração de uma nova task', type: TaskDto})
    
    @ApiResponse({status: 201, description: 'Task criada com sucesso.'})
    @ApiResponse({status: 409, description: 'Task já existe.'})
    @ApiResponse({status: 400, description: 'Usuário informado não encontrado.'})
    @ApiResponse({status: 500, description: 'Erro ao criar Task'})
    @ApiResponse({status: 500, description: 'Erro inesperado ao criar Task.'})
    @ApiResponse({status: 401, description: 'Não autorizado. Token inválido ou expirado.' })
    // --- FIM DOS DECORATORS PARA DOCUMENTAÇÃO DESTA ROTA --- \\
    async createTasks(@Body() task: TaskDto, @Req() request: Request){
        
        const usr = request.user['sub'];

        const res = await this.taskService.createTask(task, usr);

        return {message: "Task criada com sucesso. \n\n", res }

    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    // --- DECORATORS DE DOCUMENTAÇÃO PARA ESTA ROTA --- \\
    @ApiOperation({summary: "Buscar uma task por ID."})
    @ApiResponse({status: 404, description: 'Task não encontrada.'})
    @ApiResponse({status: 500, description: 'Falha ao comunicar com o servidor'})
    @ApiResponse({status: 500, description: 'Erro inesperado ao realizar busca por Task.'})
    @ApiResponse({status: 401, description: 'Não autorizado. Token inválido ou expirado.' })
    @ApiResponse({status: 403, description: 'Acesso negado. A tarefa não pertence ao usuário.' })
    // --- FIM DOS DECORATORS PARA DOCUMENTAÇÃO DESTA ROTA --- \\
    async findTask(@Param() identification: UuidValidator, @Req() request: Request){
        
        const usr = request.user['sub'];
        const { id } = identification;

        return await this.taskService.findOneTask(id, usr);
    }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    // --- DECORATORS DE DOCUMENTAÇÃO PARA ESTA ROTA --- \\
    @ApiOperation({summary: "Retorna todas as tasks de um usuário."})
    @ApiResponse({status: 404, description: 'Nenhuma task encontrada!'})
    @ApiResponse({status: 500, description: 'Um erro ocorreu ao buscar tasks.'})
    @ApiResponse({status: 500, description: 'Um erro inesperado ocorreu ao buscar tasks.'})
    @ApiResponse({status: 401, description: 'Não autorizado. Token inválido ou expirado.' })
    @ApiResponse({status: 403, description: 'Acesso negado. A tarefa não pertence ao usuário.' })
    // --- FIM DOS DECORATORS PARA DOCUMENTAÇÃO DESTA ROTA --- \\
    async findAll(@Query() tasks: TasksValidator, @Req() resquest: Request){

        const usr = resquest.user['sub'];
        const {tittle, status} = tasks

        const find = await this.taskService.findMany(tittle, status, usr)

        return {message: "Tasks encontradas: \n", find}
    }

    @Put(':identificator')
    // --- DECORATORS DE DOCUMENTAÇÃO PARA ESTA ROTA --- \\
    @ApiOperation({summary: "Atualiza determinada task."})
    @ApiResponse({status: 404, description: 'Task não encontrada.'})
    @ApiResponse({status: 409, description: 'Task já existe.'})
    @ApiResponse({status: 400, description: 'Usuário informado não encontrado.'})
    @ApiResponse({status: 500, description: 'Falha ao comunicar com o servidor.'})
    @ApiResponse({status: 500, description: 'Erro inesperado ao realizar busca por Task.'})
    @ApiResponse({status: 401, description: 'Não autorizado. Token inválido ou expirado.' })
    @ApiResponse({status: 403, description: 'Acesso negado. A tarefa não pertence ao usuário.' })
    // --- FIM DOS DECORATORS PARA DOCUMENTAÇÃO DESTA ROTA --- \\
    @HttpCode(HttpStatus.OK)
    async updateTask(@Param() identificator: UuidValidator, @Body() task: TaskValidatorForUpdate, @Req() request: Request){

        const usr = request.user['sub'];

        const { id } = identificator;

        const att = await this.taskService.updateTask(id, task, usr);

        return {message: "Atualizações realizadas com sucesso!\n\n", att}
    }

    @Delete(':identificator')
    @HttpCode(HttpStatus.OK)
    // --- DECORATORS DE DOCUMENTAÇÃO PARA ESTA ROTA --- \\
    @ApiOperation({summary: "Deleta determinada task, pelo id + userId."})
    @ApiResponse({status: 404, description: 'Task não encontrada.'})
    @ApiResponse({status: 400, description: 'Usuário informado não encontrado.'})
    @ApiResponse({status: 500, description: 'Falha ao comunicar com o servidor.'})
    @ApiResponse({status: 500, description: 'Erro inesperado ao realizar busca por Task.'})
    @ApiResponse({status: 401, description: 'Não autorizado. Token inválido ou expirado.' })
    @ApiResponse({status: 403, description: 'Acesso negado. A tarefa não pertence ao usuário.' })
    // --- FIM DOS DECORATORS PARA DOCUMENTAÇÃO DESTA ROTA --- \\
    async deleteTasks(@Param() identification: UuidValidator, @Req() request: Request){

        const usr = request.user['sub'];

        const { id } = identification;
        
        const del = await this.taskService.deleteTask(id, usr);

        return {message: "Task deletada com sucesso.\n\n", del};
    }

}
