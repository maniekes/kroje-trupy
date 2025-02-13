/* eslint-disable @typescript-eslint/unbound-method */
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import {Observable, startWith, switchMap} from "rxjs";
import {AutoComplementService} from "../core/services/autoComplement/auto-complement.service";
import {AutoCompletionObject} from "../core/models/auto-completion-object.model";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-autopsy-edit',
  standalone: true,
  templateUrl: './autopsy-edit.component.html',
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatDatepickerToggle,
    MatDatepicker,
    MatAutocomplete,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    TranslateModule,
    MatFormField,
    MatLabel,
    MatFormField,
    MatSelect,
    MatHint,
    MatFormFieldModule,
    MatOption,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatButton,
    MatInput,
    MatAutocompleteTrigger,
  ],
  styleUrl: './autopsy-edit.component.scss'
})
export class AutopsyEditComponent implements OnInit, OnChanges {

  @Input() protocol: AutopsyProtocol = {};
  @Output() saveProtocol = new EventEmitter<AutopsyProtocol>();

  autopsyForm: FormGroup;
  filteredSuggestions: { [key: string]: Observable<AutoCompletionObject[]> } = {};

  constructor(
    private fb: FormBuilder,
    private autoComplementService: AutoComplementService,
    private snackBar: MatSnackBar
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
  }

  ngOnInit() {
    this.setupForm(this.protocol);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['protocol'] && changes['protocol'].currentValue) {
      this.setupForm(<AutopsyProtocol>changes['protocol'].currentValue);
    }
  }

  setupForm(protocol: AutopsyProtocol) {
    this.autopsyForm.reset();
    this.autopsyForm.patchValue(protocol);
    this.setupAutocomplete('brain');
    this.setupAutocomplete('liver');
    this.setupAutocomplete('heart');
    this.setupAutocomplete('lungs');
    this.setupAutocomplete('kidneys');
  }

  saveAutopsy() {
    if (this.autopsyForm.valid) {
      this.saveProtocol.emit(<AutopsyProtocol>this.autopsyForm.value);
    } else {
      this.snackBar.open("errors in form! cannot save!", "close", {duration: 3000});
    }
  }

  private setupAutocomplete(fieldName: string): void {
    const control = this.autopsyForm.get(`findings.internalExamination.${fieldName}`) as FormControl;
    this.filteredSuggestions[fieldName] = control.valueChanges.pipe(
      startWith(''), // Start with an empty string to load all suggestions initially
      switchMap(value => {
        // Fetch and filter suggestions based on the current input
        return this.autoComplementService.getSuggestions(fieldName, <string>value);
      })
    );
  }

  displayFn(suggestion: AutoCompletionObject): string {
    return suggestion && suggestion.value ? suggestion.value : '';
  }
}
