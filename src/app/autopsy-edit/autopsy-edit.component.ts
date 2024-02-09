/* eslint-disable @typescript-eslint/unbound-method */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AutopsyService} from "../core/services/autopsy/autopsy.service";
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";

@Component({
  selector: 'app-autopsy-edit',
  templateUrl: './autopsy-edit.component.html',
  styleUrl: './autopsy-edit.component.scss'
})
export class AutopsyEditComponent implements OnInit {
  autopsyForm: FormGroup;
  autopsyId: string | null | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private autopsyProtocolService: AutopsyService
  ) {
    this.autopsyId = this.route.snapshot.params['id'];
    this.autopsyForm = this.fb.group({
      caseNumber: ['', Validators.required],
      deceasedName: ['', Validators.required],
      age: [null, Validators.required],
      gender: [null, Validators.required],
      dateOfDeath: [null, Validators.required],
      dateOfAutopsy: [null, Validators.required],
      placeOfDeath: [''],
      causeOfDeath: [''],
      mannerOfDeath: [null, Validators.required],
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
    console.log(this.autopsyId);
    if (this.autopsyId) {
      this.autopsyProtocolService.getAutopsyProtocolById(this.autopsyId).subscribe((autopsy: AutopsyProtocol | undefined) => {
        if (autopsy) {
          this.autopsyForm.patchValue(autopsy);
        }
      });
    }
  }

  saveAutopsy() {
    if (this.autopsyForm.valid) {
      console.log(this.autopsyForm.value);
      // Here you would call the service to update the autopsy protocol
    }
  }
}
