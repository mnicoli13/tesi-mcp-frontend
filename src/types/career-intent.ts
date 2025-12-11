// ============= CAREER INTERESTS =============

export type WorkStyle = "remote" | "hybrid" | "onsite";
export type CompanyType =
  | "startup"
  | "corporate"
  | "consulting"
  | "scaleup"
  | "agency";

export interface CareerInterests {
  areas: string[]; // Es: ["AI", "Data Science", "Cybersecurity"]
  preferredCompanyTypes: CompanyType[];
  workStyle: WorkStyle;
  locations: string[]; // Es: ["Milano", "Remoto", "Estero"]
  salaryExpectations?: {
    min?: number;
    max?: number;
  };
}
