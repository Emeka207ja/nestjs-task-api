import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { AuthEntity } from 'src/auth/auth.entity';
import { filterDto } from './DTOs/filter.dto';
import { status } from './Enums/Status.Enums';
import { taskEntity } from './task.entity';




 const mockRepository = () => ({
    getAllTask:jest.fn()
 })
  
const mockUser= new AuthEntity()

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
});
