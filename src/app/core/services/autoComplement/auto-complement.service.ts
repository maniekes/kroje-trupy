import {Injectable} from '@angular/core';
import {AutoCompletionObject} from "../../models/auto-completion-object.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutoComplementService {
  private mockSuggestions: AutoCompletionObject[] = [
    // Brain suggestions
    { fieldName: 'brain', value: 'Normal' },
    { fieldName: 'brain', value: 'Mild swelling' },
    { fieldName: 'brain', value: 'Signs of hemorrhage' },

    // Liver suggestions
    { fieldName: 'liver', value: 'Normal' },
    { fieldName: 'liver', value: 'Fatty liver' },
    { fieldName: 'liver', value: 'Cirrhosis' },

    // New: Heart suggestions
    { fieldName: 'heart', value: 'Normal' },
    { fieldName: 'heart', value: 'Cardiomegaly' },
    { fieldName: 'heart', value: 'Signs of myocardial infarction' },

    // New: Lungs suggestions
    { fieldName: 'lungs', value: 'Normal' },
    { fieldName: 'lungs', value: 'Pulmonary edema' },
    { fieldName: 'lungs', value: 'Signs of pneumonia' },

    // New: Kidneys suggestions
    { fieldName: 'kidneys', value: 'Normal' },
    { fieldName: 'kidneys', value: 'Signs of acute kidney injury' },
    { fieldName: 'kidneys', value: 'Chronic kidney disease' },
  ];

  constructor() {
  }

  getSuggestions(fieldName: string, searchTerm: string | null = ''): Observable<AutoCompletionObject[]> {
    // Ensure searchTerm is treated as a string
    const searchTermStr = String(searchTerm).toLowerCase();
    // Assuming mockSuggestions is an array of AutoCompletionObject
    const filteredSuggestions = this.mockSuggestions.filter(suggestion =>
      suggestion.fieldName.toLowerCase() === fieldName.toLowerCase() &&
      suggestion.value.toLowerCase().includes(searchTermStr)
    );
    return of(filteredSuggestions);
  }
}
