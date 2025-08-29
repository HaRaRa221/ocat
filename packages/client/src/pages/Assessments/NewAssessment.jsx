import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const { formState: { errors }, handleSubmit, register } = useForm();

  const [ score, setScore ] = useState(0);

  const calScore = (values) => {
    let score = 0;
    if (values.question1 === `Yes`) {
      score += 1;
    }
    if (values.question2 === `3+ altercations`) {
      score += 1;
    }
    if (values.question3 === `10+ altercations`) {
      score += 1;
    }
    if (values.question4 === `No`) {
      score += 1;
    }
    if (values.question5 === `Yes`) {
      score += 1;
    }
    return score;
  };
  function getRiskLevel(riskScore) {
    if (riskScore === 4 || riskScore === 5) {
      return `high`;
    }
    if (riskScore === 2 || riskScore === 3) {
      return `medium`;
    }
    return `low`;
  };
  const onSubmit = async (data) => {
    data.instrumentType = `Cat`;
    data.score = calScore(data); // Calculate score using submitted data
    data.riskLevel = getRiskLevel(data.score);

    // setScore(calculatedScore);
    // const payload = { ...data, score: calculatedScore }; // Optionally include score in the payload

    // await AssessmentService.submit(payload);
    // alert(`Assessment submitted! Total Score: ${calculatedScore}`);

    const allowedKey = [
      `catDateOfBirth`,
      `catName`,
      `instrumentType`,
      `riskLevel`,
      `score`,
    ];

    const filtered = Object.fromEntries(
      Object.entries(data).filter(([ key ]) => allowedKey.includes(key)),
    );
    console.log(`after filter`, data);
    await AssessmentService.submit(filtered);
  };

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <h3>Cat Behavioral Instruments</h3>
    <div>
      <label>
        Cat Name:
        <input {...register(`catName`, { required: true })} placeholder="Cat Name" />
      </label>
      {errors.catName && <span>This field is required</span>}
    </div>
    <div>
      <label>
        Date of Birth (mm/dd/yyyy):
        <input
          {...register(`catDateOfBirth`, { required: true })}
          type="date"
          placeholder="Date of Birth (mm/dd/yyyy)"
        />
      </label>
      {errors.dateOfBirth && <span>{errors.dateOfBirth.message || `This field is required`}</span>}
    </div>
    <div>
      <label>
        1. Previous contact with the Cat Judicial System:
        <select {...register(`question1`, { required: true })}>
          <option value="">Select...</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>
      {errors.question1 && <span>This field is required</span>}
    </div>
    <div>
      <label>
        2. Physical altercations with other cats:
        <select {...register(`question2`, { required: true })}>
          <option value="">Select...</option>
          <option value="0-3 altercations">0-3 altercations</option>
          <option value="3+ altercations">3+ altercations</option>
        </select>
      </label>
      {errors.question2 && <span>This field is required</span>}
    </div>
    <div>
      <label>
        3. Physical altercations with owner (scratching, biting, etc...):
        <select {...register(`question3`, { required: true })}>
          <option value="">Select...</option>
          <option value="0-10 altercations">0-10 altercations</option>
          <option value="10+ altercations">10+ altercations</option>
        </select>
      </label>
      {errors.question3 && <span>This field is required</span>}
    </div>
    <div>
      <label>
        4. Plays well with dogs:
        <select {...register(`question4`, { required: true })}>
          <option value="">Select...</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>
      {errors.question4 && <span>This field is required</span>}
    </div>
    <div>
      <label>
        5. Hisses at strangers:
        <select {...register(`question5`, { required: true })}>
          <option value="">Select...</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>
      {errors.question5 && <span>This field is required</span>}
    </div>
    <Button variant="primary" type="submit">Submit</Button>
    {score}
  </Form>;
};
