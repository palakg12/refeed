import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getAllTasks() {
    return this.taskModel.find();
  }

  async createTask(task: Partial<Task>) {
    return new this.taskModel(task).save();
  }

  async updateTask(id: string, task: Partial<Task>) {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }

  async deleteTask(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
