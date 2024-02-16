import {Injectable} from '@angular/core';
import {AutopsyProtocol} from "../../models/autopsy-protocol.model";
import {map, Observable, of, switchMap, throwError} from "rxjs";
import {MOCKED_PROTOCOLS} from "./mock.data";
import {downloadJson} from "../../util/download-json";
import {readFile} from "../../util/read-file";

@Injectable({
  providedIn: 'root'
})
export class AutopsyService {

  mockAutopsyProtocols: AutopsyProtocol[] = MOCKED_PROTOCOLS;

  constructor() {
  }

  getAutopsyProtocols(): Observable<AutopsyProtocol[]> {
    return of(this.mockAutopsyProtocols);
  }

  getAutopsyProtocolById(id: string): Observable<AutopsyProtocol | undefined> {
    const autopsy = this.mockAutopsyProtocols.find(a => a.id === id);
    return of(autopsy);
  }

  save(autopsyProtocol: AutopsyProtocol): Observable<AutopsyProtocol> {
    if (!autopsyProtocol.id) {
      autopsyProtocol.id = this.generateNewId();
    }
    const index = this.mockAutopsyProtocols.findIndex(p => p.id === autopsyProtocol.id);

    if (index > -1) {
      // Update existing protocol
      this.mockAutopsyProtocols[index] = autopsyProtocol;
    } else {
      // Add new protocol if it doesn't exist
      this.mockAutopsyProtocols.push(autopsyProtocol);
    }

    // Return an observable of the saved/updated autopsy protocol
    return of(autopsyProtocol);
  }

  private generateNewId(): string {
    const maxId = this.mockAutopsyProtocols.reduce((max, p) => Math.max(max, parseInt(<string>p.id)), 0);
    return (maxId + 1).toString();
  }

  downloadAutopsy(id: string): void {
    this.getAutopsyProtocolById(id).subscribe(autopsy => {
      if (autopsy) {
        downloadJson(autopsy, autopsy.caseNumber + '.json');
      }
    })
  }

  uploadAutopsy(file: File): Observable<AutopsyProtocol> {
    return readFile(file).pipe(
      map(s => JSON.parse(s) as AutopsyProtocol),
      switchMap(autopsy => {
        autopsy.id = undefined;
        return this.save(autopsy);
      }));
  }

  deleteAutopsy(id: string): Observable<AutopsyProtocol> {
    const index = this.mockAutopsyProtocols.findIndex(protocol => protocol.id === id);
    if (index !== -1) {
      const removed = this.mockAutopsyProtocols[index];
      this.mockAutopsyProtocols.splice(index, 1);
      return of(removed);
    }
    return throwError(() => `autopsy with id ${id} not found!`);
  }
}
