import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormLoginComponent } from 'src/app/modules/login/components/form-login.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;

  menuNav = [
    { name: 'Home', route: 'home', icon: 'home' },
    { name: 'Carreras', route: 'carreraTecnica', icon: 'category' },
    { name: 'Examenes', route: 'examenAdmision', icon: 'calendar_today' },
    { name: 'Jornadas', route: 'jornadas', icon: 'category' },
  ];

  ngOnInit(): void {}

  constructor(
    media: MediaMatcher,
    public dialog: MatDialog,
    public authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  openFormLogin() {
    const dialogRef = this.dialog.open(FormLoginComponent, { width: '450px' });
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire({
      title: 'Logout',
      text: `${username}, has cerrado la sesión con exito `,
      icon: 'success',
    });
  }
}
