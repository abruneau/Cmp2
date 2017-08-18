import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {Params, ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { shell } from 'electron'

import { Dashboard, Report, ReportTypes } from '../../models'
import { SalesforceService, SharedDataService } from '../../providers';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  @ViewChild('newReportModal') public newReportModal: ModalDirective;

  sfLoginUrl = ''
  dashboard: Dashboard = null
  reportTypes = ReportTypes
  newReportType: number = null
  reportForm: FormGroup

  reportUpdating = false
  private updatedReport: Report

  constructor(private _sharedData: SharedDataService,
    private _route: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _sf: SalesforceService
  ) {
    _sf.loginUrl.subscribe((url) => {
      this.sfLoginUrl = url;
    })
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.getDashboard(params['id'])
    });
    this.reportForm = this.formBuilder.group({
      title: '',
      query: ['', Validators.required],
      columns: this.formBuilder.array([this.createColumn()])
    });
  }

  /////////////////
  // FormBuilder //
  /////////////////

  /**
   * Create a collumn fieald for reportForm
   * @return {FormGroup} [description]
   */
  private createColumn(): FormGroup {
    return this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    })
  }

  /**
   * Add a column fieald to reportForm
   */
  addColumn(): void {
    const columns = this.reportForm.get('columns') as FormArray
    columns.push(this.createColumn())
  }

  /**
   * Remove a column fieald from reportForm
   * @param {[type]} i [description]
   */
  removeColumn(i): void {
    const columns = this.reportForm.get('columns') as FormArray
    columns.removeAt(i)
  }

  resetModal() {
    this.newReportModal.hide()
    this.reportForm.reset()
    this.reportForm.controls['columns'] = this.formBuilder.array([this.createColumn()])
    this.reportUpdating = false
    this.updatedReport = null
  }

  ////////////
  // Report //
  ////////////

  /**
   * Create or update a Report, refresh Report
   * and save Dashboard after reportForm submition
   */
  createReport(): void {
    if (this.reportUpdating) {
      this.updatedReport.title = this.reportForm.value.title
      this.updatedReport.query = this.reportForm.value.query
      this.updatedReport.columns = this.reportForm.value.columns

      this.updatedReport.refresh(this._sf).then(() => {
        this.dashboard.save()
        this.reportUpdating = false
        this.updatedReport = null
      })
      this.resetModal()
    } else {
      const newReport = new Report(this.reportForm.value)
      const self = this
      newReport.refresh(this._sf).then(() => {
        switch (ReportTypes[self.newReportType]) {
          case 'Top': {
            self.dashboard.top.push(newReport)
            break;
          }
          case 'Left': {
            self.dashboard.right.push(newReport)
            break;
          }
          case 'Main': {
            self.dashboard.main.push(newReport)
            break;
          }
          default: {
            console.log(ReportTypes[self.newReportType])
            console.log(self.newReportType)
          }
        }

        self.dashboard.save()
        self.resetModal()
      })
    }
  }

  /**
   * Refresh a Report and save Dashboard
   * @param {Report} r Targeted Report
   */
  refreshReport(r: Report): void {
    r.refresh(this._sf).then(() => {
      this.dashboard.save()
    })
  }

  deleteReport(type: string, index?: number): void {
    console.log('Type: ' + type + ', index: ' + index)
    switch (type) {
      case 'Top': {
        this.dashboard.top.splice(index, 1)
        break;
      }
      case 'Main': {
        this.dashboard.main.splice(index, 1)
        break;
      }
      case 'Right': {
        this.dashboard.right.splice(index, 1)
        break;
      }
      case 'Weather': {
        this.dashboard.weather = false
        break;
      }
      case 'Todo': {
        this.dashboard.todo = false
        break;
      }
    }
    this.dashboard.save()
  }

  /**
   * Set one of the templates to true
   */
  addTemplateToDashboard(): void {
    console.log(this.newReportType)
    switch (ReportTypes[this.newReportType]) {
      case 'Todo': {
        this.dashboard.todo = true
        break
      }
      case 'Weather': {
        this.dashboard.weather = true
        break
      }
    }
    this.dashboard.save()
    this.resetModal()
  }

  /**
   * Patch reportForm with Report value and show newReportModal
   * @param {Report} r Report to be updated
   */
  updateReport(r: Report): void {
    this.updatedReport = r
    this.reportUpdating = true
    for (let i = 1; i < r.columns.length; i++) {
      this.addColumn()
    }
    this.reportForm.patchValue({
      title: r.title,
      query: r.query,
      columns: r.columns
    })
    this.newReportModal.show()
  }

  /**
   * Retrun Bootstrap column size class
   * adapted to Report size
   * @param  {Report} r Targeted Report
   * @return {string}   Bootstrap class
   */
  topReportClass(r: Report): string {
    return 'col-md-' + (12 / r.data.length)
  }

  openExternal(id) {
    shell.openExternal(this.sfLoginUrl + '/' + id)
  }

  ///////////////
  // Dashboard //
  ///////////////

  /**
   * Fetch Dashboard and set this.dashboard
   * @param {string} id Dashboard _id
   */
  getDashboard(id: string): void {
    const self = this
    this._sf.connected.subscribe((value: boolean) => {
      if (value) {
        Dashboard.get(id).then((dash) => {
          self.dashboard = dash
        })
      }
    })
  }

  /**
   * Refresh eash Report of the Dashboard
   */
  refreshDashboard(): void {
    this.dashboard.top.forEach(report => {
      this.refreshReport(report)
    });
    this.dashboard.right.forEach(report => {
      this.refreshReport(report)
    });
    this.dashboard.main.forEach(report => {
      this.refreshReport(report)
    });
  }

  /**
   * Save Dashboard after it was updated with dashboardModal
   */
  updateDashboard(): void {
    this.dashboard.save().then(this._sharedData.dashboardChanges())
  }

  /**
   * Delete Dashboard and redirect to home
   */
  deleteDashboard(): void {
    this.dashboard.delete()
    this._sharedData.dashboardChanges()
    this._router.navigate(['/']);
  }

}
