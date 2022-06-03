import { Test, TestingModule } from '@nestjs/testing';
import { PictureBedService } from './pictureBed.service';

describe('PictureBedService', () => {
  let service: PictureBedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PictureBedService],
    }).compile();

    service = module.get<PictureBedService>(PictureBedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
