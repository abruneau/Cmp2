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
  private gmailURL = 'http://www.gmail.com';
  private gmailLogoutRe = 'https://mail.google.com/mail/logout';
  private gmailAddAccountRe = 'https://accounts.google.com/AddSession';
  private oktaRe = 'https://.*.okta.com/';
  private gmailDomainRe = 'https://mail.google.com/';
  private editInNewTabRe = 'https://mail.google.com/mail/.*#cmid%253D[0-9]+';

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
      visible: true,
      webviewAttributes: {
        nodeIntegration: true,
        plugins: true
      }
    });
    tab.activate()
    this.webview = document.querySelector('webview')
    this.webview.addEventListener('dom-ready', () => {
      this.getLabel()
    })
    this.webview.addEventListener('new-window', (e, url) => {
      if (url.match(this.gmailLogoutRe)) {
        e.preventDefault();
        this.gotoURL(url).then(() => { this.gotoURL(this.gmailURL) });
      } else if (url.match(this.editInNewTabRe)) {
        e.preventDefault();
        this.webview.send('start-compose');
      } else if (url.match(this.gmailDomainRe) ||
        url.match(this.gmailAddAccountRe) ||
        url.match(this.oktaRe)) {
        e.preventDefault();
        this.webview.loadURL(url);
      } else {
        e.preventDefault();
        shell.openExternal(url);
      }
    })

    this.hide()
  }

  private gotoURL(url) {
    return new Promise((resolve) => {
      this.webview.on('did-finish-load', resolve);
      this.webview.loadURL(url);
    });
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
