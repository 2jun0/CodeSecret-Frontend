import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(
  ) { }

  loadAndRefresh(router: Router, href: string) {
    document.location.href = `http://localhost:4200${href}`
  }
}
