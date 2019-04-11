import { Component, OnInit } from '@angular/core';
import { web3 } from 'src/web3';
import {GetMRAService} from '../get-mra.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private getMRA: GetMRAService) { }

    ngOnInit() {
    console.log('hello');
       this.getMRA.getMedicalRecordAddress(this.getMRA.nID);




  }

    flagBloodDonation:boolean = false;
    flagDiagnosis:boolean = false;
    flagSurgery:boolean = false;

    displayBloodDonation(){
        this.getMRA.getBloodDonation()
        this.flagBloodDonation = true;
        this.flagDiagnosis = false;
        this.flagSurgery = false;
    }

    displayDiagnosises(){
        this.getMRA.getDiagnosises();
        this.flagDiagnosis = true;
        this.flagBloodDonation =false;
        this.flagSurgery = false;
    }

    displaySurgerises(){
        this.getMRA.getSurgeries();
        this.flagDiagnosis = false;
        this.flagBloodDonation =false;
        this.flagSurgery = true;
    }


}




