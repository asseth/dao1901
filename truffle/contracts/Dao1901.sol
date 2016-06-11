contract Dao1901 {

    enum RoleList { founder, secretary, president, treasurer, member } // Role Available in the DAO

    struct Member {
        uint memberSince;
        bool payed;
        bool canVote;
        RoleList role;
        address public_key;
    }
    
    Member[] public members;
    mapping (address => uint) public memberId;

    bool created;

    modifier isRole(RoleList role) {
        if (memberId[msg.sender] == 0 || members[memberId[msg.sender]].role != role) return;
        _
    }

    modifier isAdmin() {
        if (memberId[msg.sender] == 0 || members[memberId[msg.sender]].role == RoleList.member) return;
        _
    }


    function Dao1901(){
        members.length += 2;
        members[0] = Member({canVote: false, role: RoleList.member, memberSince: now, payed: false, public_key: 0}); // utilisateur bidon
        members[1] = Member({canVote: false, role: RoleList.founder, memberSince: now, payed: false, public_key: msg.sender});
        memberId[msg.sender] = 1;
    }

    // TO DO : Implement a real democracy
    function setBureau(address _secretary, address _president, address _treasurer) isRole(RoleList.founder) {

        if(created == true) return;

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
        memberId[_address] = members.length;
        id = members.length++;
        members[id] = Member({
            canVote: _vote, 
            role: RoleList.member, 
            memberSince: now, 
            payed: _payed,
            public_key: msg.sender
        });
    }
    function getMemberLength() returns(uint size){
        return members.length;
    }
    function getMemberSince(uint id) returns(uint memberSince){
        return members[id].memberSince;
    }
    function getMemberCanVote(uint id) returns(bool vote){
        return members[id].canVote;
    }

    
    // function createBooleanVote(string questions) isRole(RoleList.president){
    //     votes[id].questions = questions;
    //     votes[id].end = "need to find a systeme"
    // }
}
