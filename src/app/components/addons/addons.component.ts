import { Component, OnInit } from '@angular/core';
import { shell } from 'electron'
import * as TabGroup from 'electron-tabs'
import { SharedDataService } from '../../providers'

declare const $: any;

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss']
})
export class AddonsComponent implements OnInit {

  serviceURL = 'https://mail.google.com'
  labelQuery = 'document.getElementsByClassName("J-Ke n0")[0].innerText.match(/[0-9]+/g)[0]'
  private webview

  constructor(private _shared: SharedDataService) {
    _shared.showAddon.subscribe((value: boolean) => {
      if (value) {
        this.show()
      } else {
        this.hide()
      }
    })
  }

  ngOnInit() {
    const tabGroup = new TabGroup();
    const tab = tabGroup.addTab({
      title: 'Electron',
      src: this.serviceURL,
      visible: true
    });
    tab.activate()
    this.webview = document.querySelector('webview')
    this.webview.addEventListener('dom-ready', () => {
      this.getLabel()
    })
    this.webview.addEventListener('new-window', (e) => {
      shell.openExternal(e.url)
    })

    this.hide()
  }

  private show(): any {
    $('#addons').show()
    $('#route').hide()
  }

  private hide(): any {
    $('#addons').hide()
    $('#route').show()
  }

  private getLabel() {
    this.webview.executeJavaScript(this.labelQuery, true, (result) => {
      console.log(result)
    })
  }

}
