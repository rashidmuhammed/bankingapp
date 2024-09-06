import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'banking-app';

  constructor(private router: Router) {}

  ngOnInit(): void {
    let data = localStorage.getItem('user');
    if (data) {
      JSON.parse(data);
      this.router.navigate(['/dashboared']);
    }
  }
}
