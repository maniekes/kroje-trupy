import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-autopsy-display',
  standalone: true,
  imports: [
    DatePipe,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './autopsy-display.component.html',
  styleUrl: './autopsy-display.component.scss'
})
export class AutopsyDisplayComponent {
  @Input() protocol: AutopsyProtocol = {};
}
