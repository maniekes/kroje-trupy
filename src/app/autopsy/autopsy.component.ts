import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {AutopsyProtocol} from "../core/models/autopsy-protocol.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AutopsyService} from "../core/services/autopsy/autopsy.service";
import {of, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {ElectronService} from "../core/services";
import {AutopsyEditComponent} from "../autopsy-edit/autopsy-edit.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AutopsyDisplayComponent} from '../autopsy-display/autopsy-display.component';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {AutopsyUploadComponent} from '../autopsy-upload/autopsy-upload.component';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconAnchor, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-autopsy',
  templateUrl: './autopsy.component.html',
  styleUrl: './autopsy.component.scss',
  standalone: true,
  imports: [MatToolbar, MatIconAnchor, MatTooltip, RouterLink, MatIcon, MatSlideToggle, MatIconButton, AutopsyUploadComponent, MatMenuTrigger, MatMenu, MatMenuItem, AutopsyDisplayComponent, AutopsyEditComponent]
})
export class AutopsyComponent implements OnInit {
  autopsyData: AutopsyProtocol = {};
  autopsyId: string | null | undefined;
  selectedProtocol = new FormControl('');
  protocols: AutopsyProtocol[] = [];
  isEditing: boolean = false;
  @ViewChild(AutopsyEditComponent) autopsyEditComponent!: AutopsyEditComponent;
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);
  router = inject(Router);
  autopsyProtocolService = inject(AutopsyService);
  electronService = inject(ElectronService);

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

  onProtocolSelect(autopsyId: string | undefined): void {
    const e = this.isEditing ? 'edit' : 'display';
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    this.router.navigate(['/autopsy', autopsyId, e]);
  }

  saveAutopsy(event: AutopsyProtocol) {
    if (event.id === 'new') {
      event.id = undefined;
    }
    this.autopsyProtocolService.save(event).subscribe((data) => {
      this.snackBar.open('autopsy saved!', 'Close', {duration: 3000});
      if (data.id) {
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
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    this.router.navigate(['/autopsy', this.autopsyId, e]);
  }

  triggerSaveAutopsy(): void {
    // Directly call the saveAutopsy method on the child component
    if (this.autopsyEditComponent) {
      this.autopsyEditComponent.saveAutopsy();
    }
  }

  downloadAutopsy() {
    if (this.autopsyId) {
      this.autopsyProtocolService.downloadAutopsy(this.autopsyId);
    }
  }

  deleteAutopsy() {
    if (this.autopsyId) {
      this.autopsyProtocolService.deleteAutopsy(this.autopsyId);
      /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
      this.router.navigate(['/autopsy', 'new', 'edit']);
    }
  }
}
