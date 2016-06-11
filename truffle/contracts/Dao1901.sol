contract Dao1901 {

    enum RoleList { founder, secretary, president, treasurer, member } // Role Available in the DAO

    struct Member {
        uint memberSince;
        bool payed;
        bool canVote;
        RoleList role;
    }
    
    Member[] public members;
    mapping (address => uint) public memberId;

    bool created;

    modifier isRole(RoleList role) {
        if (memberId[msg.sender] == 0 || members[memberId[msg.sender]].role != role) throw;
        _
    }

    // modifier isAdmin() {
    //     if (memberId[msg.sender] == 0 ||
    //         members[memberId[msg.sender]].role != RoleList.founder ||
    //         members[memberId[msg.sender]].role != RoleList.secretary || 
    //         members[memberId[msg.sender]].role != RoleList.president ||
    //         members[memberId[msg.sender]].role != RoleList.president) throw;
    //      _
    // }


    function Dao1901(){
        members.length++;
        members[0] = Member({canVote: false, role: RoleList.member, memberSince: now, payed: false});
        createMember(msg.sender, false, false);
        members[memberId[msg.sender]].role = RoleList.founder;
    }

    // TO DO : Implement a real democracy
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
    
    function createMember(address _address, bool _payed, bool _vote) {
        uint id;
        memberId[_address] = members.length;
        id = members.length++;
        members[id] = Member({
            canVote: _vote, 
            role: RoleList.member, 
            memberSince: now, 
            payed: _payed
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