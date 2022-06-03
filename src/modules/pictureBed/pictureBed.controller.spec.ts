import { Test, TestingModule } from '@nestjs/testing';
import { PictureBedController } from './pictureBed.controller';

describe('PictureBedController', () => {
  let controller: PictureBedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PictureBedController],
    }).compile();

    controller = module.get<PictureBedController>(PictureBedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
