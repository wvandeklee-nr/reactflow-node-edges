export type SubjectRelationship = {
  strength: number;
};

export type SubjectData = {
  name: string;
  label: string;
  subtype: "corporate" | "personal";
  riskLevel: string;
  expandLinks?: string;
  currentlyClicked?: boolean;
  centroid?: boolean;
};
