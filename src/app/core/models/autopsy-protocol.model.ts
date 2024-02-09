export interface AutopsyProtocol {
  id?: string;
  caseNumber?: string;
  deceasedName?: string;
  age?: number | null;
  gender?: 'Male' | 'Female' | 'Other' | null;
  dateOfDeath?: Date | null;
  dateOfAutopsy?: Date | null;
  placeOfDeath?: string | null;
  causeOfDeath?: string | null;
  mannerOfDeath?: 'Natural' | 'Accident' | 'Homicide' | 'Suicide' | 'Undetermined' | null;
  autopsyPerformedBy?: string | null;
  findings?: {
    externalExamination?: string | null;
    internalExamination?: {
      brain?: string | null;
      heart?: string | null;
      lungs?: string | null;
      liver?: string | null;
      kidneys?: string | null;
      otherNotes?: string | null;
    };
    toxicologyResults?: string | null;
    microscopicExaminations?: string | null;
    conclusion?: string | null;
  };
}
