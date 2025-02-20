import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() task: { title: string; description: string }) {
    return this.taskService.createTask(task);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() task: { title: string; description: string }) {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
