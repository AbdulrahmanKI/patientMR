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
       this.getMRA.getMedicalRecordAddress(123456789);
      // console.log(this.getMRA.getD());
     //console.log();
   //this.getMRA.getPatientMedicalRecordData();
  }

    isLoaded(){
       // this.getMRA.getPatientMedicalRecordData();
        return true;

    }


}




