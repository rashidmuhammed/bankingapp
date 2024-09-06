import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  status: boolean = false;
  public itemName: string = 'dash';
  public id: string = '';
  public userName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    let data = localStorage.getItem('user');
    if (data) {
      let user = JSON.parse(data);
      this.id = user[0].id;
      this.userName = user[0].firstName + '' + user[0].lastName;

      console.log(this.id);
    }
  }

  clickEvent() {
    this.status = !this.status;
  }

  toggleActiveClass(arg0: string) {
    this.itemName = arg0;
  }

  // toogleNav() {
  //   this.isOpen = !this.isOpen;
  //   console.log(this.isOpen);
  // }
}
