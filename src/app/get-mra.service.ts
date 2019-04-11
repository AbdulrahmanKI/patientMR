import { Injectable } from '@angular/core';
import { web3 } from 'src/web3';
import {pipe} from 'rxjs';
import {delay} from 'rxjs/operators';
import {DateFormatter} from '@angular/common/src/pipes/deprecated/intl';



@Injectable({
  providedIn: 'root'
})
export class GetMRAService {

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
    const address = '0x8eb87a89b62cfb3e3d911bffeab2761e99b6c253';


    const mycontract = new web3.eth.Contract(ABI, address , {
      from: address ,
      gasPrice: '100000000'
    });


    // Hospital P_Address
      mycontract.methods.getMedicalRecord(id).call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
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
    mycontract.methods.name.call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
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

    const address = this.P_Address;

    const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
      from: address ,
      gasPrice: '100000000'
    });

      this.getDonationCount();
      await new Promise(resolve => setTimeout(
          ()=>resolve(), 300));


      console.log(this.BloodDonationCount+" aaaaas")
    //Fetch Patient BloodDonation
      for (let i =0 ; i< this.BloodDonationCount ; i++){
        mycontract.methods.bloodDonations(i).call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
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

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });



        //Hospital Address  /Fetch Patient BloodDonation
        mycontract.methods.bloodDonationsCount.call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
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

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });

        this.getDiagnosisesCount();
        await new Promise(resolve => setTimeout(
            ()=>resolve(), 300));


        //Fetch Patient BloodDonation
        for (let i =0 ; i< this.diagnosisesCount ; i++){
          mycontract.methods.diagnosises(i).call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
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

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });



        //Hospital Address  /Fetch Patient diagnosisesCount
        mycontract.methods.diagnosisesCount.call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
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

      const address = this.P_Address;

      const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
        from: address ,
        gasPrice: '100000000'
      });

      this.getSurgeriesCount();
      await new Promise(resolve => setTimeout(
          ()=>resolve(), 300));


      //Fetch Patient BloodDonation
      for (let i =0 ; i< this.surgeriesCount ; i++){
        mycontract.methods.surgeries(i).call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
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

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });



        //Hospital Address  /Fetch Patient diagnosisesCount
        mycontract.methods.surgeriesCount.call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
          if(!error)
          // console.log( result);
            this.surgeriesCount =  result;
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

      const address = this.P_Address;

      const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
        from: address ,
        gasPrice: '100000000'
      });

      this.getSurgeriesCount();
      await new Promise(resolve => setTimeout(
          ()=>resolve(), 300));


      //Fetch Patient BloodDonation
      for (let i =0 ; i< this.surgeriesCount ; i++){
        mycontract.methods.surgeries(i).call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
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

        const address = this.P_Address;

        const mycontract = new web3.eth.Contract(ABI_PatientMR, address , {
          from: address ,
          gasPrice: '100000000'
        });



        //Hospital Address  /Fetch Patient diagnosisesCount
        mycontract.methods.surgeriesCount.call({from: '0xBF8091555d8ced0C0da7bb6d4913dB22d68e0341'},(error , result) => {
          if(!error)
          // console.log( result);
            this.surgeriesCount =  result;
          else
            console.log(error);
        });
      }

}
