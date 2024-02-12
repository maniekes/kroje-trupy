/* eslint-disable @typescript-eslint/unbound-method */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AutopsyService} from "../core/services/autopsy/autopsy.service";
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import {Observable, startWith, switchMap} from "rxjs";
import {AutoComplementService} from "../core/services/autoComplement/auto-complement.service";
import {AutoCompletionObject} from "../core/models/auto-completion-object.model";

@Component({
  selector: 'app-autopsy-edit',
  templateUrl: './autopsy-edit.component.html',
  styleUrl: './autopsy-edit.component.scss'
})
export class AutopsyEditComponent implements OnInit {
  autopsyForm: FormGroup;
  autopsyId: string | undefined;
  protocols$: Observable<AutopsyProtocol[]>; // Assuming AutopsyProtocol has an id and a name
  selectedProtocol = new FormControl('');
  filteredSuggestions: { [key: string]: Observable<AutoCompletionObject[]> } = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private autopsyProtocolService: AutopsyService,
    private router: Router,
    private autoComplementService: AutoComplementService
  ) {
    this.autopsyForm = this.fb.group({
      id: [''],
      caseNumber: ['', Validators.required],
      deceasedName: [''],
      age: [null],
      gender: [null],
      dateOfDeath: [null],
      dateOfAutopsy: [''],
      placeOfDeath: [''],
      causeOfDeath: [''],
      mannerOfDeath: [null],
      autopsyPerformedBy: [''],
      findings: this.fb.group({
        externalExamination: [''],
        internalExamination: this.fb.group({
          brain: [''],
          heart: [''],
          lungs: [''],
          liver: [''],
          kidneys: [''],
          otherNotes: ['']
        }),
        toxicologyResults: [''],
        microscopicExaminations: [''],
        conclusion: ['']
      })
    });
    //TODO: remove this from constructor
    this.protocols$ = this.autopsyProtocolService.getAutopsyProtocols(); // Fetch the protocols
  }
  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => this.autopsyProtocolService.getAutopsyProtocolById(<string>params['id']))
    ).subscribe(autopsy => {
      // Assign the data to a property to display in the template
      this.autopsyForm.reset();
      if (autopsy?.id) {
        this.autopsyId = autopsy.id;
        this.selectedProtocol.setValue(autopsy.id);
        this.autopsyForm.patchValue(autopsy);
      }
    });
    this.setupAutocomplete('brain');
    this.setupAutocomplete('liver');
    this.setupAutocomplete('heart');
    this.setupAutocomplete('lungs');
    this.setupAutocomplete('kidneys');
  }


  saveAutopsy() {
    if (this.autopsyForm.valid) {
      console.log(this.autopsyForm.value);
      this.autopsyProtocolService.save(<AutopsyProtocol> this.autopsyForm.value);
    }
  }

  onProtocolSelect(autopsyId: string): void {
    this.router.navigate(['/autopsy-edit', autopsyId]);
  }

  goBack(): void {
    this.router.navigate(['/']); // Navigates back to the home/main page
  }

  printView(): void {
    this.router.navigate(['/autopsy', this.autopsyId]);
  }

  private setupAutocomplete(fieldName: string): void {
    const control = this.autopsyForm.get(`findings.internalExamination.${fieldName}`) as FormControl;
    this.filteredSuggestions[fieldName] = control.valueChanges.pipe(
      startWith(''), // Start with an empty string to load all suggestions initially
      switchMap(value => {
        // Fetch and filter suggestions based on the current input
        return this.autoComplementService.getSuggestions(fieldName, value);
      })
    );
  }

  displayFn(suggestion: AutoCompletionObject): string {
    return suggestion && suggestion.value ? suggestion.value : '';
  }
}
