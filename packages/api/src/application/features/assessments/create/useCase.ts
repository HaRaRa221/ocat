import { inject, injectable } from 'inversify';
import { IUseCase } from 'src/types/shared';
import { Assessment, CreateAssessmentDTO } from 'src/types';
import { IAssessmentRepository } from '../../../contracts';

@injectable()
export class CreateAssessmentUseCase implements IUseCase<CreateAssessmentDTO, Assessment> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(assessmentData: CreateAssessmentDTO): Promise<Assessment> {
    // TODO: Implement business validation logic here
    // HINT: Validate that the score is between 0 and 5
    if (assessmentData.score < 0 || assessmentData.score > 5) {
      throw new Error(`Score must be between 0 and 5`);
    }
    // HINT: Validate that the risk level matches the score calculation
    const expectedRiskLevel = this.calculateRiskLevel(assessmentData.score);
    if (assessmentData.riskLevel !== expectedRiskLevel) {
      throw new Error(`Risk level does not match the score. Expected: ${expectedRiskLevel}`);
    }
    // TODO: Create the assessment using the repository
    await this.assessmentRepository.create(assessmentData);
    return Promise.reject(new Error(`CreateAssessmentUseCase.execute() not implemented yet`));
  }

  // TODO: Add private helper methods for validation and risk level calculation
  private calculateRiskLevel(score: number): string {
    if (score >= 4) {
      return `Low`;
    }
    if (score >= 2) {
      return `Medium`;
    }
    return `High`;
  }
}
