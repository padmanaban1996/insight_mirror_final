import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { JwtService } from 'src/app/core/services/jwt.service';
import { LocalUserService } from 'src/app/core/services/local-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  roomUrl: string;

  constructor(public router: ActivatedRoute, public localUserStorage: LocalUserService, public sanitizer: DomSanitizer, private jwtService: JwtService) { }

  ngOnInit(): void {


  }

}
