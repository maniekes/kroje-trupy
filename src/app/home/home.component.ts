import {Component, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {AutopsyService} from "../core/services/autopsy/autopsy.service";
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import { DatePipe } from '@angular/common';
import { MatAnchor } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { AutopsyUploadComponent } from '../autopsy-upload/autopsy-upload.component';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [MatToolbar, AutopsyUploadComponent, MatCard, MatCardHeader, MatCardTitle, RouterLink, MatCardSubtitle, MatCardContent, MatCardActions, MatAnchor, DatePipe]
})
export class HomeComponent implements OnInit {

  protocols: AutopsyProtocol[] = [];

  constructor(private router: Router,
              private autopsyProtocolService: AutopsyService,
  ) {


  }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.autopsyProtocolService.getAutopsyProtocols().subscribe(protocols => this.protocols = protocols);
  }

  downloadAutopsy(id: string | undefined) {
    if (id) {
      this.autopsyProtocolService.downloadAutopsy(id);
    }
  }

  removeAutopsy(id: string | undefined) {
    if (id) {
      this.autopsyProtocolService.deleteAutopsy(id);
    }
  }
}
