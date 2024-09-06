import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  public isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) {}
}
