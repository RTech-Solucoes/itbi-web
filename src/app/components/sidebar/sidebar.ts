import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  isExpanded = false;
  expandedMenu: string | null = null;

  constructor(private router: Router) {}

  expand() {
    this.isExpanded = true;
  }

  collapse() {
    this.isExpanded = false;
    this.expandedMenu = null;
  }

  toggleSubmenu(menu: string) {
    this.expandedMenu = this.expandedMenu === menu ? null : menu;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}