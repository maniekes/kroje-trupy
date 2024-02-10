import {Injectable} from '@angular/core';
import {AutopsyProtocol} from "../../models/autopsy-protocol.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutopsyService {

  mockAutopsyProtocols: AutopsyProtocol[] = [
    {
      id: '1',
      caseNumber: 'CASE123456',
      deceasedName: 'John Doe',
      age: 54,
      gender: 'Male',
      dateOfDeath: new Date('2024-01-01'),
      dateOfAutopsy: new Date('2024-01-02'),
      placeOfDeath: 'Springfield',
      causeOfDeath: 'Natural Causes',
      mannerOfDeath: 'Natural',
      autopsyPerformedBy: 'Dr. Smith',
      findings: {
        externalExamination: 'No external injuries observed.',
        internalExamination: {
          brain: 'Normal',
          heart: 'Evidence of coronary artery disease.',
          lungs: 'Normal',
          liver: 'Normal',
          kidneys: 'Normal',
          otherNotes: '',
        },
        toxicologyResults: 'No toxic substances detected.',
        microscopicExaminations: 'Normal cell structures.',
        conclusion: 'Death due to natural causes.',
      },
    },
    {id: '3', caseNumber: '123', deceasedName: 'andrzej'},
    {
      id: '2',
      caseNumber: '2137',
      gender: "Other",
      findings: {internalExamination: {brain: "pusty", heart: "jest XD"}}
    }];

  constructor() {
  }

  getAutopsyProtocols(): Observable<AutopsyProtocol[]> {
    return of(this.mockAutopsyProtocols);
  }

  getAutopsyProtocolById(id: string): Observable<AutopsyProtocol | undefined> {
    const autopsy = this.mockAutopsyProtocols.find(a => a.id === id);
    return of(autopsy);
  }

}