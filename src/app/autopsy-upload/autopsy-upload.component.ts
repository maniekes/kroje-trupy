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
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.autopsyService.uploadAutopsy(file);
    }
  }
}
