import {Injectable} from '@angular/core';
import {AutopsyProtocol} from "../../models/autopsy-protocol.model";
import {Observable, of} from "rxjs";
import {MOCKED_PROTOCOLS} from "./mock.data";

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
      // Generate a new ID
      const newId = this.generateNewId();
      autopsyProtocol.id = newId;
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
}
