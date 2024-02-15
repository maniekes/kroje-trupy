import {Injectable} from '@angular/core';
import {AutopsyProtocol} from "../../models/autopsy-protocol.model";
import {Observable, of, throwError} from "rxjs";
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

  downloadAutopsy(id: string): void {
    this.getAutopsyProtocolById(id).subscribe(autopsy => {
      if (autopsy) {
        this.downloadJSON(autopsy, autopsy.caseNumber + '.json');
      }
    })
  }

  private downloadJSON(data: any, filename: string = 'data.json'): void {
    // Convert the data to a JSON string
    const jsonString = JSON.stringify(data);
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], {type: 'application/json'});
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a); // Append the anchor to the body
    a.click(); // Programmatically click the anchor to trigger the download
    document.body.removeChild(a); // Clean up by removing the anchor from the body
    URL.revokeObjectURL(url); // Release the created URL
  }


  uploadAutopsy(file: File): void {
    this.parseAutopsyFile(file).then(autopsy => {
        autopsy.id = undefined;
        this.save(autopsy);
      }
    ).catch(error => console.log(error));
  }

  private parseAutopsyFile(file: File): Promise<AutopsyProtocol> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        try {
          const json = JSON.parse(fileReader.result as string);
          // Assuming the JSON structure directly matches AutopsyProtocol[]
          resolve(json as AutopsyProtocol);
        } catch (error) {
          reject(error);
        }
      };
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsText(file);
    });
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
