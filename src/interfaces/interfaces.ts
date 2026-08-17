export default interface iJobs {
  id: number;
  title: string;
  company: string;
  description: string;
  salaryFrom: number;
  salaryTo: number;
  currency: string;
  location: string;
  remote: boolean;
  employmentType: string;
  experience: string;
  skills: Array<string>;
  createdAt: string;
  isActive: boolean;
}
