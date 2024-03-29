/* eslint-disable @typescript-eslint/unbound-method */
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap
} from "rxjs";
import {AutoComplementService} from "../core/services/autoComplement/auto-complement.service";
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
export class AutopsyEditComponent implements OnInit {

  fb = inject(FormBuilder);
  dataService = inject(AutoComplementService);
  snackBar = inject(MatSnackBar);

  autopsyForm = this.fb.group({
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

  @Input() protocol: AutopsyProtocol = {};
  @Output() saveProtocol = new EventEmitter<AutopsyProtocol>();


  brain$ = this.buildAutoComplete('brain');
  heart$ = this.buildAutoComplete('heart');
  lungs$ = this.buildAutoComplete('lungs');
  kidneys$ = this.buildAutoComplete('kidneys');
  liver$ = this.buildAutoComplete('liver');

  buildAutoComplete(field: string) {
    return this.autopsyForm.get(`findings.internalExamination.${field}`)?.valueChanges
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        debounceTime(300),
        switchMap(value => this.dataService.getSuggestions(field, <string>value))
      );
  }

  saveAutopsy() {
    if (this.autopsyForm.valid) {
      this.saveProtocol.emit(<AutopsyProtocol>this.autopsyForm.value);
    } else {
      this.snackBar.open("errors in form! cannot save!", "close", {duration: 3000});
    }
  }

  ngOnInit(): void {
    this.autopsyForm.patchValue(<object>this.protocol);
  }
}
