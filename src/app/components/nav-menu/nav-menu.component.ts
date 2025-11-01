import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  template: `
    <div class="nav-container">
      <p-menubar [model]="menuItems">
        <ng-template pTemplate="start">
          <div class="logo">
            <i class="pi pi-graduation-cap"></i>
            <span>Študentski IS</span>
          </div>
        </ng-template>
      </p-menubar>
    </div>
  `,
  styles: [`
    .nav-container {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    ::ng-deep .p-menubar {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      border: none;
      border-radius: 0;
      padding: 0.75rem 2rem;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: white;
      font-size: 1.25rem;
      font-weight: 700;
      margin-right: 2rem;
    }

    .logo i {
      font-size: 1.5rem;
    }

    ::ng-deep .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
      color: white;
      font-weight: 500;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      transition: all 0.2s;
    }

    ::ng-deep .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    ::ng-deep .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link.p-menuitem-link-active,
    ::ng-deep .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link:focus {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: none;
    }

    ::ng-deep .p-menubar .p-menuitem-icon {
      color: white;
      margin-right: 0.5rem;
    }

    @media (max-width: 768px) {
      ::ng-deep .p-menubar {
        padding: 0.5rem 1rem;
      }

      .logo span {
        display: none;
      }
    }
  `]
})
export class NavMenuComponent {
  menuItems: MenuItem[] = [];

  constructor(private router: Router) {
    this.menuItems = [
      {
        label: 'Nadzorna plošča',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/dashboard'])
      },
      {
        label: 'Študenti',
        icon: 'pi pi-users',
        command: () => this.router.navigate(['/overview'])
      },
      {
        label: 'O aplikaciji',
        icon: 'pi pi-info-circle',
        command: () => this.router.navigate(['/about'])
      }
    ];
  }
}
