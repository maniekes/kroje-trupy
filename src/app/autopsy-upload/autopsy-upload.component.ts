import {Component} from '@angular/core';
import {AutopsyService} from "../core/services/autopsy/autopsy.service";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-autopsy-upload',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './autopsy-upload.component.html',
  styleUrl: './autopsy-upload.component.scss'
})
export class AutopsyUploadComponent {
  constructor(private autopsyService: AutopsyService) {
  }

  onFileSelected(event: any): void {
    if (event.target.files) {
      for (const file of event.target.files) {
        this.autopsyService.uploadAutopsy(<File>file)
          .subscribe({error: err => console.error(err)})
      }
    }
  }
}
