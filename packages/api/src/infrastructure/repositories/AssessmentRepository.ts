import { IAssessmentRepository } from '../../application/contracts';
import { Assessment as AssessmentType, CreateAssessmentDTO } from '../../types';
import { Assessment } from '../sequelize/models';

export class AssessmentRepository implements IAssessmentRepository {
  public async create(assessmentData: CreateAssessmentDTO): Promise<AssessmentType> {
    // TODO: Implement Create

    const created = await Assessment.create(assessmentData);
    return created.get({ plain: true }) as AssessmentType;
  }

  public async findAll(): Promise<AssessmentType[]> {
    // TODO: Implement Find All
    const assessments = await Assessment.findAll();
    return assessments.map((a) => a.get({ plain: true }) as AssessmentType);
  }

  public async delete(id: number): Promise<boolean> {
    return Promise.reject(new Error(`Not implemented`));
  }
}
