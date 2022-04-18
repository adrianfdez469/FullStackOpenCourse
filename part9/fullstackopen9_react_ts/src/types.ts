interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface IDescriptible extends CoursePartBase {
  description: string
}

export interface CourseNormalPart extends IDescriptible {
  type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends IDescriptible {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends IDescriptible {
  type: "special"
  requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
