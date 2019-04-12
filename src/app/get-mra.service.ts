import { Injectable } from '@angular/core';
import { web3 } from 'src/web3';
import {pipe} from 'rxjs';
import {delay} from 'rxjs/operators';
import {DateFormatter} from '@angular/common/src/pipes/deprecated/intl';



@Injectable({
  providedIn: 'root'
})
export class GetMRAService {

  private Hospital_Address = '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341';

  public nID;

  private P_Address;
  private P_name;
  private P_nationalID;
  private P_phone_number;
  private P_birth_date;
  private P_gender;
  private P_bloodType;
  public P_BloodDonation = [];
  private BloodDonationCount;
  public P_diagnosises = [];
  private diagnosisesCount;
  public P_surgeries = [];
  private surgeriesCount;
  public P_drugPrescribtions = [];
  private drugPrescribtionsCount;
  public P_Radiologies = [];
  private radiologiesCount;
  public P_LabTest = [];
  private LabTestCount;
  public Correction_drug = [];
    public Correction_surgery = [];
    public Correction_labTest = [];
    public Correction_BloodDonation = [];
    public Correction_Radiology = [];
    public Correction_Diagnosises = [];
    private N_Correction_LabTest ;
    private N_Correction_drug ;
    private N_Correction_BloodDonation ;
    private N_Correction_Diagnosises ;
    private N_Correction_surgery ;
    private N_Correction_Radiology ;

    public flagCorrectionDrug:boolean = false;
    public flagCorrectionSurgery:boolean = false;
    public flagCorrectionLabTest:boolean = false;
    public flagCorrectionBloodDonation:boolean = false;
    public flagCorrectionRadiology:boolean = false;
    public flagCorrectionDiagnosises:boolean = false;

    constructor() { }

    getMedicalRecordAddress(id: number) {

    const ABI = [
      {
        'constant': false,
        'inputs': [
          {
            'name': 'hospitalAddressI',
            'type': 'address'
          },
          {
            'name': 'hospitalName',
            'type': 'string'
          }
        ],
        'name': 'addHospital',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': 'pharmacyAddressI',
            'type': 'address'
          },
          {
            'name': 'pharmacyName',
            'type': 'string'
          }
        ],
        'name': 'addPharmacy',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': 'nationalID',
            'type': 'uint256'
          },
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'dateI',
            'type': 'uint256'
          },
          {
            'name': 'phoneNumberI',
            'type': 'string'
          },
          {
            'name': 'genderI',
            'type': 'string'
          },
          {
            'name': 'bloodTypeI',
            'type': 'string'
          },
          {
            'name': 'emergencyContactI',
            'type': 'string'
          }
        ],
        'name': 'createMedicalRecord',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'inputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': 'nationalIDI',
            'type': 'uint256'
          }
        ],
        'name': 'checkMedicalRecord',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'getHospitalsCount',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': 'nationalIDI',
            'type': 'uint256'
          }
        ],
        'name': 'getMedicalRecord',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'getPharmaciesCount',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'name': 'hospitalAddresses',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'name': 'hospitals',
        'outputs': [
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'networkAddress',
            'type': 'address'
          },
          {
            'name': 'date',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'name': 'medicalRecords',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'medicalRecordsCount',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'ministryOfHealth',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'name': 'pharmacies',
        'outputs': [
          {
            'name': 'name',
            'type': 'string'
          },
          {
            'name': 'networkAddress',
            'type': 'address'
          },
          {
            'name': 'date',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'name': 'pharmacyAddresses',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      }
    ];

    // Medical Record System Contract P_Address
    const address = '0x6a4eb469cc35f57069c81c24c463fae91e13b76b';


    const mycontract = new web3.eth.Contract(ABI, address , {
      from: address ,
      gasPrice: '100000000'
    });


    // Hospital P_Address
      mycontract.methods.getMedicalRecord(id).call({from: this.Hospital_Address},(error , result) => {
       if(!error){
         this.P_Address = result;
         this.getPatientMedicalRecordData(this.P_Address);
       }
       else
         console.log(error);
     });

  }

  getPatientMedicalRecordData(data) {

   /* const ABI_PatientMR = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "_doctorName",
            "type": "string"
          },
          {
            "name": "_diognosisDescription",
            "type": "string"
          }
        ],
        "name": "addDiognosis",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_phoneNumber",
            "type": "string"
          }
        ],
        "name": "addEmergencyContact",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_laboratoryWorkerName",
            "type": "string"
          },
          {
            "name": "_testType",
            "type": "string"
          },
          {
            "name": "_laboratoryTestDescription",
            "type": "string"
          }
        ],
        "name": "addLaboratoryTest",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_surgeryName",
            "type": "string"
          },
          {
            "name": "_mainDoctor",
            "type": "string"
          },
          {
            "name": "_date",
            "type": "uint256"
          },
          {
            "name": "_duration",
            "type": "uint256"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_surgeryType",
            "type": "string"
          }
        ],
        "name": "addSurgery",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "nationalIDI",
            "type": "uint256"
          },
          {
            "name": "nameI",
            "type": "string"
          },
          {
            "name": "birthDateI",
            "type": "uint256"
          },
          {
            "name": "phoneNumberI",
            "type": "string"
          },
          {
            "name": "genderI",
            "type": "string"
          },
          {
            "name": "bloodTypeI",
            "type": "string"
          },
          {
            "name": "emergencyContactI",
            "type": "string"
          },
          {
            "name": "hospitalNameI",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "bloodType",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "dateOfBirth",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "diognoses",
        "outputs": [
          {
            "name": "doctorName",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "diognosisDescription",
            "type": "string"
          },
          {
            "name": "isMedicalError",
            "type": "bool"
          },
          {
            "name": "isCorrectionFor",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "emergencyContacts",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "gender",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "hospitalName",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "laboratoryTests",
        "outputs": [
          {
            "name": "laboratoryWorkerName",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "testType",
            "type": "string"
          },
          {
            "name": "laboratoryTestDescription",
            "type": "string"
          },
          {
            "name": "testHash",
            "type": "string"
          },
          {
            "name": "isMedicalError",
            "type": "bool"
          },
          {
            "name": "isCorrectionFor",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "medicalRecordAddress",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "nationalID",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "phoneNumber",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "submissionDate",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "surgeries",
        "outputs": [
          {
            "name": "mainDoctor",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "surgeryType",
            "type": "string"
          },
          {
            "name": "duration",
            "type": "uint256"
          },
          {
            "name": "isMedicalError",
            "type": "bool"
          },
          {
            "name": "isCorrectionFor",
            "type": "address"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "surgeryName",
            "type": "string"
          },
          {
            "name": "fileHash",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ];*/

    const ABI_PatientMR = [
      {
        "constant": true,
        "inputs": [],
        "name": "surgeriesCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "emergencyContactsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "hospitalName",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "diagnosisesCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_surgeryName",
            "type": "string"
          },
          {
            "name": "_mainDoctor",
            "type": "string"
          },
          {
            "name": "_duration",
            "type": "uint256"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_surgeryInformation",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addSurgery",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "laboratoryTestsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "submissionDate",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "medicalRecordAddress",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "dateOfBirth",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "phoneNumber",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "gender",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "diagnosises",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "doctorName",
            "type": "string"
          },
          {
            "name": "diognosisDescription",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          },
          {
            "name": "fileHash",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "bloodDonations",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "doctorName",
            "type": "string"
          },
          {
            "name": "donationType",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "amount",
            "type": "uint256"
          },
          {
            "name": "fileHash",
            "type": "string"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_doctorName",
            "type": "string"
          },
          {
            "name": "_diognosisDescription",
            "type": "string"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addDiagnosis",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "emergencyContacts",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "bloodDonationsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_doctorName",
            "type": "string"
          },
          {
            "name": "_donationType",
            "type": "string"
          },
          {
            "name": "_amount",
            "type": "uint256"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addBloodDonation",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "nationalID",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "drugPrescribtionsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "surgeries",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "mainDoctor",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "surgeryInformation",
            "type": "string"
          },
          {
            "name": "duration",
            "type": "uint256"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "surgeryName",
            "type": "string"
          },
          {
            "name": "fileHash",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "bloodType",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_phoneNumber",
            "type": "string"
          }
        ],
        "name": "addEmergencyContact",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "radiologiesCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "nationalIDI",
            "type": "uint256"
          },
          {
            "name": "nameI",
            "type": "string"
          },
          {
            "name": "birthDateI",
            "type": "uint256"
          },
          {
            "name": "phoneNumberI",
            "type": "string"
          },
          {
            "name": "genderI",
            "type": "string"
          },
          {
            "name": "bloodTypeI",
            "type": "string"
          },
          {
            "name": "emergencyContactI",
            "type": "string"
          },
          {
            "name": "hospitalNameI",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      }
    ];

    const address = data;

    const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
      from: address ,
      gasPrice: '100000000'
    });

    //Hospital Address / Fetch Patient Name
    mycontract.methods.name.call({from: this.Hospital_Address},(error , result) => {
      if(!error)
        this.P_name = result;
      else
        console.log(error);
    });

    //Hospital Address  /Fetch Patient nationalID
    mycontract.methods.nationalID.call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
      if(!error)
        this.P_nationalID = result;
      else
        console.log(error);
    });

    //Hospital Address  /Fetch Patient phoneNumber
    mycontract.methods.phoneNumber.call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
      if(!error)
        this.P_phone_number = result;
      else
        console.log(error);
    });

    //Hospital Address  /Fetch Patient phoneNumber
    mycontract.methods.dateOfBirth.call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
      if(!error)
        this.P_birth_date = result;
      else
        console.log(error);
    });

      //Hospital Address  /Fetch Patient phoneNumber
      mycontract.methods.gender.call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
          if(!error)
              this.P_gender = result;
          else
              console.log(error);
      });

      //Hospital Address  /Fetch Patient phoneNumber
      mycontract.methods.bloodType.call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
          if(!error)
              this.P_bloodType = result;
          else
              console.log(error);
      });
  }



  getDate(){
    return this.P_birth_date;
  }

  getName(){
     return this.P_name;
    }

  getNationalID(){
    return this.P_nationalID;
  }

  getPhoneNumber(){
    return this.P_phone_number;
  }

  getAddress(){
    return this.P_Address;
  }

  getGender(){
        return this.P_gender ;
  }
  getBloodType(){
        return this.P_bloodType ;
  }

  //get Blood Donation Data
    async getBloodDonation(){
    const ABI_PatientMR = [
      {
        "constant": true,
        "inputs": [],
        "name": "surgeriesCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "emergencyContactsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "hospitalName",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "diagnosisesCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_surgeryName",
            "type": "string"
          },
          {
            "name": "_mainDoctor",
            "type": "string"
          },
          {
            "name": "_duration",
            "type": "uint256"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_surgeryInformation",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addSurgery",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "drugPrescribtions",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "doctorName",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "drugList",
            "type": "string"
          },
          {
            "name": "drugListCount",
            "type": "uint256"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "radiologies",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "radiologist",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "radiologyType",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "fileHash",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "laboratoryTestsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "submissionDate",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "medicalRecordAddress",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "dateOfBirth",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "phoneNumber",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "gender",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "diagnosises",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "doctorName",
            "type": "string"
          },
          {
            "name": "diognosisDescription",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          },
          {
            "name": "fileHash",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "bloodDonations",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "doctorName",
            "type": "string"
          },
          {
            "name": "donationType",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "amount",
            "type": "uint256"
          },
          {
            "name": "fileHash",
            "type": "string"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_doctorName",
            "type": "string"
          },
          {
            "name": "_drugList",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addDrugPrescribtion",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_doctorName",
            "type": "string"
          },
          {
            "name": "_diognosisDescription",
            "type": "string"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addDiagnosis",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "emergencyContacts",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_radiologistName",
            "type": "string"
          },
          {
            "name": "_radiologyType",
            "type": "string"
          },
          {
            "name": "_description",
            "type": "string"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addRadiology",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "bloodDonationsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_doctorName",
            "type": "string"
          },
          {
            "name": "_donationType",
            "type": "string"
          },
          {
            "name": "_amount",
            "type": "uint256"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addBloodDonation",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_laboratoryWorkerName",
            "type": "string"
          },
          {
            "name": "_testType",
            "type": "string"
          },
          {
            "name": "_laboratoryTestDescription",
            "type": "string"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addLaboratoryTest",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "nationalID",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "drugPrescribtionsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "surgeries",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "mainDoctor",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "surgeryInformation",
            "type": "string"
          },
          {
            "name": "duration",
            "type": "uint256"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "surgeryName",
            "type": "string"
          },
          {
            "name": "fileHash",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "bloodType",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "laboratoryTests",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "laboratoryWorkerName",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "testType",
            "type": "string"
          },
          {
            "name": "laboratoryTestDescription",
            "type": "string"
          },
          {
            "name": "testHash",
            "type": "string"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_phoneNumber",
            "type": "string"
          }
        ],
        "name": "addEmergencyContact",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "radiologiesCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "nationalIDI",
            "type": "uint256"
          },
          {
            "name": "nameI",
            "type": "string"
          },
          {
            "name": "birthDateI",
            "type": "uint256"
          },
          {
            "name": "phoneNumberI",
            "type": "string"
          },
          {
            "name": "genderI",
            "type": "string"
          },
          {
            "name": "bloodTypeI",
            "type": "string"
          },
          {
            "name": "emergencyContactI",
            "type": "string"
          },
          {
            "name": "hospitalNameI",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      }
    ];

    const address = this.P_Address;

    const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
      from: address ,
      gasPrice: '100000000'
    });

      this.getDonationCount();
      await new Promise(resolve => setTimeout(
          ()=>resolve(), 300));


    //Fetch Patient BloodDonation
      for (let i =0 ; i< this.BloodDonationCount ; i++){
        mycontract.methods.bloodDonations(i).call({from: this.Hospital_Address},(error , result) => {
          if(!error)
            this.P_BloodDonation[i] =  result;
          else
            console.log(error);
        });
      }
      await new Promise(resolve => setTimeout(
          ()=>resolve(), 300));
      console.log(this.P_BloodDonation[0]['id'])

  }

       getDonationCount(){
        const ABI_PatientMR = [
          {
            "constant": true,
            "inputs": [],
            "name": "surgeriesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "emergencyContactsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "hospitalName",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "diagnosisesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_surgeryName",
                "type": "string"
              },
              {
                "name": "_mainDoctor",
                "type": "string"
              },
              {
                "name": "_duration",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_surgeryInformation",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addSurgery",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "drugPrescribtions",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "drugList",
                "type": "string"
              },
              {
                "name": "drugListCount",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "radiologies",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "radiologist",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "radiologyType",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "laboratoryTestsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "submissionDate",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "medicalRecordAddress",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "dateOfBirth",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "phoneNumber",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "gender",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "diagnosises",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "diognosisDescription",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "bloodDonations",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "donationType",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "amount",
                "type": "uint256"
              },
              {
                "name": "fileHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_drugList",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDrugPrescribtion",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_diognosisDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDiagnosis",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "emergencyContacts",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_radiologistName",
                "type": "string"
              },
              {
                "name": "_radiologyType",
                "type": "string"
              },
              {
                "name": "_description",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addRadiology",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodDonationsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_donationType",
                "type": "string"
              },
              {
                "name": "_amount",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addBloodDonation",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "_testType",
                "type": "string"
              },
              {
                "name": "_laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addLaboratoryTest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "nationalID",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "drugPrescribtionsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "surgeries",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "mainDoctor",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "surgeryInformation",
                "type": "string"
              },
              {
                "name": "duration",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "surgeryName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodType",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "laboratoryTests",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "testType",
                "type": "string"
              },
              {
                "name": "laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "testHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_phoneNumber",
                "type": "string"
              }
            ],
            "name": "addEmergencyContact",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "radiologiesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "nationalIDI",
                "type": "uint256"
              },
              {
                "name": "nameI",
                "type": "string"
              },
              {
                "name": "birthDateI",
                "type": "uint256"
              },
              {
                "name": "phoneNumberI",
                "type": "string"
              },
              {
                "name": "genderI",
                "type": "string"
              },
              {
                "name": "bloodTypeI",
                "type": "string"
              },
              {
                "name": "emergencyContactI",
                "type": "string"
              },
              {
                "name": "hospitalNameI",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ];

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });



        //Hospital Address  /Fetch Patient BloodDonation
        mycontract.methods.bloodDonationsCount.call({from: this.Hospital_Address},(error , result) => {
          if(!error)
            // console.log( result);
            this.BloodDonationCount =  result;
          else
            console.log(error);
        });
        }

  //get Diagnosis Data
    async getDiagnosises(){
        const ABI_PatientMR = [
          {
            "constant": true,
            "inputs": [],
            "name": "surgeriesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "emergencyContactsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "hospitalName",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "diagnosisesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_surgeryName",
                "type": "string"
              },
              {
                "name": "_mainDoctor",
                "type": "string"
              },
              {
                "name": "_duration",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_surgeryInformation",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addSurgery",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "drugPrescribtions",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "drugList",
                "type": "string"
              },
              {
                "name": "drugListCount",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "radiologies",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "radiologist",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "radiologyType",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "laboratoryTestsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "submissionDate",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "medicalRecordAddress",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "dateOfBirth",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "phoneNumber",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "gender",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "diagnosises",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "diognosisDescription",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "bloodDonations",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "donationType",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "amount",
                "type": "uint256"
              },
              {
                "name": "fileHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_drugList",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDrugPrescribtion",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_diognosisDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDiagnosis",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "emergencyContacts",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_radiologistName",
                "type": "string"
              },
              {
                "name": "_radiologyType",
                "type": "string"
              },
              {
                "name": "_description",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addRadiology",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodDonationsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_donationType",
                "type": "string"
              },
              {
                "name": "_amount",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addBloodDonation",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "_testType",
                "type": "string"
              },
              {
                "name": "_laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addLaboratoryTest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "nationalID",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "drugPrescribtionsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "surgeries",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "mainDoctor",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "surgeryInformation",
                "type": "string"
              },
              {
                "name": "duration",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "surgeryName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodType",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "laboratoryTests",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "testType",
                "type": "string"
              },
              {
                "name": "laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "testHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_phoneNumber",
                "type": "string"
              }
            ],
            "name": "addEmergencyContact",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "radiologiesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "nationalIDI",
                "type": "uint256"
              },
              {
                "name": "nameI",
                "type": "string"
              },
              {
                "name": "birthDateI",
                "type": "uint256"
              },
              {
                "name": "phoneNumberI",
                "type": "string"
              },
              {
                "name": "genderI",
                "type": "string"
              },
              {
                "name": "bloodTypeI",
                "type": "string"
              },
              {
                "name": "emergencyContactI",
                "type": "string"
              },
              {
                "name": "hospitalNameI",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ];

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });

        this.getDiagnosisesCount();
        await new Promise(resolve => setTimeout(
            ()=>resolve(), 300));


        //Fetch Patient diagnosises
        for (let i =0 ; i< this.diagnosisesCount ; i++){
          mycontract.methods.diagnosises(i).call({from: this.Hospital_Address},(error , result) => {
            if(!error)
              this.P_diagnosises[i] =  result;
            else
              console.log(error);
          });
        }
        await new Promise(resolve => setTimeout(
            ()=>resolve(), 300));

        console.log(this.P_diagnosises[0])

  }

      getDiagnosisesCount(){
        const ABI_PatientMR = [
          {
            "constant": true,
            "inputs": [],
            "name": "surgeriesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "emergencyContactsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "hospitalName",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "diagnosisesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_surgeryName",
                "type": "string"
              },
              {
                "name": "_mainDoctor",
                "type": "string"
              },
              {
                "name": "_duration",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_surgeryInformation",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addSurgery",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "drugPrescribtions",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "drugList",
                "type": "string"
              },
              {
                "name": "drugListCount",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "radiologies",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "radiologist",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "radiologyType",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "laboratoryTestsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "submissionDate",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "medicalRecordAddress",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "dateOfBirth",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "phoneNumber",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "gender",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "diagnosises",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "diognosisDescription",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "bloodDonations",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "donationType",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "amount",
                "type": "uint256"
              },
              {
                "name": "fileHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_drugList",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDrugPrescribtion",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_diognosisDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDiagnosis",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "emergencyContacts",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_radiologistName",
                "type": "string"
              },
              {
                "name": "_radiologyType",
                "type": "string"
              },
              {
                "name": "_description",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addRadiology",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodDonationsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_donationType",
                "type": "string"
              },
              {
                "name": "_amount",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addBloodDonation",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "_testType",
                "type": "string"
              },
              {
                "name": "_laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addLaboratoryTest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "nationalID",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "drugPrescribtionsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "surgeries",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "mainDoctor",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "surgeryInformation",
                "type": "string"
              },
              {
                "name": "duration",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "surgeryName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodType",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "laboratoryTests",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "testType",
                "type": "string"
              },
              {
                "name": "laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "testHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_phoneNumber",
                "type": "string"
              }
            ],
            "name": "addEmergencyContact",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "radiologiesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "nationalIDI",
                "type": "uint256"
              },
              {
                "name": "nameI",
                "type": "string"
              },
              {
                "name": "birthDateI",
                "type": "uint256"
              },
              {
                "name": "phoneNumberI",
                "type": "string"
              },
              {
                "name": "genderI",
                "type": "string"
              },
              {
                "name": "bloodTypeI",
                "type": "string"
              },
              {
                "name": "emergencyContactI",
                "type": "string"
              },
              {
                "name": "hospitalNameI",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ];

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });



        //Hospital Address  /Fetch Patient diagnosisesCount
        mycontract.methods.diagnosisesCount.call({from: this.Hospital_Address},(error , result) => {
          if(!error)
          // console.log( result);
            this.diagnosisesCount =  result;
          else
            console.log(error);
        });
      }

  //get Surgery Data
    async getSurgeries(){
      const ABI_PatientMR = [
        {
          "constant": true,
          "inputs": [],
          "name": "surgeriesCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "emergencyContactsCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "hospitalName",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "diagnosisesCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_surgeryName",
              "type": "string"
            },
            {
              "name": "_mainDoctor",
              "type": "string"
            },
            {
              "name": "_duration",
              "type": "uint256"
            },
            {
              "name": "_fileHash",
              "type": "string"
            },
            {
              "name": "_surgeryInformation",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addSurgery",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "drugPrescribtions",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "doctorName",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "drugList",
              "type": "string"
            },
            {
              "name": "drugListCount",
              "type": "uint256"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "radiologies",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "radiologist",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "radiologyType",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "fileHash",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "laboratoryTestsCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "submissionDate",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "medicalRecordAddress",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "dateOfBirth",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "phoneNumber",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "gender",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "diagnosises",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "doctorName",
              "type": "string"
            },
            {
              "name": "diognosisDescription",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            },
            {
              "name": "fileHash",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "bloodDonations",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "doctorName",
              "type": "string"
            },
            {
              "name": "donationType",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "fileHash",
              "type": "string"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_doctorName",
              "type": "string"
            },
            {
              "name": "_drugList",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addDrugPrescribtion",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_doctorName",
              "type": "string"
            },
            {
              "name": "_diognosisDescription",
              "type": "string"
            },
            {
              "name": "_fileHash",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addDiagnosis",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "emergencyContacts",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_radiologistName",
              "type": "string"
            },
            {
              "name": "_radiologyType",
              "type": "string"
            },
            {
              "name": "_description",
              "type": "string"
            },
            {
              "name": "_fileHash",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addRadiology",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "bloodDonationsCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_doctorName",
              "type": "string"
            },
            {
              "name": "_donationType",
              "type": "string"
            },
            {
              "name": "_amount",
              "type": "uint256"
            },
            {
              "name": "_fileHash",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addBloodDonation",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_laboratoryWorkerName",
              "type": "string"
            },
            {
              "name": "_testType",
              "type": "string"
            },
            {
              "name": "_laboratoryTestDescription",
              "type": "string"
            },
            {
              "name": "_fileHash",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addLaboratoryTest",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "nationalID",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "drugPrescribtionsCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "surgeries",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "mainDoctor",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "surgeryInformation",
              "type": "string"
            },
            {
              "name": "duration",
              "type": "uint256"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "surgeryName",
              "type": "string"
            },
            {
              "name": "fileHash",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "bloodType",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "laboratoryTests",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "laboratoryWorkerName",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "testType",
              "type": "string"
            },
            {
              "name": "laboratoryTestDescription",
              "type": "string"
            },
            {
              "name": "testHash",
              "type": "string"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_phoneNumber",
              "type": "string"
            }
          ],
          "name": "addEmergencyContact",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "radiologiesCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "name": "nationalIDI",
              "type": "uint256"
            },
            {
              "name": "nameI",
              "type": "string"
            },
            {
              "name": "birthDateI",
              "type": "uint256"
            },
            {
              "name": "phoneNumberI",
              "type": "string"
            },
            {
              "name": "genderI",
              "type": "string"
            },
            {
              "name": "bloodTypeI",
              "type": "string"
            },
            {
              "name": "emergencyContactI",
              "type": "string"
            },
            {
              "name": "hospitalNameI",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        }
      ];

      const address = this.P_Address;

      const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
        from: address ,
        gasPrice: '100000000'
      });

      this.getSurgeriesCount();
      await new Promise(resolve => setTimeout(
          ()=>resolve(), 300));


      //Fetch Patient surgeries
      for (let i =0 ; i< this.surgeriesCount ; i++){
        mycontract.methods.surgeries(i).call({from: this.Hospital_Address},(error , result) => {
          if(!error)
            this.P_surgeries[i] =  result;
          else
            console.log(error);
        });
      }
      await new Promise(resolve => setTimeout(
          ()=>resolve(), 300));

      console.log(this.P_surgeries[0])

    }

      getSurgeriesCount(){
        const ABI_PatientMR = [
          {
            "constant": true,
            "inputs": [],
            "name": "surgeriesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "emergencyContactsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "hospitalName",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "diagnosisesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_surgeryName",
                "type": "string"
              },
              {
                "name": "_mainDoctor",
                "type": "string"
              },
              {
                "name": "_duration",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_surgeryInformation",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addSurgery",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "drugPrescribtions",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "drugList",
                "type": "string"
              },
              {
                "name": "drugListCount",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "radiologies",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "radiologist",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "radiologyType",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "laboratoryTestsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "submissionDate",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "medicalRecordAddress",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "dateOfBirth",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "phoneNumber",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "gender",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "diagnosises",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "diognosisDescription",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "bloodDonations",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "donationType",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "amount",
                "type": "uint256"
              },
              {
                "name": "fileHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_drugList",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDrugPrescribtion",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_diognosisDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDiagnosis",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "emergencyContacts",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_radiologistName",
                "type": "string"
              },
              {
                "name": "_radiologyType",
                "type": "string"
              },
              {
                "name": "_description",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addRadiology",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodDonationsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_donationType",
                "type": "string"
              },
              {
                "name": "_amount",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addBloodDonation",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "_testType",
                "type": "string"
              },
              {
                "name": "_laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addLaboratoryTest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "nationalID",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "drugPrescribtionsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "surgeries",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "mainDoctor",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "surgeryInformation",
                "type": "string"
              },
              {
                "name": "duration",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "surgeryName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodType",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "laboratoryTests",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "testType",
                "type": "string"
              },
              {
                "name": "laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "testHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_phoneNumber",
                "type": "string"
              }
            ],
            "name": "addEmergencyContact",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "radiologiesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "nationalIDI",
                "type": "uint256"
              },
              {
                "name": "nameI",
                "type": "string"
              },
              {
                "name": "birthDateI",
                "type": "uint256"
              },
              {
                "name": "phoneNumberI",
                "type": "string"
              },
              {
                "name": "genderI",
                "type": "string"
              },
              {
                "name": "bloodTypeI",
                "type": "string"
              },
              {
                "name": "emergencyContactI",
                "type": "string"
              },
              {
                "name": "hospitalNameI",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ];

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });



        //Hospital Address  /Fetch Patient diagnosisesCount
        mycontract.methods.surgeriesCount.call({from: this.Hospital_Address},(error , result) => {
          if(!error)
          // console.log( result);
            this.surgeriesCount =  result;
          else
            console.log(error);
        });
      }

  //get Radiology Data
    async getRadiology(){
      const ABI_PatientMR = [
        {
          "constant": true,
          "inputs": [],
          "name": "surgeriesCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "emergencyContactsCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "hospitalName",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "diagnosisesCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_surgeryName",
              "type": "string"
            },
            {
              "name": "_mainDoctor",
              "type": "string"
            },
            {
              "name": "_duration",
              "type": "uint256"
            },
            {
              "name": "_fileHash",
              "type": "string"
            },
            {
              "name": "_surgeryInformation",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addSurgery",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "drugPrescribtions",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "doctorName",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "drugList",
              "type": "string"
            },
            {
              "name": "drugListCount",
              "type": "uint256"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "radiologies",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "radiologist",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "radiologyType",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "fileHash",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "laboratoryTestsCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "submissionDate",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "medicalRecordAddress",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "dateOfBirth",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "phoneNumber",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "gender",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "diagnosises",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "doctorName",
              "type": "string"
            },
            {
              "name": "diognosisDescription",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            },
            {
              "name": "fileHash",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "bloodDonations",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "doctorName",
              "type": "string"
            },
            {
              "name": "donationType",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "fileHash",
              "type": "string"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_doctorName",
              "type": "string"
            },
            {
              "name": "_drugList",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addDrugPrescribtion",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_doctorName",
              "type": "string"
            },
            {
              "name": "_diognosisDescription",
              "type": "string"
            },
            {
              "name": "_fileHash",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addDiagnosis",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "emergencyContacts",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_radiologistName",
              "type": "string"
            },
            {
              "name": "_radiologyType",
              "type": "string"
            },
            {
              "name": "_description",
              "type": "string"
            },
            {
              "name": "_fileHash",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addRadiology",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "bloodDonationsCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_doctorName",
              "type": "string"
            },
            {
              "name": "_donationType",
              "type": "string"
            },
            {
              "name": "_amount",
              "type": "uint256"
            },
            {
              "name": "_fileHash",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addBloodDonation",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_hospitalName",
              "type": "string"
            },
            {
              "name": "_laboratoryWorkerName",
              "type": "string"
            },
            {
              "name": "_testType",
              "type": "string"
            },
            {
              "name": "_laboratoryTestDescription",
              "type": "string"
            },
            {
              "name": "_fileHash",
              "type": "string"
            },
            {
              "name": "_isCorrectionFor",
              "type": "string"
            }
          ],
          "name": "addLaboratoryTest",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "nationalID",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "drugPrescribtionsCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "surgeries",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "mainDoctor",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "surgeryInformation",
              "type": "string"
            },
            {
              "name": "duration",
              "type": "uint256"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "surgeryName",
              "type": "string"
            },
            {
              "name": "fileHash",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "bloodType",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "laboratoryTests",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "hospitalName",
              "type": "string"
            },
            {
              "name": "laboratoryWorkerName",
              "type": "string"
            },
            {
              "name": "date",
              "type": "uint256"
            },
            {
              "name": "testType",
              "type": "string"
            },
            {
              "name": "laboratoryTestDescription",
              "type": "string"
            },
            {
              "name": "testHash",
              "type": "string"
            },
            {
              "name": "isCorrectionFor",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_phoneNumber",
              "type": "string"
            }
          ],
          "name": "addEmergencyContact",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "radiologiesCount",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "name": "nationalIDI",
              "type": "uint256"
            },
            {
              "name": "nameI",
              "type": "string"
            },
            {
              "name": "birthDateI",
              "type": "uint256"
            },
            {
              "name": "phoneNumberI",
              "type": "string"
            },
            {
              "name": "genderI",
              "type": "string"
            },
            {
              "name": "bloodTypeI",
              "type": "string"
            },
            {
              "name": "emergencyContactI",
              "type": "string"
            },
            {
              "name": "hospitalNameI",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        }
      ];

      const address = this.P_Address;

      const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
        from: address ,
        gasPrice: '100000000'
      });

      this.getRadiologyCount();
      await new Promise(resolve => setTimeout(
          ()=>resolve(), 300));


      //Fetch Patient radiologie
      for (let i =0 ; i< this.radiologiesCount ; i++){
        mycontract.methods.radiologies(i).call({from: this.Hospital_Address},(error , result) => {
          if(!error)
            this.P_Radiologies[i] =  result;
          else
            console.log(error);
        });
      }
      await new Promise(resolve => setTimeout(
          ()=>resolve(), 300));

      console.log(this.P_Radiologies[0])

    }

      getRadiologyCount(){
        const ABI_PatientMR = [
          {
            "constant": true,
            "inputs": [],
            "name": "surgeriesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "emergencyContactsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "hospitalName",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "diagnosisesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_surgeryName",
                "type": "string"
              },
              {
                "name": "_mainDoctor",
                "type": "string"
              },
              {
                "name": "_duration",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_surgeryInformation",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addSurgery",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "drugPrescribtions",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "drugList",
                "type": "string"
              },
              {
                "name": "drugListCount",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "radiologies",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "radiologist",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "radiologyType",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "laboratoryTestsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "submissionDate",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "medicalRecordAddress",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "dateOfBirth",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "phoneNumber",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "gender",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "diagnosises",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "diognosisDescription",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "bloodDonations",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "donationType",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "amount",
                "type": "uint256"
              },
              {
                "name": "fileHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_drugList",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDrugPrescribtion",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_diognosisDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDiagnosis",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "emergencyContacts",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_radiologistName",
                "type": "string"
              },
              {
                "name": "_radiologyType",
                "type": "string"
              },
              {
                "name": "_description",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addRadiology",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodDonationsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_donationType",
                "type": "string"
              },
              {
                "name": "_amount",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addBloodDonation",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "_testType",
                "type": "string"
              },
              {
                "name": "_laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addLaboratoryTest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "nationalID",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "drugPrescribtionsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "surgeries",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "mainDoctor",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "surgeryInformation",
                "type": "string"
              },
              {
                "name": "duration",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "surgeryName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodType",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "laboratoryTests",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "testType",
                "type": "string"
              },
              {
                "name": "laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "testHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_phoneNumber",
                "type": "string"
              }
            ],
            "name": "addEmergencyContact",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "radiologiesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "nationalIDI",
                "type": "uint256"
              },
              {
                "name": "nameI",
                "type": "string"
              },
              {
                "name": "birthDateI",
                "type": "uint256"
              },
              {
                "name": "phoneNumberI",
                "type": "string"
              },
              {
                "name": "genderI",
                "type": "string"
              },
              {
                "name": "bloodTypeI",
                "type": "string"
              },
              {
                "name": "emergencyContactI",
                "type": "string"
              },
              {
                "name": "hospitalNameI",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ];

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });



        //Hospital Address  /Fetch Patient diagnosisesCount
        mycontract.methods.radiologiesCount.call({from: this.Hospital_Address},(error , result) => {
          if(!error)
          // console.log( result);
            this.radiologiesCount =  result;
          else
            console.log(error);
        });
      }

      //get LanTest Data
      async getLabTest(){
        const ABI_PatientMR = [
          {
            "constant": true,
            "inputs": [],
            "name": "surgeriesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "emergencyContactsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "hospitalName",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "diagnosisesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_surgeryName",
                "type": "string"
              },
              {
                "name": "_mainDoctor",
                "type": "string"
              },
              {
                "name": "_duration",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_surgeryInformation",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addSurgery",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "drugPrescribtions",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "drugList",
                "type": "string"
              },
              {
                "name": "drugListCount",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "radiologies",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "radiologist",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "radiologyType",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "laboratoryTestsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "submissionDate",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "medicalRecordAddress",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "dateOfBirth",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "phoneNumber",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "gender",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "diagnosises",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "diognosisDescription",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "bloodDonations",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "donationType",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "amount",
                "type": "uint256"
              },
              {
                "name": "fileHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_drugList",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDrugPrescribtion",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_diognosisDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDiagnosis",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "emergencyContacts",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_radiologistName",
                "type": "string"
              },
              {
                "name": "_radiologyType",
                "type": "string"
              },
              {
                "name": "_description",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addRadiology",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodDonationsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_donationType",
                "type": "string"
              },
              {
                "name": "_amount",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addBloodDonation",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "_testType",
                "type": "string"
              },
              {
                "name": "_laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addLaboratoryTest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "nationalID",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "drugPrescribtionsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "surgeries",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "mainDoctor",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "surgeryInformation",
                "type": "string"
              },
              {
                "name": "duration",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "surgeryName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodType",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "laboratoryTests",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "testType",
                "type": "string"
              },
              {
                "name": "laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "testHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_phoneNumber",
                "type": "string"
              }
            ],
            "name": "addEmergencyContact",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "radiologiesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "nationalIDI",
                "type": "uint256"
              },
              {
                "name": "nameI",
                "type": "string"
              },
              {
                "name": "birthDateI",
                "type": "uint256"
              },
              {
                "name": "phoneNumberI",
                "type": "string"
              },
              {
                "name": "genderI",
                "type": "string"
              },
              {
                "name": "bloodTypeI",
                "type": "string"
              },
              {
                "name": "emergencyContactI",
                "type": "string"
              },
              {
                "name": "hospitalNameI",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ];

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });

        this.getLabTestCount();
        await new Promise(resolve => setTimeout(
            ()=>resolve(), 300));


        //Fetch Patient LabTest
        for (let i =0 ; i< this.LabTestCount ; i++){
          mycontract.methods.laboratoryTests(i).call({from: this.Hospital_Address},(error , result) => {
            if(!error)
              this.P_LabTest[i] =  result;
            else
              console.log(error);
          });
        }
        await new Promise(resolve => setTimeout(
            ()=>resolve(), 300));

        console.log(this.P_LabTest[0])

      }

  getLabTestCount(){
    const ABI_PatientMR = [
      {
        "constant": true,
        "inputs": [],
        "name": "surgeriesCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "emergencyContactsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "hospitalName",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "diagnosisesCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_surgeryName",
            "type": "string"
          },
          {
            "name": "_mainDoctor",
            "type": "string"
          },
          {
            "name": "_duration",
            "type": "uint256"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_surgeryInformation",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addSurgery",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "drugPrescribtions",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "doctorName",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "drugList",
            "type": "string"
          },
          {
            "name": "drugListCount",
            "type": "uint256"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "radiologies",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "radiologist",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "radiologyType",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "fileHash",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "laboratoryTestsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "submissionDate",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "medicalRecordAddress",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "dateOfBirth",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "phoneNumber",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "gender",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "diagnosises",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "doctorName",
            "type": "string"
          },
          {
            "name": "diognosisDescription",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          },
          {
            "name": "fileHash",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "bloodDonations",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "doctorName",
            "type": "string"
          },
          {
            "name": "donationType",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "amount",
            "type": "uint256"
          },
          {
            "name": "fileHash",
            "type": "string"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_doctorName",
            "type": "string"
          },
          {
            "name": "_drugList",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addDrugPrescribtion",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_doctorName",
            "type": "string"
          },
          {
            "name": "_diognosisDescription",
            "type": "string"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addDiagnosis",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "emergencyContacts",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_radiologistName",
            "type": "string"
          },
          {
            "name": "_radiologyType",
            "type": "string"
          },
          {
            "name": "_description",
            "type": "string"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addRadiology",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "bloodDonationsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_doctorName",
            "type": "string"
          },
          {
            "name": "_donationType",
            "type": "string"
          },
          {
            "name": "_amount",
            "type": "uint256"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addBloodDonation",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_hospitalName",
            "type": "string"
          },
          {
            "name": "_laboratoryWorkerName",
            "type": "string"
          },
          {
            "name": "_testType",
            "type": "string"
          },
          {
            "name": "_laboratoryTestDescription",
            "type": "string"
          },
          {
            "name": "_fileHash",
            "type": "string"
          },
          {
            "name": "_isCorrectionFor",
            "type": "string"
          }
        ],
        "name": "addLaboratoryTest",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "nationalID",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "drugPrescribtionsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "surgeries",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "mainDoctor",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "surgeryInformation",
            "type": "string"
          },
          {
            "name": "duration",
            "type": "uint256"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "surgeryName",
            "type": "string"
          },
          {
            "name": "fileHash",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "bloodType",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "laboratoryTests",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "hospitalName",
            "type": "string"
          },
          {
            "name": "laboratoryWorkerName",
            "type": "string"
          },
          {
            "name": "date",
            "type": "uint256"
          },
          {
            "name": "testType",
            "type": "string"
          },
          {
            "name": "laboratoryTestDescription",
            "type": "string"
          },
          {
            "name": "testHash",
            "type": "string"
          },
          {
            "name": "isCorrectionFor",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_phoneNumber",
            "type": "string"
          }
        ],
        "name": "addEmergencyContact",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "radiologiesCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "nationalIDI",
            "type": "uint256"
          },
          {
            "name": "nameI",
            "type": "string"
          },
          {
            "name": "birthDateI",
            "type": "uint256"
          },
          {
            "name": "phoneNumberI",
            "type": "string"
          },
          {
            "name": "genderI",
            "type": "string"
          },
          {
            "name": "bloodTypeI",
            "type": "string"
          },
          {
            "name": "emergencyContactI",
            "type": "string"
          },
          {
            "name": "hospitalNameI",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      }
    ];

    const address = this.P_Address;

    const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
      from: address ,
      gasPrice: '100000000'
    });



    //Hospital Address  /Fetch Patient LabTestCount
    mycontract.methods.laboratoryTestsCount.call({from: this.Hospital_Address},(error , result) => {
      if(!error)
      // console.log( result);
        this.LabTestCount =  result;
      else
        console.log(error);
    });
  }

  //get DrugPrescribtion Data
      async getDrugPrescribtion(){
        const ABI_PatientMR = [
          {
            "constant": true,
            "inputs": [],
            "name": "surgeriesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "emergencyContactsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "hospitalName",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "diagnosisesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_surgeryName",
                "type": "string"
              },
              {
                "name": "_mainDoctor",
                "type": "string"
              },
              {
                "name": "_duration",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_surgeryInformation",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addSurgery",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "drugPrescribtions",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "drugList",
                "type": "string"
              },
              {
                "name": "drugListCount",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "radiologies",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "radiologist",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "radiologyType",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "laboratoryTestsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "submissionDate",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "medicalRecordAddress",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "dateOfBirth",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "phoneNumber",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "gender",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "diagnosises",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "diognosisDescription",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "bloodDonations",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "donationType",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "amount",
                "type": "uint256"
              },
              {
                "name": "fileHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_drugList",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDrugPrescribtion",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_diognosisDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDiagnosis",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "emergencyContacts",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_radiologistName",
                "type": "string"
              },
              {
                "name": "_radiologyType",
                "type": "string"
              },
              {
                "name": "_description",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addRadiology",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodDonationsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_donationType",
                "type": "string"
              },
              {
                "name": "_amount",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addBloodDonation",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "_testType",
                "type": "string"
              },
              {
                "name": "_laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addLaboratoryTest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "nationalID",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "drugPrescribtionsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "surgeries",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "mainDoctor",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "surgeryInformation",
                "type": "string"
              },
              {
                "name": "duration",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "surgeryName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodType",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "laboratoryTests",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "testType",
                "type": "string"
              },
              {
                "name": "laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "testHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_phoneNumber",
                "type": "string"
              }
            ],
            "name": "addEmergencyContact",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "radiologiesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "nationalIDI",
                "type": "uint256"
              },
              {
                "name": "nameI",
                "type": "string"
              },
              {
                "name": "birthDateI",
                "type": "uint256"
              },
              {
                "name": "phoneNumberI",
                "type": "string"
              },
              {
                "name": "genderI",
                "type": "string"
              },
              {
                "name": "bloodTypeI",
                "type": "string"
              },
              {
                "name": "emergencyContactI",
                "type": "string"
              },
              {
                "name": "hospitalNameI",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ];

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });

        this.getDrugPrescribtionCount();
        await new Promise(resolve => setTimeout(
            ()=>resolve(), 300));


        //Fetch Patient drugPrescribtions
        for (let i =0 ; i< this.drugPrescribtionsCount ; i++){
          mycontract.methods.drugPrescribtions(i).call({from: this.Hospital_Address},(error , result) => {
            if(!error)
              this.P_drugPrescribtions[i] =  result;
            else
              console.log(error);
          });
        }
        await new Promise(resolve => setTimeout(
            ()=>resolve(), 300));

        console.log(this.P_drugPrescribtions[0])

      }

      getDrugPrescribtionCount(){
        const ABI_PatientMR = [
          {
            "constant": true,
            "inputs": [],
            "name": "surgeriesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "emergencyContactsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "hospitalName",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "diagnosisesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_surgeryName",
                "type": "string"
              },
              {
                "name": "_mainDoctor",
                "type": "string"
              },
              {
                "name": "_duration",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_surgeryInformation",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addSurgery",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "drugPrescribtions",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "drugList",
                "type": "string"
              },
              {
                "name": "drugListCount",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "radiologies",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "radiologist",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "radiologyType",
                "type": "string"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "laboratoryTestsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "submissionDate",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "medicalRecordAddress",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "dateOfBirth",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "phoneNumber",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "gender",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "diagnosises",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "diognosisDescription",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "bloodDonations",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "doctorName",
                "type": "string"
              },
              {
                "name": "donationType",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "amount",
                "type": "uint256"
              },
              {
                "name": "fileHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_drugList",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDrugPrescribtion",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_diognosisDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addDiagnosis",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "emergencyContacts",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_radiologistName",
                "type": "string"
              },
              {
                "name": "_radiologyType",
                "type": "string"
              },
              {
                "name": "_description",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addRadiology",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodDonationsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_doctorName",
                "type": "string"
              },
              {
                "name": "_donationType",
                "type": "string"
              },
              {
                "name": "_amount",
                "type": "uint256"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addBloodDonation",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_hospitalName",
                "type": "string"
              },
              {
                "name": "_laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "_testType",
                "type": "string"
              },
              {
                "name": "_laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "_fileHash",
                "type": "string"
              },
              {
                "name": "_isCorrectionFor",
                "type": "string"
              }
            ],
            "name": "addLaboratoryTest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "nationalID",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "drugPrescribtionsCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "surgeries",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "mainDoctor",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "surgeryInformation",
                "type": "string"
              },
              {
                "name": "duration",
                "type": "uint256"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "surgeryName",
                "type": "string"
              },
              {
                "name": "fileHash",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "bloodType",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "laboratoryTests",
            "outputs": [
              {
                "name": "id",
                "type": "uint256"
              },
              {
                "name": "hospitalName",
                "type": "string"
              },
              {
                "name": "laboratoryWorkerName",
                "type": "string"
              },
              {
                "name": "date",
                "type": "uint256"
              },
              {
                "name": "testType",
                "type": "string"
              },
              {
                "name": "laboratoryTestDescription",
                "type": "string"
              },
              {
                "name": "testHash",
                "type": "string"
              },
              {
                "name": "isCorrectionFor",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_phoneNumber",
                "type": "string"
              }
            ],
            "name": "addEmergencyContact",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "radiologiesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "nationalIDI",
                "type": "uint256"
              },
              {
                "name": "nameI",
                "type": "string"
              },
              {
                "name": "birthDateI",
                "type": "uint256"
              },
              {
                "name": "phoneNumberI",
                "type": "string"
              },
              {
                "name": "genderI",
                "type": "string"
              },
              {
                "name": "bloodTypeI",
                "type": "string"
              },
              {
                "name": "emergencyContactI",
                "type": "string"
              },
              {
                "name": "hospitalNameI",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ];

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });



        //Hospital Address  /Fetch Patient DrugPrescribtionCount
        mycontract.methods.drugPrescribtionsCount.call({from: this.Hospital_Address},(error , result) => {
          if(!error)
          // console.log( result);
            this.drugPrescribtionsCount =  result;
          else
            console.log(error);
        });
      }

     async getCorrection(){

         const ABI_PatientMR = [
             {
                 "constant": true,
                 "inputs": [],
                 "name": "surgeriesCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "name",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "emergencyContactsCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "hospitalName",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "diagnosisesCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_surgeryName",
                         "type": "string"
                     },
                     {
                         "name": "_mainDoctor",
                         "type": "string"
                     },
                     {
                         "name": "_duration",
                         "type": "uint256"
                     },
                     {
                         "name": "_fileHash",
                         "type": "string"
                     },
                     {
                         "name": "_surgeryInformation",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addSurgery",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "drugPrescribtions",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "doctorName",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "drugList",
                         "type": "string"
                     },
                     {
                         "name": "drugListCount",
                         "type": "uint256"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "radiologies",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "radiologist",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "radiologyType",
                         "type": "string"
                     },
                     {
                         "name": "description",
                         "type": "string"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "fileHash",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "laboratoryTestsCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "submissionDate",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "medicalRecordAddress",
                 "outputs": [
                     {
                         "name": "",
                         "type": "address"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "dateOfBirth",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "phoneNumber",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "gender",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "diagnosises",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "doctorName",
                         "type": "string"
                     },
                     {
                         "name": "diognosisDescription",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     },
                     {
                         "name": "fileHash",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "bloodDonations",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "doctorName",
                         "type": "string"
                     },
                     {
                         "name": "donationType",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "amount",
                         "type": "uint256"
                     },
                     {
                         "name": "fileHash",
                         "type": "string"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_doctorName",
                         "type": "string"
                     },
                     {
                         "name": "_drugList",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addDrugPrescribtion",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_doctorName",
                         "type": "string"
                     },
                     {
                         "name": "_diognosisDescription",
                         "type": "string"
                     },
                     {
                         "name": "_fileHash",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addDiagnosis",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "emergencyContacts",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_radiologistName",
                         "type": "string"
                     },
                     {
                         "name": "_radiologyType",
                         "type": "string"
                     },
                     {
                         "name": "_description",
                         "type": "string"
                     },
                     {
                         "name": "_fileHash",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addRadiology",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "bloodDonationsCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_doctorName",
                         "type": "string"
                     },
                     {
                         "name": "_donationType",
                         "type": "string"
                     },
                     {
                         "name": "_amount",
                         "type": "uint256"
                     },
                     {
                         "name": "_fileHash",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addBloodDonation",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_laboratoryWorkerName",
                         "type": "string"
                     },
                     {
                         "name": "_testType",
                         "type": "string"
                     },
                     {
                         "name": "_laboratoryTestDescription",
                         "type": "string"
                     },
                     {
                         "name": "_fileHash",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addLaboratoryTest",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "nationalID",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "drugPrescribtionsCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "surgeries",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "mainDoctor",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "surgeryInformation",
                         "type": "string"
                     },
                     {
                         "name": "duration",
                         "type": "uint256"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "surgeryName",
                         "type": "string"
                     },
                     {
                         "name": "fileHash",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "bloodType",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "laboratoryTests",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "laboratoryWorkerName",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "testType",
                         "type": "string"
                     },
                     {
                         "name": "laboratoryTestDescription",
                         "type": "string"
                     },
                     {
                         "name": "testHash",
                         "type": "string"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_phoneNumber",
                         "type": "string"
                     }
                 ],
                 "name": "addEmergencyContact",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "radiologiesCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "inputs": [
                     {
                         "name": "nationalIDI",
                         "type": "uint256"
                     },
                     {
                         "name": "nameI",
                         "type": "string"
                     },
                     {
                         "name": "birthDateI",
                         "type": "uint256"
                     },
                     {
                         "name": "phoneNumberI",
                         "type": "string"
                     },
                     {
                         "name": "genderI",
                         "type": "string"
                     },
                     {
                         "name": "bloodTypeI",
                         "type": "string"
                     },
                     {
                         "name": "emergencyContactI",
                         "type": "string"
                     },
                     {
                         "name": "hospitalNameI",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "constructor"
             }
         ];

         const address = this.P_Address;

         const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
             from: address ,
             gasPrice: '100000000'
         });

        //Hospital Address  /Fetch Patient DrugPrescribtionCount
         mycontract.methods.drugPrescribtionsCount.call({from: this.Hospital_Address},(error , result) => {
             if(!error && result > 0)
                 this.drugPrescribtionsCount =  result;
         });
         //Hospital Address  /Fetch Patient LabTestCount
         mycontract.methods.laboratoryTestsCount.call({from: this.Hospital_Address},(error , result) => {
             if(!error && result > 0)
                 this.LabTestCount =  result;
         });
         //Hospital Address  /Fetch Patient diagnosisesCount
         mycontract.methods.radiologiesCount.call({from: this.Hospital_Address},(error , result) => {
             if(!error && result > 0)
                 this.radiologiesCount =  result;
         });
         //Hospital Address  /Fetch Patient diagnosisesCount
         mycontract.methods.surgeriesCount.call({from: this.Hospital_Address},(error , result) => {
             if(!error && result > 0)
                 this.surgeriesCount =  result;
         });
         //Hospital Address  /Fetch Patient diagnosisesCount
         mycontract.methods.diagnosisesCount.call({from: this.Hospital_Address},(error , result) => {
             if(!error && result > 0)
                 this.diagnosisesCount =  result;
         });
         //Hospital Address  /Fetch Patient BloodDonation
         mycontract.methods.bloodDonationsCount.call({from: this.Hospital_Address},(error , result) => {
             if(!error && result > 0)
                 this.BloodDonationCount =  result;
         });


        await new Promise(resolve => setTimeout(
             ()=>resolve(), 300));

        if(this.drugPrescribtionsCount > 0){
            let counter = 0;
            //Fetch Patient drugPrescribtions
            for (let i =0 ; i< this.drugPrescribtionsCount ; i++){
                mycontract.methods.drugPrescribtions(i).call({from: this.Hospital_Address}, async (error, result) => {
                    if (result['isCorrectionFor'] > 0 || result['isCorrectionFor'] == 'true')
                        this.Correction_drug[counter++] = result;
                    if (result['isCorrectionFor'] > 0) {
                        this.getIdCorrectionForDrug(result['isCorrectionFor']);
                        await new Promise(resolve => setTimeout(() => resolve(), 200));
                        if (this.N_Correction_LabTest['id'] == result['isCorrectionFor'])
                            this.Correction_drug[counter++] = this.N_Correction_drug;
                    } else
                        console.log(error);
                });
            }
            this.flagCorrectionDrug = true;
        }

        if(this.radiologiesCount > 0){
            let counter = 0;
            //Fetch Patient radiologie
            for (let i =0 ; i< this.radiologiesCount ; i++){
                mycontract.methods.radiologies(i).call({from: this.Hospital_Address}, async (error, result) => {
                    if (result['isCorrectionFor'] > 0 || result['isCorrectionFor'] == 'true')
                        this.Correction_Radiology[counter++] = result;
                    if (result['isCorrectionFor'] > 0) {
                        this.getIdCorrectionForRadiology(result['isCorrectionFor']);
                        await new Promise(resolve => setTimeout(() => resolve(), 200));
                        if (this.N_Correction_Radiology['id'] == result['isCorrectionFor'])
                            this.Correction_Radiology[counter++] = this.N_Correction_Radiology;
                    } else
                        console.log(error);
                });
            }
            this.flagCorrectionRadiology = true;
        }

        if(this.surgeriesCount > 0){
            let counter = 0;
            //Fetch Patient surgeries
            for (let i =0 ; i< this.surgeriesCount ; i++){
                mycontract.methods.surgeries(i).call({from: this.Hospital_Address}, async (error, result) => {
                    if (result['isCorrectionFor'] > 0 || result['isCorrectionFor'] == 'true')
                        this.Correction_surgery[counter++] = result;
                    if (result['isCorrectionFor'] > 0) {
                        this.getIdCorrectionForSurgery(result['isCorrectionFor']);
                        await new Promise(resolve => setTimeout(() => resolve(), 200));
                        if (this.N_Correction_surgery['id'] == result['isCorrectionFor'])
                            this.Correction_surgery[counter++] = this.N_Correction_surgery;
                    } else
                        console.log(error);
                });
            }
            this.flagCorrectionSurgery = true;
        }

        if(this.BloodDonationCount > 0){
            let counter = 0;
            //Fetch Patient BloodDonation
            for (let i =0 ; i< this.BloodDonationCount ; i++){
                mycontract.methods.bloodDonations(i).call({from: this.Hospital_Address}, async (error, result) => {
                    if (result['isCorrectionFor'] > 0 || result['isCorrectionFor'] == 'true')
                        this.Correction_BloodDonation[counter++] = result;
                    if (result['isCorrectionFor'] > 0) {
                        this.getIdCorrectionForBloodDonation(result['isCorrectionFor']);
                        await new Promise(resolve => setTimeout(() => resolve(), 200));
                        if (this.N_Correction_BloodDonation['id'] == result['isCorrectionFor'])
                            this.Correction_BloodDonation[counter++] = this.N_Correction_BloodDonation;
                    } else
                        console.log(error);
                });
            }
            this.flagCorrectionBloodDonation = true;
        }

        if(this.LabTestCount > 0){
            let counter = 0;
            //Fetch Patient LabTest
            for (let i =0 ; i< this.LabTestCount ; i++){
                mycontract.methods.laboratoryTests(i).call({from: this.Hospital_Address}, async (error, result) => {
                    if (result['isCorrectionFor'] > 0 || result['isCorrectionFor'] == 'true') {
                        this.Correction_labTest[counter++] = result;
                        if (result['isCorrectionFor'] > 0){
                            this.getIdCorrectionForLabTest(result['isCorrectionFor']);
                            await new Promise(resolve => setTimeout(() => resolve(), 200));
                            if(this.N_Correction_LabTest['id'] == result['isCorrectionFor']){
                                this.Correction_labTest[counter++] = this.N_Correction_LabTest;
                            }

                        }
                    } else
                        console.log(error);
                });

            }
            this.flagCorrectionLabTest = true;
        }

        if(this.diagnosisesCount > 0){
            let counter = 0;
            //Fetch Patient diagnosises
            for (let i =0 ; i< this.diagnosisesCount ; i++){
                mycontract.methods.diagnosises(i).call({from: this.Hospital_Address}, async (error, result) => {
                    if (result['isCorrectionFor'] > 0 || result['isCorrectionFor'] == 'true')
                        this.Correction_Diagnosises[counter++] = result;
                    if (result['isCorrectionFor'] > 0) {
                        this.getIdCorrectionForDiagnosises(result['isCorrectionFor']);
                        await new Promise(resolve => setTimeout(() => resolve(), 200));
                        if (this.N_Correction_Diagnosises['id'] == result['isCorrectionFor'])
                            this.Correction_Diagnosises[counter++] = this.N_Correction_Diagnosises;
                    } else
                        console.log(error);
                });
            }
            this.flagCorrectionDiagnosises = true;
        }

     }

     getIdCorrectionForLabTest(s){

          const ABI_PatientMR = [
              {
                  "constant": true,
                  "inputs": [],
                  "name": "surgeriesCount",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "name",
                  "outputs": [
                      {
                          "name": "",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "emergencyContactsCount",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "hospitalName",
                  "outputs": [
                      {
                          "name": "",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "diagnosisesCount",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [
                      {
                          "name": "_hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "_surgeryName",
                          "type": "string"
                      },
                      {
                          "name": "_mainDoctor",
                          "type": "string"
                      },
                      {
                          "name": "_duration",
                          "type": "uint256"
                      },
                      {
                          "name": "_fileHash",
                          "type": "string"
                      },
                      {
                          "name": "_surgeryInformation",
                          "type": "string"
                      },
                      {
                          "name": "_isCorrectionFor",
                          "type": "string"
                      }
                  ],
                  "name": "addSurgery",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "name": "drugPrescribtions",
                  "outputs": [
                      {
                          "name": "id",
                          "type": "uint256"
                      },
                      {
                          "name": "hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "doctorName",
                          "type": "string"
                      },
                      {
                          "name": "date",
                          "type": "uint256"
                      },
                      {
                          "name": "drugList",
                          "type": "string"
                      },
                      {
                          "name": "drugListCount",
                          "type": "uint256"
                      },
                      {
                          "name": "isCorrectionFor",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "name": "radiologies",
                  "outputs": [
                      {
                          "name": "id",
                          "type": "uint256"
                      },
                      {
                          "name": "radiologist",
                          "type": "string"
                      },
                      {
                          "name": "date",
                          "type": "uint256"
                      },
                      {
                          "name": "radiologyType",
                          "type": "string"
                      },
                      {
                          "name": "description",
                          "type": "string"
                      },
                      {
                          "name": "isCorrectionFor",
                          "type": "string"
                      },
                      {
                          "name": "hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "fileHash",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "laboratoryTestsCount",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "submissionDate",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "medicalRecordAddress",
                  "outputs": [
                      {
                          "name": "",
                          "type": "address"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "dateOfBirth",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "phoneNumber",
                  "outputs": [
                      {
                          "name": "",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "gender",
                  "outputs": [
                      {
                          "name": "",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "name": "diagnosises",
                  "outputs": [
                      {
                          "name": "id",
                          "type": "uint256"
                      },
                      {
                          "name": "hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "doctorName",
                          "type": "string"
                      },
                      {
                          "name": "diognosisDescription",
                          "type": "string"
                      },
                      {
                          "name": "date",
                          "type": "uint256"
                      },
                      {
                          "name": "isCorrectionFor",
                          "type": "string"
                      },
                      {
                          "name": "fileHash",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "name": "bloodDonations",
                  "outputs": [
                      {
                          "name": "id",
                          "type": "uint256"
                      },
                      {
                          "name": "hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "doctorName",
                          "type": "string"
                      },
                      {
                          "name": "donationType",
                          "type": "string"
                      },
                      {
                          "name": "date",
                          "type": "uint256"
                      },
                      {
                          "name": "amount",
                          "type": "uint256"
                      },
                      {
                          "name": "fileHash",
                          "type": "string"
                      },
                      {
                          "name": "isCorrectionFor",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [
                      {
                          "name": "_hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "_doctorName",
                          "type": "string"
                      },
                      {
                          "name": "_drugList",
                          "type": "string"
                      },
                      {
                          "name": "_isCorrectionFor",
                          "type": "string"
                      }
                  ],
                  "name": "addDrugPrescribtion",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [
                      {
                          "name": "_hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "_doctorName",
                          "type": "string"
                      },
                      {
                          "name": "_diognosisDescription",
                          "type": "string"
                      },
                      {
                          "name": "_fileHash",
                          "type": "string"
                      },
                      {
                          "name": "_isCorrectionFor",
                          "type": "string"
                      }
                  ],
                  "name": "addDiagnosis",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "name": "emergencyContacts",
                  "outputs": [
                      {
                          "name": "",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [
                      {
                          "name": "_hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "_radiologistName",
                          "type": "string"
                      },
                      {
                          "name": "_radiologyType",
                          "type": "string"
                      },
                      {
                          "name": "_description",
                          "type": "string"
                      },
                      {
                          "name": "_fileHash",
                          "type": "string"
                      },
                      {
                          "name": "_isCorrectionFor",
                          "type": "string"
                      }
                  ],
                  "name": "addRadiology",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "bloodDonationsCount",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [
                      {
                          "name": "_hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "_doctorName",
                          "type": "string"
                      },
                      {
                          "name": "_donationType",
                          "type": "string"
                      },
                      {
                          "name": "_amount",
                          "type": "uint256"
                      },
                      {
                          "name": "_fileHash",
                          "type": "string"
                      },
                      {
                          "name": "_isCorrectionFor",
                          "type": "string"
                      }
                  ],
                  "name": "addBloodDonation",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [
                      {
                          "name": "_hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "_laboratoryWorkerName",
                          "type": "string"
                      },
                      {
                          "name": "_testType",
                          "type": "string"
                      },
                      {
                          "name": "_laboratoryTestDescription",
                          "type": "string"
                      },
                      {
                          "name": "_fileHash",
                          "type": "string"
                      },
                      {
                          "name": "_isCorrectionFor",
                          "type": "string"
                      }
                  ],
                  "name": "addLaboratoryTest",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "nationalID",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "drugPrescribtionsCount",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "name": "surgeries",
                  "outputs": [
                      {
                          "name": "id",
                          "type": "uint256"
                      },
                      {
                          "name": "mainDoctor",
                          "type": "string"
                      },
                      {
                          "name": "date",
                          "type": "uint256"
                      },
                      {
                          "name": "surgeryInformation",
                          "type": "string"
                      },
                      {
                          "name": "duration",
                          "type": "uint256"
                      },
                      {
                          "name": "isCorrectionFor",
                          "type": "string"
                      },
                      {
                          "name": "hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "surgeryName",
                          "type": "string"
                      },
                      {
                          "name": "fileHash",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "bloodType",
                  "outputs": [
                      {
                          "name": "",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "name": "laboratoryTests",
                  "outputs": [
                      {
                          "name": "id",
                          "type": "uint256"
                      },
                      {
                          "name": "hospitalName",
                          "type": "string"
                      },
                      {
                          "name": "laboratoryWorkerName",
                          "type": "string"
                      },
                      {
                          "name": "date",
                          "type": "uint256"
                      },
                      {
                          "name": "testType",
                          "type": "string"
                      },
                      {
                          "name": "laboratoryTestDescription",
                          "type": "string"
                      },
                      {
                          "name": "testHash",
                          "type": "string"
                      },
                      {
                          "name": "isCorrectionFor",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "constant": false,
                  "inputs": [
                      {
                          "name": "_phoneNumber",
                          "type": "string"
                      }
                  ],
                  "name": "addEmergencyContact",
                  "outputs": [],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
              },
              {
                  "constant": true,
                  "inputs": [],
                  "name": "radiologiesCount",
                  "outputs": [
                      {
                          "name": "",
                          "type": "uint256"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
              },
              {
                  "inputs": [
                      {
                          "name": "nationalIDI",
                          "type": "uint256"
                      },
                      {
                          "name": "nameI",
                          "type": "string"
                      },
                      {
                          "name": "birthDateI",
                          "type": "uint256"
                      },
                      {
                          "name": "phoneNumberI",
                          "type": "string"
                      },
                      {
                          "name": "genderI",
                          "type": "string"
                      },
                      {
                          "name": "bloodTypeI",
                          "type": "string"
                      },
                      {
                          "name": "emergencyContactI",
                          "type": "string"
                      },
                      {
                          "name": "hospitalNameI",
                          "type": "string"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "constructor"
              }
          ];

          const address = this.P_Address;

          const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
              from: address ,
              gasPrice: '100000000'
          });

          for(let i = 0 ; i < this.LabTestCount ; i++){
              mycontract.methods.laboratoryTests(i).call({from: this.Hospital_Address},(error , result) => {
                  if(!error && result['id'] == s){
                      this.N_Correction_LabTest =  result;
                  }
              });
          }

     }

     getIdCorrectionForDrug(s){

            const ABI_PatientMR = [
                {
                    "constant": true,
                    "inputs": [],
                    "name": "surgeriesCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "emergencyContactsCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "hospitalName",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "diagnosisesCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_surgeryName",
                            "type": "string"
                        },
                        {
                            "name": "_mainDoctor",
                            "type": "string"
                        },
                        {
                            "name": "_duration",
                            "type": "uint256"
                        },
                        {
                            "name": "_fileHash",
                            "type": "string"
                        },
                        {
                            "name": "_surgeryInformation",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addSurgery",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "drugPrescribtions",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "doctorName",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "drugList",
                            "type": "string"
                        },
                        {
                            "name": "drugListCount",
                            "type": "uint256"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "radiologies",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "radiologist",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "radiologyType",
                            "type": "string"
                        },
                        {
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "fileHash",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "laboratoryTestsCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "submissionDate",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "medicalRecordAddress",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "dateOfBirth",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "phoneNumber",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "gender",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "diagnosises",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "doctorName",
                            "type": "string"
                        },
                        {
                            "name": "diognosisDescription",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        },
                        {
                            "name": "fileHash",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "bloodDonations",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "doctorName",
                            "type": "string"
                        },
                        {
                            "name": "donationType",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "name": "fileHash",
                            "type": "string"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_doctorName",
                            "type": "string"
                        },
                        {
                            "name": "_drugList",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addDrugPrescribtion",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_doctorName",
                            "type": "string"
                        },
                        {
                            "name": "_diognosisDescription",
                            "type": "string"
                        },
                        {
                            "name": "_fileHash",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addDiagnosis",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "emergencyContacts",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_radiologistName",
                            "type": "string"
                        },
                        {
                            "name": "_radiologyType",
                            "type": "string"
                        },
                        {
                            "name": "_description",
                            "type": "string"
                        },
                        {
                            "name": "_fileHash",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addRadiology",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "bloodDonationsCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_doctorName",
                            "type": "string"
                        },
                        {
                            "name": "_donationType",
                            "type": "string"
                        },
                        {
                            "name": "_amount",
                            "type": "uint256"
                        },
                        {
                            "name": "_fileHash",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addBloodDonation",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_laboratoryWorkerName",
                            "type": "string"
                        },
                        {
                            "name": "_testType",
                            "type": "string"
                        },
                        {
                            "name": "_laboratoryTestDescription",
                            "type": "string"
                        },
                        {
                            "name": "_fileHash",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addLaboratoryTest",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "nationalID",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "drugPrescribtionsCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "surgeries",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "mainDoctor",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "surgeryInformation",
                            "type": "string"
                        },
                        {
                            "name": "duration",
                            "type": "uint256"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "surgeryName",
                            "type": "string"
                        },
                        {
                            "name": "fileHash",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "bloodType",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "laboratoryTests",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "laboratoryWorkerName",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "testType",
                            "type": "string"
                        },
                        {
                            "name": "laboratoryTestDescription",
                            "type": "string"
                        },
                        {
                            "name": "testHash",
                            "type": "string"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_phoneNumber",
                            "type": "string"
                        }
                    ],
                    "name": "addEmergencyContact",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "radiologiesCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "name": "nationalIDI",
                            "type": "uint256"
                        },
                        {
                            "name": "nameI",
                            "type": "string"
                        },
                        {
                            "name": "birthDateI",
                            "type": "uint256"
                        },
                        {
                            "name": "phoneNumberI",
                            "type": "string"
                        },
                        {
                            "name": "genderI",
                            "type": "string"
                        },
                        {
                            "name": "bloodTypeI",
                            "type": "string"
                        },
                        {
                            "name": "emergencyContactI",
                            "type": "string"
                        },
                        {
                            "name": "hospitalNameI",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                }
            ];

            const address = this.P_Address;

            const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
                from: address ,
                gasPrice: '100000000'
            });

            for (let i =0 ; i< this.drugPrescribtionsCount ; i++){
                mycontract.methods.drugPrescribtions(i).call({from: this.Hospital_Address},(error , result) => {
                    if(!error && result['id'] == s){
                        this.N_Correction_drug =  result;
                    }
                });
            }

        }

     getIdCorrectionForRadiology(s){
            const ABI_PatientMR = [
                {
                    "constant": true,
                    "inputs": [],
                    "name": "surgeriesCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "emergencyContactsCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "hospitalName",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "diagnosisesCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_surgeryName",
                            "type": "string"
                        },
                        {
                            "name": "_mainDoctor",
                            "type": "string"
                        },
                        {
                            "name": "_duration",
                            "type": "uint256"
                        },
                        {
                            "name": "_fileHash",
                            "type": "string"
                        },
                        {
                            "name": "_surgeryInformation",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addSurgery",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "drugPrescribtions",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "doctorName",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "drugList",
                            "type": "string"
                        },
                        {
                            "name": "drugListCount",
                            "type": "uint256"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "radiologies",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "radiologist",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "radiologyType",
                            "type": "string"
                        },
                        {
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "fileHash",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "laboratoryTestsCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "submissionDate",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "medicalRecordAddress",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "dateOfBirth",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "phoneNumber",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "gender",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "diagnosises",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "doctorName",
                            "type": "string"
                        },
                        {
                            "name": "diognosisDescription",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        },
                        {
                            "name": "fileHash",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "bloodDonations",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "doctorName",
                            "type": "string"
                        },
                        {
                            "name": "donationType",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "name": "fileHash",
                            "type": "string"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_doctorName",
                            "type": "string"
                        },
                        {
                            "name": "_drugList",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addDrugPrescribtion",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_doctorName",
                            "type": "string"
                        },
                        {
                            "name": "_diognosisDescription",
                            "type": "string"
                        },
                        {
                            "name": "_fileHash",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addDiagnosis",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "emergencyContacts",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_radiologistName",
                            "type": "string"
                        },
                        {
                            "name": "_radiologyType",
                            "type": "string"
                        },
                        {
                            "name": "_description",
                            "type": "string"
                        },
                        {
                            "name": "_fileHash",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addRadiology",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "bloodDonationsCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_doctorName",
                            "type": "string"
                        },
                        {
                            "name": "_donationType",
                            "type": "string"
                        },
                        {
                            "name": "_amount",
                            "type": "uint256"
                        },
                        {
                            "name": "_fileHash",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addBloodDonation",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "_laboratoryWorkerName",
                            "type": "string"
                        },
                        {
                            "name": "_testType",
                            "type": "string"
                        },
                        {
                            "name": "_laboratoryTestDescription",
                            "type": "string"
                        },
                        {
                            "name": "_fileHash",
                            "type": "string"
                        },
                        {
                            "name": "_isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "name": "addLaboratoryTest",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "nationalID",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "drugPrescribtionsCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "surgeries",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "mainDoctor",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "surgeryInformation",
                            "type": "string"
                        },
                        {
                            "name": "duration",
                            "type": "uint256"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "surgeryName",
                            "type": "string"
                        },
                        {
                            "name": "fileHash",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "bloodType",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "laboratoryTests",
                    "outputs": [
                        {
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "name": "hospitalName",
                            "type": "string"
                        },
                        {
                            "name": "laboratoryWorkerName",
                            "type": "string"
                        },
                        {
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "name": "testType",
                            "type": "string"
                        },
                        {
                            "name": "laboratoryTestDescription",
                            "type": "string"
                        },
                        {
                            "name": "testHash",
                            "type": "string"
                        },
                        {
                            "name": "isCorrectionFor",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_phoneNumber",
                            "type": "string"
                        }
                    ],
                    "name": "addEmergencyContact",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "radiologiesCount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "name": "nationalIDI",
                            "type": "uint256"
                        },
                        {
                            "name": "nameI",
                            "type": "string"
                        },
                        {
                            "name": "birthDateI",
                            "type": "uint256"
                        },
                        {
                            "name": "phoneNumberI",
                            "type": "string"
                        },
                        {
                            "name": "genderI",
                            "type": "string"
                        },
                        {
                            "name": "bloodTypeI",
                            "type": "string"
                        },
                        {
                            "name": "emergencyContactI",
                            "type": "string"
                        },
                        {
                            "name": "hospitalNameI",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                }
            ];

            const address = this.P_Address;

            const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
                from: address ,
                gasPrice: '100000000'
            });
            for (let i =0 ; i< this.radiologiesCount ; i++){
                mycontract.methods.radiologies(i).call({from: this.Hospital_Address},(error , result) => {
                    if(!error && result['id'] == s){
                        this.N_Correction_Radiology =  result;
                    }
                });
            }

        }

     getIdCorrectionForSurgery(s) {
         const ABI_PatientMR = [
             {
                 "constant": true,
                 "inputs": [],
                 "name": "surgeriesCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "name",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "emergencyContactsCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "hospitalName",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "diagnosisesCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_surgeryName",
                         "type": "string"
                     },
                     {
                         "name": "_mainDoctor",
                         "type": "string"
                     },
                     {
                         "name": "_duration",
                         "type": "uint256"
                     },
                     {
                         "name": "_fileHash",
                         "type": "string"
                     },
                     {
                         "name": "_surgeryInformation",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addSurgery",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "drugPrescribtions",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "doctorName",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "drugList",
                         "type": "string"
                     },
                     {
                         "name": "drugListCount",
                         "type": "uint256"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "radiologies",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "radiologist",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "radiologyType",
                         "type": "string"
                     },
                     {
                         "name": "description",
                         "type": "string"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "fileHash",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "laboratoryTestsCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "submissionDate",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "medicalRecordAddress",
                 "outputs": [
                     {
                         "name": "",
                         "type": "address"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "dateOfBirth",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "phoneNumber",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "gender",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "diagnosises",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "doctorName",
                         "type": "string"
                     },
                     {
                         "name": "diognosisDescription",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     },
                     {
                         "name": "fileHash",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "bloodDonations",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "doctorName",
                         "type": "string"
                     },
                     {
                         "name": "donationType",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "amount",
                         "type": "uint256"
                     },
                     {
                         "name": "fileHash",
                         "type": "string"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_doctorName",
                         "type": "string"
                     },
                     {
                         "name": "_drugList",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addDrugPrescribtion",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_doctorName",
                         "type": "string"
                     },
                     {
                         "name": "_diognosisDescription",
                         "type": "string"
                     },
                     {
                         "name": "_fileHash",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addDiagnosis",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "emergencyContacts",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_radiologistName",
                         "type": "string"
                     },
                     {
                         "name": "_radiologyType",
                         "type": "string"
                     },
                     {
                         "name": "_description",
                         "type": "string"
                     },
                     {
                         "name": "_fileHash",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addRadiology",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "bloodDonationsCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_doctorName",
                         "type": "string"
                     },
                     {
                         "name": "_donationType",
                         "type": "string"
                     },
                     {
                         "name": "_amount",
                         "type": "uint256"
                     },
                     {
                         "name": "_fileHash",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addBloodDonation",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "_laboratoryWorkerName",
                         "type": "string"
                     },
                     {
                         "name": "_testType",
                         "type": "string"
                     },
                     {
                         "name": "_laboratoryTestDescription",
                         "type": "string"
                     },
                     {
                         "name": "_fileHash",
                         "type": "string"
                     },
                     {
                         "name": "_isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "name": "addLaboratoryTest",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "nationalID",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "drugPrescribtionsCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "surgeries",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "mainDoctor",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "surgeryInformation",
                         "type": "string"
                     },
                     {
                         "name": "duration",
                         "type": "uint256"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "surgeryName",
                         "type": "string"
                     },
                     {
                         "name": "fileHash",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "bloodType",
                 "outputs": [
                     {
                         "name": "",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "name": "laboratoryTests",
                 "outputs": [
                     {
                         "name": "id",
                         "type": "uint256"
                     },
                     {
                         "name": "hospitalName",
                         "type": "string"
                     },
                     {
                         "name": "laboratoryWorkerName",
                         "type": "string"
                     },
                     {
                         "name": "date",
                         "type": "uint256"
                     },
                     {
                         "name": "testType",
                         "type": "string"
                     },
                     {
                         "name": "laboratoryTestDescription",
                         "type": "string"
                     },
                     {
                         "name": "testHash",
                         "type": "string"
                     },
                     {
                         "name": "isCorrectionFor",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "constant": false,
                 "inputs": [
                     {
                         "name": "_phoneNumber",
                         "type": "string"
                     }
                 ],
                 "name": "addEmergencyContact",
                 "outputs": [],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "function"
             },
             {
                 "constant": true,
                 "inputs": [],
                 "name": "radiologiesCount",
                 "outputs": [
                     {
                         "name": "",
                         "type": "uint256"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "view",
                 "type": "function"
             },
             {
                 "inputs": [
                     {
                         "name": "nationalIDI",
                         "type": "uint256"
                     },
                     {
                         "name": "nameI",
                         "type": "string"
                     },
                     {
                         "name": "birthDateI",
                         "type": "uint256"
                     },
                     {
                         "name": "phoneNumberI",
                         "type": "string"
                     },
                     {
                         "name": "genderI",
                         "type": "string"
                     },
                     {
                         "name": "bloodTypeI",
                         "type": "string"
                     },
                     {
                         "name": "emergencyContactI",
                         "type": "string"
                     },
                     {
                         "name": "hospitalNameI",
                         "type": "string"
                     }
                 ],
                 "payable": false,
                 "stateMutability": "nonpayable",
                 "type": "constructor"
             }
         ];

         const address = this.P_Address;

         const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
             from: address ,
             gasPrice: '100000000'
         });

         for (let i =0 ; i< this.surgeriesCount ; i++){
             mycontract.methods.surgeries(i).call({from: this.Hospital_Address},(error , result) => {
                 if(!error && result['id'] == s){
                     this.N_Correction_surgery =  result;
                 }
             });
         }

     }

    getIdCorrectionForBloodDonation(s){
        const ABI_PatientMR = [
            {
                "constant": true,
                "inputs": [],
                "name": "surgeriesCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "emergencyContactsCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "hospitalName",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "diagnosisesCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_surgeryName",
                        "type": "string"
                    },
                    {
                        "name": "_mainDoctor",
                        "type": "string"
                    },
                    {
                        "name": "_duration",
                        "type": "uint256"
                    },
                    {
                        "name": "_fileHash",
                        "type": "string"
                    },
                    {
                        "name": "_surgeryInformation",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addSurgery",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "drugPrescribtions",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "doctorName",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "drugList",
                        "type": "string"
                    },
                    {
                        "name": "drugListCount",
                        "type": "uint256"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "radiologies",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "radiologist",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "radiologyType",
                        "type": "string"
                    },
                    {
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "fileHash",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "laboratoryTestsCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "submissionDate",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "medicalRecordAddress",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "dateOfBirth",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "phoneNumber",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "gender",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "diagnosises",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "doctorName",
                        "type": "string"
                    },
                    {
                        "name": "diognosisDescription",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    },
                    {
                        "name": "fileHash",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "bloodDonations",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "doctorName",
                        "type": "string"
                    },
                    {
                        "name": "donationType",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "name": "fileHash",
                        "type": "string"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_doctorName",
                        "type": "string"
                    },
                    {
                        "name": "_drugList",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addDrugPrescribtion",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_doctorName",
                        "type": "string"
                    },
                    {
                        "name": "_diognosisDescription",
                        "type": "string"
                    },
                    {
                        "name": "_fileHash",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addDiagnosis",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "emergencyContacts",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_radiologistName",
                        "type": "string"
                    },
                    {
                        "name": "_radiologyType",
                        "type": "string"
                    },
                    {
                        "name": "_description",
                        "type": "string"
                    },
                    {
                        "name": "_fileHash",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addRadiology",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "bloodDonationsCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_doctorName",
                        "type": "string"
                    },
                    {
                        "name": "_donationType",
                        "type": "string"
                    },
                    {
                        "name": "_amount",
                        "type": "uint256"
                    },
                    {
                        "name": "_fileHash",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addBloodDonation",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_laboratoryWorkerName",
                        "type": "string"
                    },
                    {
                        "name": "_testType",
                        "type": "string"
                    },
                    {
                        "name": "_laboratoryTestDescription",
                        "type": "string"
                    },
                    {
                        "name": "_fileHash",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addLaboratoryTest",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "nationalID",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "drugPrescribtionsCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "surgeries",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "mainDoctor",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "surgeryInformation",
                        "type": "string"
                    },
                    {
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "surgeryName",
                        "type": "string"
                    },
                    {
                        "name": "fileHash",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "bloodType",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "laboratoryTests",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "laboratoryWorkerName",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "testType",
                        "type": "string"
                    },
                    {
                        "name": "laboratoryTestDescription",
                        "type": "string"
                    },
                    {
                        "name": "testHash",
                        "type": "string"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_phoneNumber",
                        "type": "string"
                    }
                ],
                "name": "addEmergencyContact",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "radiologiesCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "nationalIDI",
                        "type": "uint256"
                    },
                    {
                        "name": "nameI",
                        "type": "string"
                    },
                    {
                        "name": "birthDateI",
                        "type": "uint256"
                    },
                    {
                        "name": "phoneNumberI",
                        "type": "string"
                    },
                    {
                        "name": "genderI",
                        "type": "string"
                    },
                    {
                        "name": "bloodTypeI",
                        "type": "string"
                    },
                    {
                        "name": "emergencyContactI",
                        "type": "string"
                    },
                    {
                        "name": "hospitalNameI",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }
        ];

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
            from: address ,
            gasPrice: '100000000'
        });

        for (let i =0 ; i< this.BloodDonationCount ; i++){
            mycontract.methods.bloodDonations(i).call({from: this.Hospital_Address},(error , result) => {
                if(!error && result['id'] == s){
                    this.N_Correction_BloodDonation =  result;
                }
            });
        }

    }

    getIdCorrectionForDiagnosises(s){
        const ABI_PatientMR = [
            {
                "constant": true,
                "inputs": [],
                "name": "surgeriesCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "emergencyContactsCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "hospitalName",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "diagnosisesCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_surgeryName",
                        "type": "string"
                    },
                    {
                        "name": "_mainDoctor",
                        "type": "string"
                    },
                    {
                        "name": "_duration",
                        "type": "uint256"
                    },
                    {
                        "name": "_fileHash",
                        "type": "string"
                    },
                    {
                        "name": "_surgeryInformation",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addSurgery",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "drugPrescribtions",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "doctorName",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "drugList",
                        "type": "string"
                    },
                    {
                        "name": "drugListCount",
                        "type": "uint256"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "radiologies",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "radiologist",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "radiologyType",
                        "type": "string"
                    },
                    {
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "fileHash",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "laboratoryTestsCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "submissionDate",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "medicalRecordAddress",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "dateOfBirth",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "phoneNumber",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "gender",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "diagnosises",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "doctorName",
                        "type": "string"
                    },
                    {
                        "name": "diognosisDescription",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    },
                    {
                        "name": "fileHash",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "bloodDonations",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "doctorName",
                        "type": "string"
                    },
                    {
                        "name": "donationType",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "name": "fileHash",
                        "type": "string"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_doctorName",
                        "type": "string"
                    },
                    {
                        "name": "_drugList",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addDrugPrescribtion",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_doctorName",
                        "type": "string"
                    },
                    {
                        "name": "_diognosisDescription",
                        "type": "string"
                    },
                    {
                        "name": "_fileHash",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addDiagnosis",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "emergencyContacts",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_radiologistName",
                        "type": "string"
                    },
                    {
                        "name": "_radiologyType",
                        "type": "string"
                    },
                    {
                        "name": "_description",
                        "type": "string"
                    },
                    {
                        "name": "_fileHash",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addRadiology",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "bloodDonationsCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_doctorName",
                        "type": "string"
                    },
                    {
                        "name": "_donationType",
                        "type": "string"
                    },
                    {
                        "name": "_amount",
                        "type": "uint256"
                    },
                    {
                        "name": "_fileHash",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addBloodDonation",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "_laboratoryWorkerName",
                        "type": "string"
                    },
                    {
                        "name": "_testType",
                        "type": "string"
                    },
                    {
                        "name": "_laboratoryTestDescription",
                        "type": "string"
                    },
                    {
                        "name": "_fileHash",
                        "type": "string"
                    },
                    {
                        "name": "_isCorrectionFor",
                        "type": "string"
                    }
                ],
                "name": "addLaboratoryTest",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "nationalID",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "drugPrescribtionsCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "surgeries",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "mainDoctor",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "surgeryInformation",
                        "type": "string"
                    },
                    {
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "surgeryName",
                        "type": "string"
                    },
                    {
                        "name": "fileHash",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "bloodType",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "laboratoryTests",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "hospitalName",
                        "type": "string"
                    },
                    {
                        "name": "laboratoryWorkerName",
                        "type": "string"
                    },
                    {
                        "name": "date",
                        "type": "uint256"
                    },
                    {
                        "name": "testType",
                        "type": "string"
                    },
                    {
                        "name": "laboratoryTestDescription",
                        "type": "string"
                    },
                    {
                        "name": "testHash",
                        "type": "string"
                    },
                    {
                        "name": "isCorrectionFor",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_phoneNumber",
                        "type": "string"
                    }
                ],
                "name": "addEmergencyContact",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "radiologiesCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "nationalIDI",
                        "type": "uint256"
                    },
                    {
                        "name": "nameI",
                        "type": "string"
                    },
                    {
                        "name": "birthDateI",
                        "type": "uint256"
                    },
                    {
                        "name": "phoneNumberI",
                        "type": "string"
                    },
                    {
                        "name": "genderI",
                        "type": "string"
                    },
                    {
                        "name": "bloodTypeI",
                        "type": "string"
                    },
                    {
                        "name": "emergencyContactI",
                        "type": "string"
                    },
                    {
                        "name": "hospitalNameI",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }
        ];

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
            from: address ,
            gasPrice: '100000000'
        });

        for (let i =0 ; i< this.diagnosisesCount ; i++){
            mycontract.methods.diagnosises(i).call({from: this.Hospital_Address},(error , result) => {
                if(!error && result['id'] == s){
                    this.N_Correction_Diagnosises=  result;
                }
            });
        }


    }

}
