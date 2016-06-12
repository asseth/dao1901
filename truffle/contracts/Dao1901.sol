contract Dao1901 {

    enum RoleList { founder, secretary, president, treasurer, member } // Role Available in the DAO

    struct Member {
        uint memberSince;	// Registering date of a member
        bool payed;		// True if member has payed, if needed
        bool canVote;		// True if member is allowed to vote
        RoleList role;		
        address public_key;	// address of the member
    }
    // Functions to query the database of members
    function getMemberSince(address addr) returns(uint memberSince){
        return members[memberId[addr]].memberSince;
    }
    function getMemberPayed(address addr) returns(bool status){
        return members[memberId[addr]].payed;
    }
    function getMemberCanVote(address addr) returns(bool status){
        return members[memberId[addr]].canVote;
    }
    function getMemberRole(address addr) returns(uint role){
        return uint(members[memberId[addr]].role);
    }
    function getMemberAdresse(uint id) returns(address addr){
        return members[id].public_key;
    }
    function getMemberLength() returns(uint size){
        return members.length;
    }

    
    Member[] public members;	// Dynamic table of members (in storage)
    mapping (address => uint) public memberId;	// A mapping to find a member by it's address

    bool created;	// A dirty flag

    modifier isRole(RoleList role) {
        if (memberId[msg.sender] == 0 || members[memberId[msg.sender]].role != role) throw;
        _
    }

    modifier isAdmin() {	// Checks if sender is not a normal member and exists in database == is an admin
        if (memberId[msg.sender] == 0 || members[memberId[msg.sender]].role == RoleList.member) throw;
        _
    }


    function Dao1901(){
        members.length += 2;	// Adding two members to the table
        members[0] = Member({canVote: false, role: RoleList.member, memberSince: now, payed: false, public_key: 0}); // One fake user for the checks on the mapping to work
        members[1] = Member({canVote: false, role: RoleList.founder, memberSince: now, payed: false, public_key: msg.sender});	// The founder
        memberId[msg.sender] = 1;	// Only a real user needs an updated mapping
    }

    // Called only once by the founder
    function setBureau(address _secretary, address _president, address _treasurer) isRole(RoleList.founder) {

        if(created == true) throw;

        createMember(_secretary, true, true);
        members[memberId[_secretary]].role = RoleList.secretary;
        createMember(_president, true, true);
        members[memberId[_president]].role = RoleList.president;
        createMember(_treasurer, true, true);
        members[memberId[_treasurer]].role = RoleList.treasurer;
        
        created = true;
    }
    
    function createMember(address _address, bool _payed, bool _vote) isAdmin() {
        uint id;
        memberId[_address] = id = members.length;	// Update of the mapping : new member's address to the last index of the table
        members.length++;
        members[id] = Member({
            canVote: _vote, 
            role: RoleList.member, 
            memberSince: now, 
            payed: _payed,
            public_key: _address
        });
    }
    
    // function createBooleanVote(string questions) isRole(RoleList.president){
    //     votes[id].questions = questions;
    //     votes[id].end = "need to find a systeme"
    // }
}
