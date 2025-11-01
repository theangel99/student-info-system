import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <div class="about-container">
      <p-card>
        <ng-template pTemplate="header">
          <div class="card-header">
            <i class="pi pi-info-circle"></i>
            <h1>O aplikaciji</h1>
          </div>
        </ng-template>

        <div class="about-content">
          <section class="section">
            <h2>Informacijski sistem za študente</h2>
            <p>
              Ta aplikacija je namenjena upravljanju študentskih zapisov in omogoča enostavno 
              dodajanje, urejanje, pregledovanje in brisanje podatkov o študentih.
            </p>
          </section>

          <section class="section">
            <h3><i class="pi pi-check-circle"></i> Funkcionalnosti</h3>
            <ul>
              <li>Pregled vseh študentov v preglednici</li>
              <li>Dodajanje novih študentov z validacijo podatkov</li>
              <li>Urejanje obstoječih študentov</li>
              <li>Brisanje študentov s potrditvijo</li>
              <li>Podrobni prikaz posameznega študenta</li>
              <li>Statistika in analiza podatkov</li>
              <li>Upravljanje predmetov za vsakega študenta</li>
            </ul>
          </section>

          <section class="section">
            <h3><i class="pi pi-cog"></i> Tehnologije</h3>
            <div class="tech-grid">
              <div class="tech-item">
                <i class="pi pi-code"></i>
                <h4>Angular 17</h4>
                <p>Standalone komponente</p>
              </div>
              <div class="tech-item">
                <i class="pi pi-palette"></i>
                <h4>PrimeNG</h4>
                <p>UI komponente</p>
              </div>
              <div class="tech-item">
                <i class="pi pi-database"></i>
                <h4>JSON Server</h4>
                <p>Mock REST API</p>
              </div>
              <div class="tech-item">
                <i class="pi pi-sitemap"></i>
                <h4>RxJS</h4>
                <p>Reaktivno programiranje</p>
              </div>
            </div>
          </section>

          <section class="section">
            <h3><i class="pi pi-shield"></i> Validacije</h3>
            <p>
              Aplikacija vključuje napredne validacije za zagotavljanje integritete podatkov:
            </p>
            <ul>
              <li>Obvezna polja (ime, priimek, email)</li>
              <li>Veljavna oblika email naslova</li>
              <li>Veljavnost datuma vpisa</li>
              <li>Izbira vsaj enega predmeta</li>
            </ul>
          </section>

          <section class="section info-box">
            <div class="info-header">
              <i class="pi pi-info-circle"></i>
              <h4>Verzija</h4>
            </div>
            <p><strong>Verzija:</strong> 1.0.0</p>
            <p><strong>Zadnja posodobitev:</strong> November 2025</p>
          </section>
        </div>

        <ng-template pTemplate="footer">
          <div class="card-footer">
            <p-button 
              label="Nazaj na nadzorno ploščo" 
              icon="pi pi-home"
              (onClick)="goToDashboard()">
            </p-button>
          </div>
        </ng-template>
      </p-card>
    </div>
  `,
  styles: [`
    .about-container {
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 2rem;
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: white;
    }

    .card-header i {
      font-size: 2.5rem;
    }

    .card-header h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 600;
      color: white;
    }

    .about-content {
      padding: 1rem 0;
    }

    .section {
      margin-bottom: 2rem;
    }

    .section h2 {
      font-size: 1.5rem;
      color: #1e293b;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .section h3 {
      font-size: 1.25rem;
      color: #1e293b;
      margin-bottom: 1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section h3 i {
      color: #dc2626;
    }

    .section p {
      color: #475569;
      line-height: 1.7;
      margin-bottom: 1rem;
    }

    .section ul {
      list-style: none;
      padding-left: 0;
    }

    .section ul li {
      padding: 0.5rem 0 0.5rem 1.5rem;
      color: #475569;
      position: relative;
    }

    .section ul li:before {
      content: "→";
      position: absolute;
      left: 0;
      color: #dc2626;
      font-weight: bold;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .tech-item {
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 8px;
      text-align: center;
      transition: all 0.2s ease;
      border: 1px solid #e2e8f0;
    }

    .tech-item:hover {
      background: #fee2e2;
      border-color: #fecaca;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
    }

    .tech-item i {
      font-size: 2.5rem;
      color: #dc2626;
      margin-bottom: 1rem;
      display: block;
    }

    .tech-item h4 {
      margin: 0 0 0.5rem 0;
      color: #1e293b;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .tech-item p {
      margin: 0;
      color: #64748b;
      font-size: 0.875rem;
    }

    .info-box {
      background: #fef2f2;
      border-left: 4px solid #dc2626;
      padding: 1.5rem;
      border-radius: 8px;
    }

    .info-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .info-header i {
      color: #dc2626;
      font-size: 1.5rem;
    }

    .info-header h4 {
      margin: 0;
      color: #991b1b;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .info-box p {
      margin: 0.5rem 0;
      color: #991b1b;
    }

    .card-footer {
      display: flex;
      justify-content: center;
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
    }

    @media (max-width: 768px) {
      .about-container {
        padding: 1rem;
      }

      .card-header {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem;
      }

      .card-header h1 {
        font-size: 1.5rem;
      }

      .tech-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {
  constructor(private router: Router) {}

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
