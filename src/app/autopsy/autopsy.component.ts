import {Component, OnChanges, OnInit} from '@angular/core';
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AutopsyService} from "../core/services/autopsy/autopsy.service";
import {filter, map, Observable, switchMap} from "rxjs";
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
    protocols: AutopsyProtocol[] = [];
    isEditing: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private autopsyProtocolService: AutopsyService
    ) {
    }

    ngOnInit() {

        this.route.params.pipe(
            // Use switchMap to switch to a new observable each time the parameter changes
            switchMap(params => {
                if (params['edit'] === 'edit') {
                    this.isEditing = true;
                }
                this.autopsyId = params['id'];
                return this.autopsyProtocolService.getAutopsyProtocolById(<string>params['id']);
            })
        ).subscribe(autopsy => {
            if (autopsy) {
                this.autopsyId = autopsy.id;
                this.autopsyData = autopsy;
                this.selectedProtocol.setValue(<string>autopsy.id);
            }
        });
        this.autopsyProtocolService.getAutopsyProtocols()
            .subscribe(protocols => this.protocols = protocols); // Fetch the protocols
    }

    goBack(): void {
        this.router.navigate(['/']); // Navigates back to the home/main page
    }

    print(): void {
        window.print();
    }

    editPage(): void {
        this.router.navigate(['/autopsy', this.autopsyId, 'edit']);
    }

    printPage(): void {
        this.router.navigate(['/autopsy', this.autopsyId]);
    }

    onProtocolSelect(autopsyId: string): void {
        const e = this.isEditing ? 'edit' : '';
        this.router.navigate(['/autopsy', autopsyId, e]);
    }

    saveAutopsy(event: AutopsyProtocol) {
        this.autopsyProtocolService.save(event);
    }
}
