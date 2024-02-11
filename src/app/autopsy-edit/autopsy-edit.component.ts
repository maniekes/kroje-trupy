/* eslint-disable @typescript-eslint/unbound-method */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AutopsyService} from "../core/services/autopsy/autopsy.service";
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import {Observable, switchMap} from "rxjs";

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
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private autopsyProtocolService: AutopsyService,
    private router: Router // Inject the Router service
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

}
