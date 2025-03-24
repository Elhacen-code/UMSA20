import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="settings-container">
      <h1>Settings</h1>
      <div class="settings-section">
        <h2>Application Settings</h2>
        <div class="setting-item">
          <label>Language</label>
          <select>
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
    }
    .settings-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-top: 20px;
    }
    .setting-item {
      margin: 15px 0;
    }
    .setting-item label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    .setting-item select {
      width: 200px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class SettingsComponent {}