pragma experimental ABIEncoderV2;

contract Mapping {
    address addressMappingAddress;
    address doctorAddress;
    
    function setAddressMappingAddress(address add) public returns(bool) {
        addressMappingAddress = add;
    }
    
    function getAddressMappingAddress() public view returns(address) {
        return(addressMappingAddress);
    }

    function setDoctorAddress(address add) public returns(bool) {
        doctorAddress = add;
    }
    
    function getDoctorAddress() public view returns(address) {
        return(doctorAddress);
    }
}

contract Doctor {
    struct doctor {
        int aadhar;
        string name;
        string details;
    }
    mapping(address => doctor) public map;
    mapping(address => bool) public check;

    function isDoctor(address add) public view returns (bool) {
        if(check[add])
            return true;
        return false;
    }

    function addDoctor(int aadharr, string memory namee, string memory detailss) public {
        if(!check[msg.sender]) {
            doctor memory doc = doctor({
                aadhar: aadharr,
                name: namee,
                details: detailss
            });
            check[msg.sender] = true;
            map[msg.sender] = doc;
        }
    }

    function createMedicalRecord(string memory namee, string memory genderr, string memory dobb, string memory mobilee, int aadharr, string memory paddresss, 
    string memory postalcodee, string memory countryy, string memory passwordd) public {
        if(check[msg.sender]) {
            AddressMapping am = AddressMapping(0xA0Ca43D1AF9d4B5471a19E922690118ACf9588c5);
            address returnAdd = address(new MedicalRecord(namee, genderr, dobb, mobilee, aadharr, paddresss, postalcodee, countryy, passwordd, address(msg.sender)));
            am.setRecordAddress(aadharr, returnAdd);
        }
    }
    
    // function addNonDemographics(int aadharr, string memory medicalHistoryy, string memory diagnosiss, string memory medicationss,
    // string memory allergiess, string memory progressNotess, string memory vitalSignss, string memory immunizationDatess, 
    // string memory emergencyy) public returns(bool) {
    //     if(check[msg.sender]) {
    //         AddressMapping am = AddressMapping(0x2b7cE98f7656C025c85BCCDC9Ad5ffAeebe5A1B7);
    //         MedicalRecord mr = MedicalRecord(address(am.getRecordAddress(aadharr)));
    //         bool flag = mr.updateNondemographics(medicalHistoryy, diagnosiss, medicationss, allergiess, progressNotess, vitalSignss, immunizationDatess, emergencyy, address(msg.sender));
    //         if(flag) {
    //             return true;
    //         }else {
    //             return false;
    //         }
    //     }else {
    //         return false;
    //     }
    // }
    
    // function addFiles(int aadharr, string memory billingDataa, string memory radiologyImagess, string memory labResultss, string memory insurancee) public returns(bool) {
    //     if(check[msg.sender]) {
    //         AddressMapping am = AddressMapping(0x2b7cE98f7656C025c85BCCDC9Ad5ffAeebe5A1B7);
    //         MedicalRecord mr = MedicalRecord(address(am.getRecordAddress(aadharr)));
    //         mr.addFiles(billingDataa, radiologyImagess, labResultss, insurancee, address(msg.sender));
    //     }
    // }
}

contract MedicalRecord {
    struct PatientDemographics {
        string name;
        string gender;
        string dob;
        string mobile;
        int aadhar;
        string paddress;
        string postalcode;
        string country;
    }
    
    struct PatientNonDemographics {
        string medicalHistory;
        string diagnosis;
        string medications;
        string allergies;
        string progressNotes;
        string vitalSigns;
        string immunizationDates;
        string emergency;   
    }
    
    struct Files {
        string[] billingData;
        string[] radiologyImages;
        string[] labResults;
        string[] insurance;
    }
    
    PatientDemographics patientDemographics;
    PatientNonDemographics patientNonDemographics;
    Files files;

    mapping(address => bool) public doctorsAllowed;
    
    string public password;

    constructor(string memory namee, string memory genderr, string memory dobb, string memory mobilee, int aadharr, string memory paddresss, 
    string memory postalcodee, string memory countryy, string memory passwordd, address doctorsAddress) public {
        
        PatientDemographics memory pat = PatientDemographics( { 
            name: namee,
            gender: genderr,
            dob: dobb,
            mobile: mobilee,
            aadhar: aadharr,
            paddress: paddresss,
            postalcode: postalcodee,
            country: countryy
        });
        
        patientDemographics = pat;
        password = passwordd;
        doctorsAllowed[doctorsAddress] = true;
    }
    
    function addFiles(string memory billingDataa, string memory radiologyImagess, string memory labResultss, string memory insurancee) public {
        if(isDoctorAllowed(msg.sender)) {
            if(!(keccak256(abi.encodePacked(billingDataa)) == keccak256(abi.encodePacked("")))) {
                files.billingData.push(billingDataa);
            }
            if(!(keccak256(abi.encodePacked(radiologyImagess)) == keccak256(abi.encodePacked("")))) {
                files.radiologyImages.push(radiologyImagess);
            }
            if(!(keccak256(abi.encodePacked(labResultss)) == keccak256(abi.encodePacked("")))) {
                files.labResults.push(labResultss);
            }
            if(!(keccak256(abi.encodePacked(insurancee)) == keccak256(abi.encodePacked("")))) {
                files.insurance.push(insurancee);
            }
        }
    }
    
    function updateNondemographics(string memory medicalHistoryy, string memory diagnosiss, string memory medicationss,
    string memory allergiess, string memory progressNotess, string memory vitalSignss, string memory immunizationDatess, 
    string memory emergencyy) public {
        if(isDoctorAllowed(msg.sender)) {
            PatientNonDemographics memory pat = PatientNonDemographics( { 
                medicalHistory: medicalHistoryy,
                diagnosis: diagnosiss,
                medications: medicationss,
                allergies: allergiess,
                progressNotes: progressNotess,
                vitalSigns: vitalSignss,
                immunizationDates: immunizationDatess,
                emergency: emergencyy
            });
            patientNonDemographics = pat;
        }
    }
    
    function isDoctorAllowed(address add) public view returns(bool) {
        Mapping mp = Mapping(0xD8693BAfBA8a45bE8DFD090Fa032AB4e5E8a504c);
        Doctor dc = Doctor(mp.getDoctorAddress());
        if(dc.isDoctor(add)) {
            if(doctorsAllowed[add] == true) {
                return true;
            }else {
                return false;
            }
        }else {
            return false;
        }
    }
    
    function isCorrectPassword(string memory pass) public view returns(bool) {
        if(keccak256(abi.encodePacked(pass)) == keccak256(abi.encodePacked(password))) {
            return true;
        }else {
            return false;
        }
    }
    
    function addDoctor(address doc, string memory pass) public {
        if(keccak256(abi.encodePacked(pass)) == keccak256(abi.encodePacked(password))) {
            doctorsAllowed[doc] = true;
        }
    }

    // function addBillingData(string memory billingDataa) public {
    //     if(isDoctorAllowed()) {
    //         billingData.push(billingDataa);
    //     }
    // }
    
    // function addRadiologyImages(string memory radiologyImagess) public {
    //     if(isDoctorAllowed()) {
    //         radiologyImages.push(radiologyImagess);
    //     }
    // }

    // function addLabResults(string memory labResultss) public {
    //     if(isDoctorAllowed()) {
    //         labResults.push(labResultss);
    //     }
    // }
    
    function addInsurance(string memory insurancee, string memory pass) public {
        if(keccak256(abi.encodePacked(pass)) == keccak256(abi.encodePacked(password))) {
            files.insurance.push(insurancee);
        }
    }
    
    function getPatientData() public view returns(bool, PatientDemographics memory, PatientNonDemographics memory, Files memory) {
        if(isDoctorAllowed(msg.sender)) {
            return( true, patientDemographics, patientNonDemographics, files );
        }
        else {
            PatientDemographics memory dummy = PatientDemographics({
                name: 'xxx',
                gender : 'xxx',
                dob: 'xxx',
                mobile: 'xxx',
                aadhar: 999,
                paddress: 'xxx',
                postalcode: 'xxx',
                country: 'xxx'
            });
            PatientNonDemographics memory dum = PatientNonDemographics({
                medicalHistory: 'xxx',
                diagnosis: 'xxx',
                medications: 'xxx',
                allergies: 'xxx',
                progressNotes: 'xxx',
                vitalSigns: 'xxx',
                immunizationDates: 'xxx',
                emergency: 'xxx'
            });
            Files memory dumFiles = Files({
                billingData: new string[](1),
                radiologyImages: new string[](1),
                labResults: new string[](1),
                insurance: new string[](1)
            });
            return(false, dummy, dum, dumFiles);
        }
    }
    
    // function getDemograhicsData() public view returns(PatientDemographics memory) {
    //     if(isDoctorAllowed()) {
    //         return( patientDemographics );
    //     }
    // }
    
    // function getNonDemographicsData() public view returns(PatientNonDemographics memory) {
    //     if(isDoctorAllowed()) {
    //         return(patientNonDemographics);
    //     }
    // }
    
    // function getAllFiles() public view returns(Files memory) {
    //     if(isDoctorAllowed()) {
    //         return(files);
    //     }
    // }
}

contract AddressMapping {
    mapping(int => address) public mapRecord;
    mapping(int => address) public mapInsurance;
    mapping(address => address) public ownerMap;
    mapping(address => bool) public ownerMapCheck;

    function getRecordAddress(int aadhar) public view returns(address) {
        return mapRecord[aadhar];

    }

    function setRecordAddress(int aadhar, address patient) public {
        mapRecord[aadhar] = patient;
    }
    
    function getInsuranceAddress(int insNum) public view returns(address) {
        return mapInsurance[insNum];

    }

    function setInsuranceAddress(int insNum, address insurance) public {
        mapInsurance[insNum] = insurance;
    }
    
    function createOwner(string memory pass) public {
        if(!ownerMapCheck[msg.sender]) {
            address add = address(new Owner(pass, msg.sender));
            ownerMap[msg.sender] = add;
            ownerMapCheck[msg.sender] = true;
        }
    }
    
    function getOwnerAddress() public view returns(address) {
        return ownerMap[msg.sender];
    }

}

contract Owner {
    struct Request {
        address ownerAdd;
        address selfAdd;
        string title;
        string details;
        bool doctor;
        bool owner;
        string bills;
        uint256 index;
        uint256 pendingRequestsIndex;
    }
    
    string password;
    address manager;
    Request[] pendingRequests;
    Request[] approvedRequests;
    Request[] rejectedRequests;
    address[] insuranceIssued;
    mapping(address => bool) isIssuedInsurance;
    int requestsCount = -1;
    
    constructor(string memory pass, address add) public {
        manager = add;
        password = pass;
    }
    
    // modifier restricted() {
    //     require(msg.sender == manager);
    //     _;
    // }
    
    function isCorrectPassword(string memory pass) public view returns(bool) {
        if(keccak256(abi.encodePacked(pass)) == keccak256(abi.encodePacked(password))) {
            return true;
        }else {
            return false;
        }
    }
    
    function addNewInsurance(address add) public {
        if(msg.sender == manager) {
            insuranceIssued.push(add);
            isIssuedInsurance[add] = true;
        }
    }
    
    // function gerPendingRequestsCount() public view returns(uint) {
    //     return (getApprovedRequestsCount() - pendingRequests.length);
    // }
    
    // function gerPendingRequests() public view restricted returns(Request[] memory) {
    //     return pendingRequests;
    // }

    // function getApprovedRequestsCount() public view restricted returns(uint) {
    //     return approvedRequests.length;
    // }
    
    // function getRejectedRequestsCount() public view restricted returns(uint) {
    //     return rejectedRequests.length;
    // }
    
    // function getInsuranceIssuedCount() public view restricted returns(uint) {
    //     return insuranceIssued.length;
    // }
    
    function getData(string memory pass) public view returns(bool, uint, uint, uint, uint, address[] memory, Request[] memory, Request[] memory, Request[] memory) {
        if((msg.sender == manager) && (isCorrectPassword(pass))) {
            return( true, insuranceIssued.length, pendingRequests.length - approvedRequests.length - rejectedRequests.length, approvedRequests.length, rejectedRequests.length, insuranceIssued, pendingRequests, approvedRequests, rejectedRequests );
        }
        else {
            address[] memory dummy = new address[](1);
            Request[] memory dummyRequests = new Request[](1);

            return ( false, 0, 0, 0, 0, dummy, dummyRequests, dummyRequests, dummyRequests);
        }
    }

    function createInsurance(string memory name, int aadhar, int amount, string memory insDetailss, string memory documentss, int setInsuranceAddresss) public  {
        if( msg.sender == manager ) {
            address newInsurance = address(new Insurance(address(this), name, aadhar, amount, insDetailss, documentss));
            insuranceIssued.push(newInsurance);
            isIssuedInsurance[newInsurance] = true;
            Mapping mp = Mapping(0xD8693BAfBA8a45bE8DFD090Fa032AB4e5E8a504c);
            AddressMapping hh = AddressMapping(mp.getAddressMappingAddress());
            hh.setInsuranceAddress(setInsuranceAddresss, newInsurance);
        }
    }

    function pendingRequest(address ownerAddd, address selfAddd, string memory titlee, string memory detailss, string memory fileHash, bool doctorr, bool ownerrrr, uint256 index) public {
        if(isIssuedInsurance[selfAddd]) {
            Request memory newRequest = Request ( {
                ownerAdd: ownerAddd,
                selfAdd: selfAddd,
                title: titlee,
                details: detailss,
                bills: fileHash,
                doctor: doctorr,
                owner: ownerrrr,
                index: index,
                pendingRequestsIndex: uint256(requestsCount + 1)
            });
            pendingRequests.push(newRequest);
            requestsCount = requestsCount + 1;
        }
    }

    function approveCancelRequest(uint256 index, bool flag) public {
        if(msg.sender == manager) {
            if(flag == true) {
                Insurance inu = Insurance(address(pendingRequests[index].selfAdd));
                inu.finalizeRequest(pendingRequests[index].index, msg.sender, true);
                approvedRequests.push(pendingRequests[index]);
                delete pendingRequests[index];
            }
            else {
                Insurance inu = Insurance(address(pendingRequests[index].selfAdd));
                inu.finalizeRequest(pendingRequests[index].index, msg.sender, false);
                rejectedRequests.push(pendingRequests[index]);
                delete pendingRequests[index];
            }
        }
    }


}

contract Insurance {
    struct Request {
        address ownerAdd;
        address selfAdd;
        string title;
        string details;
        bool doctor;
        bool owner;
        string bills;
        uint256 index;
        bool finalize;
        uint256 pendingRequestsIndex;
    }

    address selfAddress;
    address ownerr;
    string name;
    int aadhar;
    string insDetails;
    string documents;
    int amount;
    int requestsCount = -1;
    Request[] requests;

    constructor(address ownerrr, string memory namee, int aadharr, int amountt, string memory insDetailss, string memory documentss) public {
        selfAddress = address(this);
        ownerr = ownerrr;
        name = namee;
        insDetails = insDetailss;
        documents = documentss;
        aadhar = aadharr;
        amount = amountt;
    }
    
    function getData() public view returns(address, address, string memory, int, string memory, string memory, int, Request[] memory) {
        return(selfAddress, ownerr, name, aadhar, insDetails, documents, amount, requests);
    }

    function applyClaim(string memory fileHash, string memory titlee, string memory detailss) public {
        Request memory newRequest = Request( {
            ownerAdd: ownerr,
            selfAdd: address(this),
            title: titlee,
            details: detailss,
            bills: fileHash,
            doctor: true,
            owner: false,
            index: uint256(requestsCount + 1),
            finalize: false,
            pendingRequestsIndex: 0
        });
        requests.push(newRequest);
        Owner oo = Owner(ownerr);
        oo.pendingRequest(ownerr, address(this), titlee, detailss, fileHash, true, false, uint256(requestsCount + 1));
        requestsCount = requestsCount + 1;
    }

    function finalizeRequest(uint256 index, address add, bool flag) public {
        if(add == ownerr) {
            if(flag == true) {
                requests[index].finalize = true;
                requests[index].owner = true;
            }
            else {
                requests[index].finalize = true;
                requests[index].owner = false;
            }
        }
    }
}