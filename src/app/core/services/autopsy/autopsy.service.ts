import {Injectable} from '@angular/core';
import {AutopsyProtocol} from "../../models/autopsy-protocol.model";

@Injectable({
  providedIn: 'root'
})
export class AutopsyService {

  constructor() {
  }

  getAutopsyProtocol(): AutopsyProtocol[] {
    return [{id: '1', caseNumber: '123', deceasedName: 'andrzej'},
      {
        id: '2',
        caseNumber: '2137',
        gender: "Other",
        findings: {internalExamination: {brain: "pusty", heart: "jest XD"}}
      }];
  }
}
