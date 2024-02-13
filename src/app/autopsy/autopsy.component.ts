import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AutopsyService} from "../core/services/autopsy/autopsy.service";
import {filter, map, Observable, of, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {ElectronService} from "../core/services";
import {AutopsyEditComponent} from "../autopsy-edit/autopsy-edit.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  @ViewChild(AutopsyEditComponent) autopsyEditComponent!: AutopsyEditComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private autopsyProtocolService: AutopsyService,
    private electronService: ElectronService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    console.log('init')
    this.route.params.pipe(
      // Use switchMap to switch to a new observable each time the parameter changes
      switchMap(params => {
        if (params['edit'] === 'edit') {
          this.isEditing = true;
        } else {
          this.isEditing = false;
        }
        this.autopsyId = params['id'];
        if (this.autopsyId === 'new') {
          return of(<AutopsyProtocol>{id: 'new'})
        } else {
          return this.autopsyProtocolService.getAutopsyProtocolById(<string>params['id']);
        }
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

  print(): void {
    if (this.electronService.isElectron) {
      console.log("electron print");
      this.electronService.print();
    } else {
      console.log("normal print");
      window.print();
    }
  }

  onProtocolSelect(autopsyId: string): void {
    const e = this.isEditing ? 'edit' : 'display';
    this.router.navigate(['/autopsy', autopsyId, e]);
  }

  saveAutopsy(event: AutopsyProtocol) {
    if (event.id === 'new') {
      event.id = undefined;
    }
    this.autopsyProtocolService.save(event).subscribe((data) => {
      this.snackBar.open('autopsy saved!', 'Close', {duration: 3000});
      if(data.id) {
        this.onProtocolSelect(data.id);
      }
    });
  }

  printToPDF() {
    if (this.electronService.isElectron) {
      console.log("electron save to pdf");
      this.electronService.saveToPDF();
    }
  }

  isElectron(): boolean {
    return this.electronService.isElectron;
  }

  toggleEditMode(checked: boolean) {
    const e = checked ? 'edit' : 'display';
    this.router.navigate(['/autopsy', this.autopsyId, e]);
  }

  triggerSaveAutopsy(): void {
    // Directly call the saveAutopsy method on the child component
    if (this.autopsyEditComponent) {
      this.autopsyEditComponent.saveAutopsy();
    }
  }
}
