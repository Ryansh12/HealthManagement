pragma experimental ABIEncoderV2;

contract test {
   struct Book {
      string title;
      string author;
      uint book_id;
   }
   mapping(int => bool) public ddd;

   function set () public {
       ddd[24] = true;
   }
   uint hhh = 7777;
   Book book;

   function setBook(string memory titlee, string memory authorr, uint book_idd) public {
      book = Book(titlee, authorr, book_idd);
   }
   function jjj() public view returns (uint) {
      return hhh;
   }

   function getNumber() public view returns (uint) {
       return hhh;
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

    function addDoctor(int aadharr, string memory namee, string memory detailss) public returns (address) {
        if(!check[msg.sender]) {
            doctor memory doc = doctor({
                aadhar: aadharr,
                name: namee,
                details: detailss
            });
            check[msg.sender] = true;
            map[msg.sender] = doc;
            return msg.sender;
        }
    }

    function createMedicalRecord(string memory namee, string memory genderr, uint256 dobb, int mobilee, int aadharr, string memory paddresss, 
    uint256 postalcodee, string memory countryy, string memory passwordd) public returns (address) {
        if(check[msg.sender]) {
            AddressMapping am = AddressMapping(0xD02772546bfaC54036692d6b08754081f155baD2);
            address returnAdd = address(new MedicalRecord(namee, genderr, dobb, mobilee, aadharr, paddresss, postalcodee, countryy, passwordd, address(msg.sender)));
            am.setAddress(aadharr, returnAdd);
            return returnAdd;
        }
    }
    
    function addNonDemographics(int aadharr, string memory medicalHistoryy, string memory diagnosiss, string memory medicationss,
    string memory allergiess, string memory progressNotess, string memory vitalSignss, string memory immunizationDatess, 
    string memory emergencyy) public returns(bool) {
        return true;
    }
    
    function addFiles(int aadharr, string memory billingDataa, string memory radiologyImagess, string memory labResultss, string memory insurancee) public returns(bool) {
        if(check[msg.sender]) {
            AddressMapping am = AddressMapping(0xD02772546bfaC54036692d6b08754081f155baD2);
            MedicalRecord mr = MedicalRecord(address(am.getAddress(aadharr)));
            bool flag = mr.addFiles(billingDataa, radiologyImagess, labResultss, insurancee, address(msg.sender));
            if(flag) {
                return true;
            }else {
                return false;
            }
        }
    }
}

contract MedicalRecord {
    struct PatientDemographics {
        string name;
        string gender;
        uint256 dob;
        int mobile;
        int aadhar;
        string paddress;
        uint256 postalcode;
        string country;
    }
    PatientDemographics public patientDemographics;
    string medicalHistory;
    string diagnosis;
    string medications;
    string allergies;
    string progressNotes;
    string vitalSigns;
    string immunizationDates;
    string emergency;
    string[] billingData;
    string[] radiologyImages;
    string[] labResults;
    string[] insurance;

    mapping(address => bool) public doctorsAllowed;
    
    string password;

    constructor(string memory namee, string memory genderr, uint256 dobb, int mobilee, int aadharr, string memory paddresss, 
    uint256 postalcodee, string memory countryy, string memory passwordd, address doctorsAddress) public {
        
        PatientDemographics memory dummy = PatientDemographics( { 
            name: namee,
            gender: genderr,
            dob: dobb,
            mobile: mobilee,
            aadhar: aadharr,
            paddress: paddresss,
            postalcode: postalcodee,
            country: countryy
        });
        
        patientDemographics = dummy;
        password = passwordd;
        doctorsAllowed[doctorsAddress] = true;
    }
    
    function addFiles(string memory billingDataa, string memory radiologyImagess, string memory labResultss, string memory insurancee, address doctorsAddress) public returns(bool) {
        if(doctorsAllowed[doctorsAddress]) {
            if(!(keccak256(abi.encodePacked(billingDataa)) == keccak256(abi.encodePacked("")))) {
                billingData.push(billingDataa);
            }
            if(!(keccak256(abi.encodePacked(radiologyImagess)) == keccak256(abi.encodePacked("")))) {
                radiologyImages.push(radiologyImagess);
            }
            if(!(keccak256(abi.encodePacked(labResultss)) == keccak256(abi.encodePacked("")))) {
                labResults.push(labResultss);
            }
            if(!(keccak256(abi.encodePacked(insurancee)) == keccak256(abi.encodePacked("")))) {
                insurance.push(insurancee);
            }
            return true;
        }else {
            return false;
        }
    }
    
    function updateNondemographics(string memory medicalHistoryy, string memory diagnosiss, string memory medicationss,
    string memory allergiess, string memory progressNotess, string memory vitalSignss, string memory immunizationDatess, 
    string memory emergencyy, address doctorsAddress) public returns(bool) {
        if(doctorsAllowed[doctorsAddress]) {
            medicalHistory = medicalHistoryy;
            diagnosis = diagnosiss;
            medications = medicationss;
            allergies = allergiess;
            progressNotes = progressNotess;
            vitalSigns = vitalSignss;
            immunizationDates = immunizationDatess;
            emergency = emergencyy;
            return true;
        }else{
            return false;
        }
    }
    
    function addDoctor(address doc, string memory pass) public returns(bool) {
        if(keccak256(abi.encodePacked(pass)) == keccak256(abi.encodePacked(password))) {
            doctorsAllowed[doc] = true;
            return true;
        }
    }

    function addBillingData(string memory billingDataa) public returns(bool) {
        if(doctorsAllowed[msg.sender]) {
            billingData.push(billingDataa);
            return true;
        }
    }
    
    function addRadiologyImages(string memory radiologyImagess) public returns(bool) {
        if(doctorsAllowed[msg.sender]) {
            radiologyImages.push(radiologyImagess);
            return true;
        }
    }

    function addLabResults(string memory labResultss) public returns(bool) {
        if(doctorsAllowed[msg.sender]) {
            labResults.push(labResultss);
            return true;
        }
    }
    
    function addInsurance(string memory insurancee) public returns(bool) {
        if(doctorsAllowed[msg.sender]) {
            insurance.push(insurancee);
            return true;
        }
    }
}

contract AddressMapping {
    mapping(int => address) public map;
    mapping(address => address) public ownerMap;
    mapping(address => bool) public ownerMapCheck;

    function getAddress(int aadhar) public view returns(address) {
        return map[aadhar];

    }

    function setAddress(int aadhar, address patient) public {
        map[aadhar] = patient;
    }
    
    function createOwner() public returns(address) {
        if(!ownerMapCheck[msg.sender]) {
            ownerMap[msg.sender] = address(new Owner(msg.sender));
            ownerMapCheck[msg.sender] = true;
            return ownerMap[msg.sender];
        }else {
            address dummy;
            return dummy;
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
    }
    address public manager;
    Request[] public pendingRequests;
    Request[] public approvedRequests;
    Request[] public rejectedRequests;
    address[] public insuranceGiven;

    constructor(address owner) public {
        manager = owner;
    }

    function createInsurance(string memory name, string memory aadhar, int amount) public {
        address newInsurance = address(new Insurance(address(this), name, aadhar, amount));
        insuranceGiven.push(newInsurance);
        // addressMapping hh = addressMapping(0x60a0849cadF129C69C26e249751Fc8e4211Eb1D5);
        // hh.setOwner(newInsurance, address(this));
    }

    function pendingRequest(address ownerAddd, address selfAddd, string memory titlee, string memory detailss, string memory fileHash, bool doctorr, bool ownerrrr, uint256 index) public {
        Request memory newRequest = Request ( {
            ownerAdd: ownerAddd,
            selfAdd: selfAddd,
            title: titlee,
            details: detailss,
            bills: fileHash,
            doctor: doctorr,
            owner: ownerrrr,
            index: index
        });
        pendingRequests.push(newRequest);
    }

    function approveCancelRequest(uint256 index, bool flag) public {
        if(flag == true) {
            Insurance inu = Insurance(address(pendingRequests[index].selfAdd));
            inu.finalizeRequest(pendingRequests[index].index, true);
            approvedRequests.push(pendingRequests[index]);
            delete pendingRequests[index];
        }
        else {
            Insurance inu = Insurance(address(pendingRequests[index].selfAdd));
            inu.finalizeRequest(pendingRequests[index].index, false);
            rejectedRequests.push(pendingRequests[index]);
            delete pendingRequests[index];
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
    }

    address selfAddress;
    address ownerr;
    string name;
    string aadhar;
    int amount;
    int requestsCount = -1;
    Request[] public requests;

    constructor(address ownerrr, string memory namee, string memory aadharr, int amountt) public {
        selfAddress = address(this);
        ownerr = ownerrr;
        name = namee;
        aadhar = aadharr;
        amount = amountt;
    }

    function applyClaim(string memory fileHash, string memory titlee, string memory detailss) public returns(Request[] memory) {
        Request memory newRequest = Request( {
            ownerAdd: ownerr,
            selfAdd: address(this),
            title: titlee,
            details: detailss,
            bills: fileHash,
            doctor: true,
            owner: false,
            index: uint256(requestsCount + 1),
            finalize: false
        });
        requests.push(newRequest);
        Owner oo = Owner(ownerr);
        oo.pendingRequest(ownerr, address(this), titlee, detailss, fileHash, true, false, uint256(requestsCount + 1));
        requestsCount = requestsCount + 1;
        return requests;
    }

    function finalizeRequest(uint256 index, bool flag) public {
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