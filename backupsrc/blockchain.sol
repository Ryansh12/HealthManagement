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

    function addDoctor(string memory namee, string memory detailss) public returns (address) {
        if(!check[msg.sender]) {
            doctor memory doc = doctor({
                name: namee,
                details: detailss
            });
            check[msg.sender] = true;
            map[msg.sender] = doc;
            return msg.sender;
        }
    }

    function createMedicalRecord(string memory namee, string memory detailss, string memory fileHashss, string memory insurancess, int aadhar) public returns (address) {
        if(check[msg.sender]) {
            AddressMapping am = AddressMapping(0xbA8dC1a692093d8aBD34e12aa05a4fE691121bB6);
            address returnAdd = address(new MedicalRecord(namee, detailss, fileHashss, insurancess, address(this)));
            am.setAddress(aadhar, returnAdd);
            return returnAdd;
        }
    }
}

contract MedicalRecord {
    string public name;
    string public details;
    string[] public fileHashs;
    string[] public insurances;
    address public doc;

    constructor(string memory namee, string memory detailss, string memory fileHashss, string memory insurancess, address docc) public {
        name = namee;
        details = detailss;
        doc = docc;
        if(!(keccak256(abi.encodePacked(fileHashss)) == keccak256(abi.encodePacked("")))) {
            fileHashs.push(fileHashss);
        }
        if(!(keccak256(abi.encodePacked(insurancess)) == keccak256(abi.encodePacked("")))) {
            insurances.push(insurancess);
        }
    }

    function addFile(string memory fileHash) public {
        Doctor doc1 = Doctor(doc);
        if(doc1.isDoctor(msg.sender)) {
            fileHashs.push(fileHash);
        }
    }

    function addInsurance(string memory insurance) public {
        Doctor doc1 = Doctor(doc);
        if(doc1.isDoctor(msg.sender)) {
            insurances.push(insurance);
        }
    }
}

contract AddressMapping {
    mapping(int => address) public map;

    function getAddress(int aadhar) public view returns(address) {
        return map[aadhar];

    }

    function setAddress(int aadhar, address patient) public returns(address) {
        map[aadhar] = patient;
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

    constructor() public {
        manager = msg.sender;
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

    function applyClaim(string memory fileHash, string memory titlee, string memory detailss) public {
        // addressMapping hh = addressMapping(0x60a0849cadF129C69C26e249751Fc8e4211Eb1D5);
        // address add;
        // add = hh.getOwner(address(this));
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