import {Observable} from "rxjs";

export const readFile = (blob: Blob, reader: FileReader = new FileReader()): Observable<string> => new Observable(obs => {
  if (!(blob instanceof Blob)) {
    obs.error(new Error('`blob` must be an instance of File or Blob.'));
    return;
  }

  reader.onerror = err => obs.error(err);
  reader.onabort = err => obs.error(err);
  reader.onload = () => obs.next(reader.result as string);
  reader.onloadend = () => obs.complete();

  return reader.readAsText(blob);
});
