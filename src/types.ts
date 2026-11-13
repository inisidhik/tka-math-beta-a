export type Role='teacher'|'student'|'tester';
export type QType='mcq'|'mcma'|'short'|'tf';
export type Option={id:string;text:string};
export type Stimulus={id:string;title:string;content:string;latex:string;imageDataUrl?:string;createdAt:number};
export type Question={id:string;number:number;subject:string;topic:string;type:QType;stimulusId?:string;stimulus?:string;text:string;options:Option[];answer:string[];explanation:string;points:number};
export type Account={id:string;username:string;password:string;name:string;role:'student'|'tester';className:string;active:boolean};
export type Attempt={id:string;username:string;examTitle:string;examId?:string;questionIds?:string[];startedAt:number;deadline:number;submittedAt?:number;answers:Record<string,string[]>;flagged:string[];score?:number;}

export type ExamPackage = {
 id: string;
 title: string;
 durationMinutes: number;
 questionIds: string[];
 assignedUsernames: string[];
 status: 'draft'|'published';
 createdAt: number;
};
