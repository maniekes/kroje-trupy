import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AutopsyService} from "../core/services/autopsy/autopsy.service";
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
