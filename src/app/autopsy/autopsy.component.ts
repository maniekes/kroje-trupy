import {Component, OnInit} from '@angular/core';
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AutopsyService} from "../core/services/autopsy/autopsy.service";

@Component({
  selector: 'app-autopsy',
  templateUrl: './autopsy.component.html',
  styleUrl: './autopsy.component.scss'
})
export class AutopsyComponent implements OnInit{
  autopsyData: AutopsyProtocol = {};
  autopsyId: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject the Router service
    private autopsyProtocolService: AutopsyService
  ) {
    this.autopsyId = this.route.snapshot.params['id'];
  }
  ngOnInit() {
    console.log(this.autopsyId);
    if (this.autopsyId) {
      this.autopsyProtocolService.getAutopsyProtocolById(this.autopsyId).subscribe((autopsy: AutopsyProtocol | undefined) => {
        if (autopsy) {
          this.autopsyData = autopsy;
        }
      });
    }
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

}
