import { inject, injectable } from 'inversify';
import { IAssessmentRepository } from '../../../contracts';
import { Assessment, IUseCase } from '../../../../types';

@injectable()
export class GetAssessmentListUseCase implements IUseCase<void, Assessment[]> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(): Promise<Assessment[]> {
    // TODO: Implement the assessment list retrieval logic
    // HINT: Use this.assessmentRepository.findAll(params) to get the assessments
    // Update: don't need to pass params in .findAll() as it returns everything in the repo
    const returnData = await this.assessmentRepository.findAll();
    console.log(`AnyReturnedData`, returnData);
    return returnData;
  }
}
