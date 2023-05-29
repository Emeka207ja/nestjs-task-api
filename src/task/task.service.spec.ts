import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { AuthEntity } from 'src/auth/auth.entity';
import { filterDto } from './DTOs/filter.dto';
import { status } from './Enums/Status.Enums';
import { taskEntity } from './task.entity';
import { createTaskDto } from './DTOs/createTask.Dto';
import { NotFoundException } from '@nestjs/common';




 const mockRepository = () => ({
   getAllTask: jest.fn(),
   CreateTask: jest.fn(),
   findOneBy : jest.fn()
 })
  
const mockUser = new AuthEntity()

const mockTask: createTaskDto = {
  message: "some message",
  title: " some title",
  age: 8
}

const mockReturnedTask = new taskEntity()

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository:TaskRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        AuthEntity,
        {
          provide: TaskRepository,
          useFactory:mockRepository
        }
      ],
      
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get<TaskRepository>(TaskRepository)
  });

  describe("instantiation", () => {
    it("checks if task.service is defined", () => {
      expect(service).toBeDefined()
    })
  })

  describe("getTask", () => {
   
    it("gets all tasks from the repository", async () => {
      (taskRepository.getAllTask as jest.Mock).mockResolvedValue("someValue")

      expect(taskRepository.getAllTask).not.toHaveBeenCalled()
      

      const filters: filterDto = { status: status.IN_PROGRESS, search: "some value", age: "5" }
      
      //call taskRpository.getAllTask
      const result = await taskRepository.getAllTask(filters, mockUser)
      expect(taskRepository.getAllTask).toHaveBeenCalled()
      expect(result).toEqual("someValue")
   })
  })
  describe("CreateTask", () => {

    it("should check if taskRepository.CreateTask has been called", () => {
      expect(taskRepository.CreateTask).not.toHaveBeenCalled()
    })

    it("should check if teaskRepository.CreateTask has been called with right Args", async () => {

      await taskRepository.CreateTask(mockTask, mockUser)
      expect(taskRepository.CreateTask).toBeCalledWith(mockTask,mockUser)
    })

    it("should check if taskRepository.CreateTask returns a string", async () => {
      (taskRepository.CreateTask as jest.Mock).mockResolvedValue("someValue")

      const result = await taskRepository.CreateTask(mockTask, mockUser)

      expect(result).toEqual("someValue")
    })
  })

  describe("taskRepository.findOneBy", () => {
    it("should check if taskRepository.findOneBy has been called", () => {
      expect(taskRepository.findOneBy).not.toHaveBeenCalled()
    })

    it("should check if taskRepository.findOneBy has been called with relevant Args", async () => {
      
      await taskRepository.findOneBy({id:1})
      expect(taskRepository.findOneBy).toBeCalledWith({id:1})

    })

    it("should check if  taskRepository.findOneBy returns the right value", async () => {
      (taskRepository.findOneBy as jest.Mock).mockResolvedValue(mockReturnedTask)
      const result = await taskRepository.findOneBy({ id: 1 })
      expect(result).toEqual(mockReturnedTask)
    })

    it("should check if service.getTaskById returns NotFound error if id is not found", async () => {
      await expect(service.getTaskById(2)).rejects.toEqual(new NotFoundException())
    })
  })
});
