interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string;
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBasic extends CoursePartBaseWithDesc {
  kind: "basic";
}

export interface CoursePartBackground extends CoursePartBaseWithDesc {
  backgroundMaterial: string;
  kind: "background";
}

export interface CourseWithPrereq extends CoursePartBaseWithDesc {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CourseWithPrereq;

export interface CoursePayload extends CoursePartBaseWithDesc {
  backgroundMaterial: string;
  requirements: string[];
  groupProjectCount: number;
}
