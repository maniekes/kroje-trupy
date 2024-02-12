import {Component, OnInit} from '@angular/core';
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AutopsyService} from "../core/services/autopsy/autopsy.service";
import {Observable, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-autopsy',
  templateUrl: './autopsy.component.html',
  styleUrl: './autopsy.component.scss'
})
export class AutopsyComponent implements OnInit {
  autopsyData: AutopsyProtocol = {};
  autopsyId: string | null | undefined;
  selectedProtocol = new FormControl('');
  protocols$: Observable<AutopsyProtocol[]>; // Assuming AutopsyProtocol has an id and a name

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject the Router service
    private autopsyProtocolService: AutopsyService
  ) {
    this.autopsyId = this.route.snapshot.params['id'];
    this.protocols$ = this.autopsyProtocolService.getAutopsyProtocols(); // Fetch the protocols
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => this.autopsyProtocolService.getAutopsyProtocolById(<string>params['id']))
    ).subscribe(autopsy => {
      // Assign the data to a property to display in the template
      if (autopsy) {
        this.autopsyId = autopsy.id;
        this.autopsyData = autopsy;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']); // Navigates back to the home/main page
  }

  printPage(): void {
    window.print();
  }

  editPage(): void {
    this.router.navigate(['/autopsy-edit', this.autopsyId]);
  }

  onProtocolSelect(autopsyId: string): void {
    this.router.navigate(['/autopsy', autopsyId]);
  }
}
