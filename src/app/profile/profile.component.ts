import { Component, OnInit } from '@angular/core';
import { web3 } from 'src/web3';
import {GetMRAService} from '../get-mra.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public drug;
  constructor(private getMRA: GetMRAService) { }

    ngOnInit() {
    console.log('hello');
       this.getMRA.getMedicalRecordAddress(this.getMRA.nID);
  }

    flagBloodDonation:boolean = false;
    flagDiagnosis:boolean = false;
    flagSurgery:boolean = false;
    flagDrugPrescribtion:boolean = false;
    flagRadiology:boolean = false;
    flagLabTest:boolean = false;
    flagDrugList:boolean = false;


    displayBloodDonation(){
        this.getMRA.getBloodDonation()
        this.flagBloodDonation = true;
        this.flagDiagnosis = false;
        this.flagSurgery = false;
        this.flagDrugPrescribtion = false;
        this.flagRadiology = false;
        this.flagLabTest = false;
        this.flagDrugList = false;
    }

    displayDiagnosises(){
        this.getMRA.getDiagnosises();
        this.flagDiagnosis = true;
        this.flagBloodDonation =false;
        this.flagSurgery = false;
        this.flagDrugPrescribtion = false;
        this.flagRadiology = false;
        this.flagLabTest = false;
        this.flagDrugList = false;
    }

    displaySurgerises(){
        this.getMRA.getSurgeries();
        this.flagSurgery = true;
        this.flagDiagnosis = false;
        this.flagBloodDonation =false;
        this.flagDrugPrescribtion = false;
        this.flagRadiology = false;
        this.flagLabTest = false;
        this.flagDrugList = false;
    }

    displayRadiology(){
        this.getMRA.getRadiology();
        this.flagRadiology = true;
        this.flagDiagnosis = false;
        this.flagBloodDonation =false;
        this.flagSurgery = false;
        this.flagDrugPrescribtion = false;
        this.flagLabTest = false;
        this.flagDrugList = false;
    }

    displayDrugPrescribtion(){
        this.getMRA.getDrugPrescribtion()
        this.flagDrugPrescribtion = true;
        this.flagDiagnosis = false;
        this.flagBloodDonation =false;
        this.flagSurgery = false;
        this.flagRadiology = false;
        this.flagLabTest = false;
        this.flagDrugList = false;
    }

    displayLabTest(){
        this.getMRA.getLabTest();
        this.flagLabTest = true;
        this.flagDiagnosis = false;
        this.flagBloodDonation =false;
        this.flagSurgery = false;
        this.flagDrugPrescribtion = false;
        this.flagRadiology = false;
        this.flagDrugList = false;
    }

    displayDrugList(i){
        //this.drug = JSON.parse(this.getMRA.P_drugPrescribtions[i]['drugList']);
      this.drug = JSON.parse('{"drugName":"panadol","quantity":1,"doctorComment":"5 time per days"}');
       this.flagDrugList = !this.flagDrugList;


    }


}




